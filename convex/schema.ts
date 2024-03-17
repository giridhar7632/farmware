import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  satellite_images: defineTable({
    userID: v.string(),
    type: v.string(),
    timeRangeFrom: v.string(),
    timeRangeTo: v.string(),
    image: v.id('_storage'),
    latitude: v.string(),
    longitude: v.string(),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }),
})
