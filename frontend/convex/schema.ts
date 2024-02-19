import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    satellite_images: defineTable({
      userID: v.string(),
      date: v.string(),
      image: v.string(),
    })
  });