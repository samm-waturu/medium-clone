import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: `Comments won't show on the site without approval`
    }),

    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text'
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    }),

    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),

    defineField({
      name: 'post',
      // title: 'Comment',
      type: 'reference',
      to: [{ type: 'post'}]
    }),

  ],

})
