export default {
  name: 'heroImage',
  type: 'document',
  title: 'Two Hero Images',
  fields: [
    {
      name: 'title',
      type: 'text',
      title: 'Titolo prima pagina',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description prima pagina',
    },
    {
      name: 'image1',
      type: 'image',
      title: 'First Image',
    },
    {
      name: 'image2',
      type: 'image',
      title: 'Second Image',
    },
  ],
}
