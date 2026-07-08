import { config, fields, collection } from '@keystatic/core';
const isProd = import.meta.env.PROD;

export default config({
  storage: isProd
    ? {
        kind: 'github',
        repo: 'neilmccracken-dev/astro-pt',
      }
    : {
        kind: 'local',
      },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Short Description' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    services: collection({
      label: 'Services',
      slugField: 'name',
      path: 'src/content/services/*/',
      format: { data: 'yaml' },

      schema: {
        name: fields.slug({ name: { label: 'Service Name' } }),
        duration: fields.number({ label: 'Duration (minutes)' }),
        pricing: fields.number({ label: 'Price ($)' }),
        description: fields.text({ label: 'Description', multiline: true }),
        calLink: fields.text({ label: 'Calendar Link' }),
        image: fields.image({
          label: 'Service Image',
          // The text string path Keystatic writes into the YAML file:
          validation: { isRequired: false },
        }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { data: 'yaml' },

      schema: {
        name: fields.slug({ name: { label: 'Person Name' } }),
        relationship: fields.text({ label: 'Relationship' }),
        headline: fields.text({
          label: 'Headline',
          validation: { isRequired: false },
        }),
        review: fields.text({ label: 'Review', multiline: true }),
      },
    }),
  },
});
