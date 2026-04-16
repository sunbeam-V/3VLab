import { defineType, defineField } from 'sanity';

export const game = defineType({
  name: 'game',
  title: 'Игра',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Название игры',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-адрес',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: {
        list: [
          { title: 'В разработке', value: 'in-development' },
          { title: 'Вышла', value: 'released' },
          { title: 'Анонсирована', value: 'announced' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Обложка',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'steamLink',
      title: 'Ссылка на Steam',
      type: 'url',
    }),
  ],
});