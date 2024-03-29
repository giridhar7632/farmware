import { type RegisteredAction } from 'convex/server'
import { v } from 'convex/values'
import { internal } from './_generated/api'
import { type Doc, type Id } from './_generated/dataModel'
import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from './_generated/server'

export const getImagesByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query('satellite_images')
      .filter((q) => q.eq(q.field('userID'), args.userId))
      .collect()
    return Promise.all(
      images.map(async (image) => ({
        ...image,
        url: await ctx.storage.getUrl(image.image),
      })),
    )
  },
})

export const deleteImage = mutation({
  args: { imageId: v.id('satellite_images'), storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.imageId)
    await ctx.storage.delete(args.storageId)
  },
})

export const getImageByInfo = internalQuery({
  args: {
    type: v.string(),
    timeRangeFrom: v.string(),
    timeRangeTo: v.string(),
    latitude: v.string(),
    longitude: v.string(),
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    const image = await ctx.db
      .query('satellite_images')
      .filter((q) => q.eq(q.field('type'), args.type))
      .filter((q) => q.eq(q.field('latitude'), args.latitude))
      .filter((q) => q.eq(q.field('longitude'), args.longitude))
      .filter((q) => q.eq(q.field('timeRangeFrom'), args.timeRangeFrom))
      .filter((q) => q.eq(q.field('timeRangeTo'), args.timeRangeTo))
      .unique()
    return image
  },
})

export const saveImage = internalMutation({
  args: {
    userID: v.string(),
    type: v.string(),
    timeRangeFrom: v.string(),
    timeRangeTo: v.string(),
    storageId: v.id('_storage'),
    latitude: v.string(),
    longitude: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('satellite_images', {
      userID: args.userID,
      type: args.type,
      timeRangeFrom: args.timeRangeFrom,
      timeRangeTo: args.timeRangeTo,
      image: args.storageId,
      latitude: args.latitude,
      longitude: args.longitude,
    })
  },
})

export const retrieveNDMISatelliteImage: RegisteredAction<
  'public',
  {
    type: string
    timeRangeFrom: string
    timeRangeTo: string
    latitude: string
    longitude: string
    userId: string
  },
  Promise<string | null | undefined>
> = action({
  args: {
    type: v.string(),
    latitude: v.string(),
    longitude: v.string(),
    userId: v.string(),
    timeRangeFrom: v.string(),
    timeRangeTo: v.string(),
  },
  handler: async (ctx, args) => {
    // const testArgs = {
    //   type: 'NDMI',
    //   latitude: '43.5639',
    //   longitude: '-79.7172',
    //   userId: 'user',
    //   timeRangeFrom: '2022-05-01T00:00:00Z',
    //   timeRangeTo: '2022-05-15T00:00:00Z',
    // }

    // const bbox = [-79.8172, 43.4639, -79.9172, 43.6639]
    try {
      console.log(args)
      const existingImage: Doc<'satellite_images'> | null = await ctx.runQuery(
        internal.satelliteImage.getImageByInfo,
        {
          type: 'NDMI',
          timeRangeFrom: args.timeRangeFrom,
          timeRangeTo: args.timeRangeTo,
          latitude: args.latitude,
          longitude: args.longitude,
        },
      )
      if (existingImage) {
        const imageUrl = await ctx.storage.getUrl(existingImage.image)
        return imageUrl
      }
      const lat = parseFloat(args.latitude)
      const long = parseFloat(args.longitude)
      const bbox = [
        +(long - 0.0001),
        +(lat - 0.0001),
        +(long + 0.0001),
        +(lat + 0.0001),
      ]

      // get sentinel hub bearer token every time. it expires after 1 hour so we can refresh it every time for simplicity
      const tokenRes = await fetch(
        'https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.CLIENT_ID!,
            client_secret: process.env.CLIENT_SECRET!,
          }),
        },
      )
      if (!tokenRes.ok) {
        throw new Error(
          `Error in getting token: ${tokenRes.status} ${tokenRes.statusText}`,
        )
      }
      const { access_token } = await tokenRes.json()

      const res = await fetch(
        'https://services.sentinel-hub.com/api/v1/process',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: {
              bounds: {
                properties: {
                  crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84',
                },
                bbox,
              },
              data: [
                {
                  type: 'sentinel-2-l2a',
                  dataFilter: {
                    timeRange: {
                      from: args.timeRangeFrom,
                      to: args.timeRangeTo,
                    },
                  },
                },
              ],
            },
            output: {
              width: 1080,
              height: 1080,
            },
            evalscript: `
        //VERSION=3
        function setup() {
          return {
            input: ["B04", "B08", "B11"],
            output: {
              bands: 3,
              sampleType: "AUTO"
            }
          }
        }
        function evaluatePixel(sample) {
            let ndmi = (sample.B08 - sample.B11) / (sample.B08 + sample.B11);
            if (ndmi <= -0.66) return [0.8, 0, 0];
            else if (ndmi <= -0.33) return [1, 0.6, 0.6];
            else if (ndmi <= 0) return [1, 0, 0];
            else if (ndmi <= 0.33) return [0.6, 1, 0.6];
            else if (ndmi <= 0.66) return [0, 0.8, 0];
            else if (ndmi <= 1) return [0, 0.4, 0];
        }`,
          }),
        },
      )
      const image = await res.blob()
      const storageId: Id<'_storage'> = await ctx.storage.store(image)

      await ctx.runMutation(internal.satelliteImage.saveImage, {
        storageId,
        userID: args.userId,
        type: 'NDMI',
        timeRangeFrom: args.timeRangeFrom,
        timeRangeTo: args.timeRangeTo,
        latitude: args.latitude,
        longitude: args.longitude,
      })

      const imageUrl = await ctx.storage.getUrl(storageId)
      return imageUrl
    } catch (error) {
      console.error(error)
    }
  },
})

