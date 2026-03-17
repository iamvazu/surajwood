import { defineType, defineField } from "sanity";

export default defineType({
  name: "application",
  title: "Application",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Application Name",
      placeholder: "e.g. Kitchens",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt Text" }),
      ],
    }),
    defineField({
      name: "description",
      type: "array",
      title: "Description",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "gallery",
      type: "array",
      title: "Gallery",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        },
      ],
    }),
    defineField({
      name: "suitableProducts",
      type: "array",
      title: "Suitable Products",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "roomType",
      type: "string",
      title: "Room Type",
      placeholder: "e.g. Kitchen",
    }),
    defineField({
      name: "designTips",
      type: "text",
      title: "Design Tips",
      rows: 4,
    }),
    defineField({
      name: "faq",
      type: "array",
      title: "Application FAQs",
      of: [
        {
          type: "object",
          title: "FAQ",
          fields: [
            defineField({ name: "question", type: "string", title: "Question", validation: (Rule) => Rule.required() }),
            defineField({ name: "answer", type: "text", title: "Answer", rows: 4, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      type: "string",
      title: "SEO Title",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "SEO Description",
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "roomType", media: "heroImage" },
  },
});
