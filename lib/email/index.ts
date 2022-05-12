export const getEmailOptions = (to: string, name: string, total: number) => ({
  to,
  from: {
    email: 'mariusflorescu23@icloud.com',
    name: 'Marius Florescu'
  },
  templateId: 'd-0f868e4b9e3e4bbf9845ea6998c6abbd',
  dynamic_template_data: {
    name,
    total
  }
})