export const retrieveRGBSatelliteImage: RegisteredAction<
  'public',
  {
    type: string
    timeRangeFrom: string
    timeRangeTo: string
    latitude: string
    longitude: string
    userId: string
  },
  Promise<string | null | undefined>
> = action({
  args: {
    type: v.string(),
    latitude: v.string(),
    longitude: v.string(),
    userId: v.string(),
    timeRangeFrom: v.string(),
    timeRangeTo: v.string(),
  },
  handler: async (ctx, args) => {
    // const testArgs = {
    //   type: 'RGB',
    //   latitude: '43.5639',
    //   longitude: '-79.7172',
    //   userId: 'user',
    //   timeRangeFrom: '2022-05-01T00:00:00Z',
    //   timeRangeTo: '2022-05-15T00:00:00Z',
    // }

    // const bbox = [-79.8172, 43.4639, -79.9172, 43.6639]
    try {
      const existingImage: Doc<'satellite_images'> | null = await ctx.runQuery(
        internal.satelliteImage.getImageByInfo,
        {
          type: 'RGB',
          timeRangeFrom: args.timeRangeFrom,
          timeRangeTo: args.timeRangeTo,
          latitude: args.latitude,
          longitude: args.longitude,
        },
      )
      if (existingImage) {
        const imageUrl = await ctx.storage.getUrl(existingImage.image)
        return imageUrl
      }
      const lat = parseFloat(args.latitude)
      const long = parseFloat(args.longitude)
      const bbox = [
        +(long - 0.1).toFixed(4),
        +(lat - 0.1).toFixed(4),
        +(long + 0.1).toFixed(4),
        +(lat + 0.1).toFixed(4),
      ]

      const tokenRes = await fetch(
        'https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.CLIENT_ID!,
            client_secret: process.env.CLIENT_SECRET!,
          }),
        },
      )
      if (!tokenRes.ok) {
        throw new Error(`Error: ${tokenRes.status} ${tokenRes.statusText}`)
      }
      const { access_token } = await tokenRes.json()

      const res = await fetch(
        'https://services.sentinel-hub.com/api/v1/process',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: {
              bounds: {
                properties: {
                  crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84',
                },
                bbox,
              },
              data: [
                {
                  type: 'sentinel-2-l2a',
                  dataFilter: {
                    timeRange: {
                      from: args.timeRangeFrom,
                      to: args.timeRangeTo,
                    },
                  },
                },
              ],
            },
            output: {
              width: 1080,
              height: 1080,
            },
            evalscript: `
              //VERSION=3
              function setup() {
                return {
                  input: ["B02", "B03", "B04"],
                  output: {
                    bands: 3,
                    sampleType: "AUTO" // default value - scales the output values from [0,1] to [0,255].
                  }
                }
              }
              
              function evaluatePixel(sample) {
                return [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02]
              }`,
          }),
        },
      )
      const image = await res.blob()
      const storageId: Id<'_storage'> = await ctx.storage.store(image)

      await ctx.runMutation(internal.satelliteImage.saveImage, {
        storageId,
        userID: args.userId,
        type: args.type,
        timeRangeFrom: args.timeRangeFrom,
        timeRangeTo: args.timeRangeTo,
        latitude: args.latitude,
        longitude: args.longitude,
      })

      const imageUrl = await ctx.storage.getUrl(storageId)
      return imageUrl
    } catch (error) {
      console.error('Some error when retrieving rgb image:', error)
    }
  },
})
