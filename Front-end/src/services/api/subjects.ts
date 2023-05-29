import { api } from "./api"

export const subjectsApi = {
  async index() {
    return api.get('/subjects')
  },
  async create(name: string, code: string, semester: number, workload: number, optional: boolean, active: boolean, courseId: string) {
    return api.post('/subjects', {
      name,
      code,
      semester,
      workload,
      optional,
      active,
      courseId,
    })
  },
  async update(name: string, code: string) {
    return api.put('/subjects', {
      name,
      code
    })
  },
  async delete(id: string) {
    return api.delete(`/subjects/${id}`)
  }
}