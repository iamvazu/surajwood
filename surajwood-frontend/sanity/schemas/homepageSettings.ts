import { defineType, defineField } from "sanity";

/**
 * Singleton document — only one instance should exist.
 * Controls homepage content that is not product/blog-driven.
 */
export default defineType({
  name: "homepageSettings",
  title: "Homepage Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      type: "string",
      title: "Hero Headline",
      initialValue: "Premium Acrylic Panels for Modern Indian Interiors",
    }),
    defineField({
      name: "heroSubheadline",
      type: "string",
      title: "Hero Sub-Headline",
      initialValue: "European Technology. Indian Manufacturing. Pan-India Delivery.",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Background Image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt Text" }),
      ],
    }),
    defineField({
      name: "heroCtaPrimary",
      type: "string",
      title: "Primary CTA Label",
      initialValue: "Request Free Sample Kit",
    }),
    defineField({
      name: "heroCtaSecondary",
      type: "string",
      title: "Secondary CTA Label",
      initialValue: "Explore Collections",
    }),
    defineField({
      name: "trustBarItems",
      type: "array",
      title: "Trust Bar Items",
      of: [{ type: "string" }],
      initialValue: ["15+ Years", "50+ Shades", "10K+ Projects", "Pan-India Delivery"],
    }),
    defineField({
      name: "stats",
      type: "object",
      title: "Homepage Stats",
      fields: [
        defineField({ name: "years", type: "number", title: "Years in Business", initialValue: 15 }),
        defineField({ name: "shades", type: "number", title: "Number of Shades", initialValue: 50 }),
        defineField({ name: "projects", type: "number", title: "Projects Completed", initialValue: 10000 }),
        defineField({ name: "cities", type: "number", title: "Cities Served", initialValue: 2 }),
      ],
    }),
    defineField({
      name: "featuredProducts",
      type: "array",
      title: "Featured Products (Homepage Grid)",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "ctaBannerHeadline",
      type: "string",
      title: "CTA Banner Headline",
      initialValue: "Ready to transform your space?",
    }),
    defineField({
      name: "ctaBannerSubtext",
      type: "string",
      title: "CTA Banner Subtext",
    }),
    defineField({
      name: "whyChooseUsItems",
      type: "array",
      title: "Why Choose Us Items",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", type: "string", title: "Lucide Icon Name" }),
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "string", title: "Description" }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage Settings" }),
  },
});
