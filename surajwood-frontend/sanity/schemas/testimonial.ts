import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      type: "string",
      title: "Client Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "designation",
      type: "string",
      title: "Designation",
      placeholder: "e.g. Principal Interior Designer",
    }),
    defineField({
      name: "company",
      type: "string",
      title: "Company / Location",
      placeholder: "e.g. Studio Priya, Delhi",
    }),
    defineField({
      name: "quote",
      type: "text",
      title: "Quote",
      rows: 4,
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "rating",
      type: "number",
      title: "Rating (1–5)",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "projectType",
      type: "string",
      title: "Project Type",
      placeholder: "e.g. Luxury Residential Kitchen",
    }),
    defineField({
      name: "photo",
      type: "image",
      title: "Client Photo",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt Text" }),
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured on Homepage",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "company",
      media: "photo",
    },
  },
});
