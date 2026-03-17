import { defineType, defineField } from "sanity";

/**
 * Singleton document — global site settings used across all pages.
 */
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      type: "string",
      title: "Site Name",
      initialValue: "Suraj Wood",
    }),
    defineField({
      name: "siteUrl",
      type: "url",
      title: "Site URL",
      initialValue: "https://www.surajwood.com",
    }),
    defineField({
      name: "defaultSeoTitle",
      type: "string",
      title: "Default SEO Title",
      initialValue: "Suraj Wood | Premium Acrylic Panels | ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS",
    }),
    defineField({
      name: "defaultSeoDescription",
      type: "text",
      title: "Default SEO Description",
      rows: 3,
      initialValue:
        "India's premium acrylic panel manufacturer. ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS and ACRYGLASS MATTE panels for kitchens, wardrobes, and commercial interiors.",
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Default OG Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt Text", initialValue: "Suraj Wood Logo" }),
      ],
    }),
    defineField({
      name: "contactPhone",
      type: "string",
      title: "Contact Phone",
      initialValue: "+91-9999995553",
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: "Contact Email",
      initialValue: "sales@surajwood.com",
    }),
    defineField({
      name: "address",
      type: "object",
      title: "Factory Address",
      fields: [
        defineField({ name: "street", type: "string", title: "Street", initialValue: "45 KM Stone, VPO Rohad" }),
        defineField({ name: "city", type: "string", title: "City", initialValue: "Bahadurgarh" }),
        defineField({ name: "state", type: "string", title: "State", initialValue: "Haryana" }),
        defineField({ name: "postalCode", type: "string", title: "Postal Code", initialValue: "124501" }),
        defineField({ name: "country", type: "string", title: "Country", initialValue: "India" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      type: "object",
      title: "Social Links",
      fields: [
        defineField({ name: "instagram", type: "url", title: "Instagram URL" }),
        defineField({ name: "linkedin", type: "url", title: "LinkedIn URL" }),
        defineField({ name: "whatsapp", type: "string", title: "WhatsApp Number", placeholder: "919999995553" }),
      ],
    }),
    defineField({
      name: "navLinks",
      type: "array",
      title: "Navigation Links",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "URL" }),
            defineField({
              name: "children",
              type: "array",
              title: "Dropdown Items",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string", title: "Label" }),
                    defineField({ name: "href", type: "string", title: "URL" }),
                  ],
                },
              ],
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "footerText",
      type: "text",
      title: "Footer About Text",
      rows: 3,
      initialValue:
        "India's premium acrylic panel manufacturer. European technology, precision manufacturing, pan-India delivery.",
    }),
    defineField({
      name: "googleAnalyticsId",
      type: "string",
      title: "Google Analytics ID",
      placeholder: "G-XXXXXXXXXX",
    }),
    defineField({
      name: "googleTagManagerId",
      type: "string",
      title: "Google Tag Manager ID",
      placeholder: "GTM-XXXXXXX",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
