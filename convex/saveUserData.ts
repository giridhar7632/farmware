import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const saveUser = mutation({
  args: { email: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
    })
  },
})

export const updateUser = mutation({
  args: { id: v.id('users'), name: v.string() },
  handler: async (ctx, args) => {
    const { id, name } = args
    await ctx.db.patch(id, { name })
  },
})
