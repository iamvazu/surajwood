import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Product Name",
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
      name: "tagline",
      type: "string",
      title: "Tagline",
    }),
    defineField({
      name: "finishType",
      type: "string",
      title: "Finish Type",
      options: {
        list: [
          { title: "Satin", value: "satin" },
          { title: "Soft Satin", value: "soft-satin" },
          { title: "Matte", value: "matte" },
          { title: "High Gloss", value: "high-gloss" },
          { title: "Matte Glass", value: "matte-glass" },
        ],
      },
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
      name: "shortDescription",
      type: "text",
      title: "Short Description",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "fullDescription",
      type: "array",
      title: "Full Description",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "idealFor",
      type: "array",
      title: "Ideal For",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Kitchens", value: "kitchens" },
          { title: "Wardrobes", value: "wardrobes" },
          { title: "Commercial", value: "commercial" },
          { title: "Offices", value: "offices" },
          { title: "Living Spaces", value: "living spaces" },
          { title: "Feature Walls", value: "feature walls" },
          { title: "Bedrooms", value: "bedrooms" },
          { title: "Luxury Residential", value: "luxury residential" },
        ],
      },
    }),
    defineField({
      name: "thickness",
      type: "string",
      title: "Thickness",
      placeholder: "e.g. 1mm, 1.5mm, 3mm",
    }),
    defineField({
      name: "dimensions",
      type: "string",
      title: "Dimensions",
      placeholder: "e.g. 8ft x 4ft (2440mm x 1220mm) standard sheet",
    }),
    defineField({
      name: "materialComposition",
      type: "text",
      title: "Material Composition",
      rows: 4,
    }),
    defineField({
      name: "surfaceProperties",
      type: "text",
      title: "Surface Properties",
      rows: 4,
    }),
    defineField({
      name: "technicalSpecs",
      type: "object",
      title: "Technical Specs",
      fields: [
        defineField({ name: "scratchResistance", type: "string", title: "Scratch Resistance" }),
        defineField({ name: "uvStability", type: "string", title: "UV Stability" }),
        defineField({ name: "antiFingerprint", type: "boolean", title: "Anti-Fingerprint Coating" }),
        defineField({ name: "fireRating", type: "string", title: "Fire Rating" }),
        defineField({ name: "warranty", type: "string", title: "Warranty" }),
      ],
    }),
    defineField({
      name: "colourRange",
      type: "array",
      title: "Colour Range",
      of: [
        {
          type: "object",
          title: "Colour",
          fields: [
            defineField({ name: "colourName", type: "string", title: "Colour Name", validation: (Rule) => Rule.required() }),
            defineField({ name: "hexValue", type: "string", title: "Hex Value", placeholder: "#FFFFFF" }),
            defineField({
              name: "swatchImage",
              type: "image",
              title: "Swatch Image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt Text" }],
            }),
          ],
          preview: {
            select: { title: "colourName", subtitle: "hexValue" },
          },
        },
      ],
    }),
    defineField({
      name: "faq",
      type: "array",
      title: "Product FAQs",
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
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Lower numbers appear first (e.g. 1 = ACRYLUX, 2 = ACRYSILK…)",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "finishType", media: "heroImage" },
  },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
