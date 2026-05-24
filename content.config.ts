import { defineContentConfig, defineCollection } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.string(),
        tags: z.array(z.string()).optional(),
        ogImage: z.string().optional(),
        sitemap: defineSitemapSchema({
          z,
          name: 'blog',
          filter: (entry) => {
            if (entry.draft) return false
            if (entry.date && new Date(entry.date) > new Date()) return false
            return true
          },
        }),
      }),
    }),
    works: defineCollection({
      type: 'data',
      source: 'works.yaml',
      schema: z.object({
        works: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            image: z.string(),
            github: z.string().optional(),
            url: z.string().optional(),
          })
        ),
      }),
    }),
  },
})
