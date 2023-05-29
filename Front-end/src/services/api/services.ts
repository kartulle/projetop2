import { api } from "./api"

export const servicesApi = {
  async index() {
    return api.get('/services')
  },
  async create(data: FormData) {
    return api.post('/services', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  async delete(id: string) {
    return api.delete(`/services/${id}`)
  }
}