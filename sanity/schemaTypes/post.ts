import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title"
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" }
    }),

    defineField({
      name: "description",
      type: "text",
      title: "Short Description"
    }),

    defineField({
      name: "body",
      type: "array",
      title: "Content",
      of: [{ type: "block" }]
    }),

    defineField({
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: { hotspot: true }
    }),

    defineField({
      name: "approved",
      title: "Approved by Admin",
      type: "boolean",
      initialValue: false
    }),

    defineField({
      name: "createdByUser",
      title: "Created by User",
      type: "boolean",
      initialValue: true
    }),

    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At"
    })
  ]
});
