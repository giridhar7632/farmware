import { v } from 'convex/values'
import { mutation, action, internalMutation } from './_generated/server'
import { Id } from './_generated/dataModel'
import { internal } from './_generated/api'

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // Return an upload URL
    return await ctx.storage.generateUploadUrl()
  },
})

export const saveImage = internalMutation({
  args: {
    userID: v.string(),
    timeRangeFrom: v.string(),
    timeRangeTo: v.string(),
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    ctx.db.insert('satellite_images', {
      userID: args.userID,
      timeRangeFrom: args.timeRangeFrom,
      timeRangeTo: args.timeRangeTo,
      image: args.storageId,
    })
  },
})

export const retrieveSatelliteImage = action({
  args: {
    latitude: v.string(),
    longitude: v.string(),
    userId: v.string(),
    timeRangeFrom: v.string(),
    timeRangeTo: v.string(),
  },
  handler: async (ctx, args) => {
    // const testArgs = {
    //   latitude: '43.5639',
    //   longitude: '-79.7172',
    //   userId: 'user',
    //   timeRangeFrom: '2022-05-01T00:00:00Z',
    //   timeRangeTo: '2022-05-15T00:00:00Z',
    // }

    // const bbox = [-79.8172, 43.4639, -79.9172, 43.6639]
    try {
      const lat = parseFloat(args.latitude)
      const long = parseFloat(args.longitude)
      const bbox = [
        +(long - 0.1).toFixed(4),
        +(lat - 0.1).toFixed(4),
        +(long + 0.1).toFixed(4),
        +(lat + 0.1).toFixed(4),
      ]

      // // get token
      const tokenRes = await fetch(
        'https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.CLIENT_ID as string,
            client_secret: process.env.CLIENT_SECRET as string,
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
        timeRangeFrom: args.timeRangeFrom,
        timeRangeTo: args.timeRangeTo,
      })
      const imageUrl = await ctx.storage.getUrl(storageId)
      return imageUrl
      //   const data = await ctx.runMutation(, {
      //     latitude: args.latitude,
      //     longitutude: args.longitude
      //   });
      // do something else, optionally use `data`
    } catch (error) {
      console.error(error)
    }
  },
})
