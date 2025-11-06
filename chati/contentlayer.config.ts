import { defineDocumentType, makeSource } from "contentlayer2/source-files"

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    slug: { type: "string", required: true },
    heroImage: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc.slug}`,
    },
  },
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    cover: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace("blog/", "")}`,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("blog/", ""),
    },
  },
}))

export const Industry = defineDocumentType(() => ({
  name: "Industry",
  filePathPattern: `industries/**/*.mdx`,
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: true },
    hero: { type: "string", required: false },
    useCases: {
      type: "list",
      of: {
        type: "nested",
        fields: {
          title: { type: "string", required: true },
          description: { type: "string", required: true },
        },
      },
      required: true,
    },
    templates: {
      type: "list",
      of: {
        type: "nested",
        fields: {
          name: { type: "string", required: true },
          description: { type: "string", required: true },
        },
      },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/industries/${doc.slug}`,
    },
  },
}))

export const PricingPlan = defineDocumentType(() => ({
  name: "PricingPlan",
  filePathPattern: `pricing/**/*.mdx`,
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    price: { type: "string", required: true },
    frequency: { type: "string", required: true },
    features: { type: "list", of: { type: "string" }, required: true },
    cta: { type: "string", required: true },
    popular: { type: "boolean", required: false },
    order: { type: "number", required: true },
  },
}))

export const Policy = defineDocumentType(() => ({
  name: "Policy",
  filePathPattern: `policies/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    type: { type: "string", required: true },
    lastUpdated: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc.type}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Page, Post, Industry, PricingPlan, Policy],
})
