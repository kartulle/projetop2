import { api } from "./api"

export const professionalsApi = {
  async index() {
    return api.get('/professionals')
  },
  async create(data: FormData) {
    return api.post('/professionals', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  async delete(id: string) {
    return api.delete(`/professionals/${id}`)
  }
}