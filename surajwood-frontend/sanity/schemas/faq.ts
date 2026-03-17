import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      type: "string",
      title: "Question",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      type: "array",
      title: "Answer",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Product", value: "product" },
          { title: "Maintenance", value: "maintenance" },
          { title: "Technical", value: "technical" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkedProduct",
      type: "reference",
      title: "Linked Product (optional)",
      description: "Leave blank for general FAQs",
      to: [{ type: "product" }],
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
