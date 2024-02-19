import { v } from "convex/values";
import { mutation, action } from "./_generated/server";
 
export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx, args) => {
      // use `args` and/or `ctx.auth` to authorize the user
      // Return an upload URL
      return await ctx.storage.generateUploadUrl();
    },
  });

export const saveImage = mutation({
  args: {
    userID: v.string(),
    date: v.string(),
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    ctx.db.insert("satellite_images", {
      userID: args.userID,
      date: args.date,
      storageID: args.storageId,
    });
  },
});

export const retrieveSatelliteImage = action({
    args: { 
        latitude: v.string(), 
        longitude: v.string(),
    },
    handler: async (ctx, args) => {
    //   const data = await ctx.runMutation(, {
    //     latitude: args.latitude,
    //     longitutude: args.longitude
    //   });
      // do something else, optionally use `data`
    },
  });