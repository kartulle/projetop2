import { api } from "./api"

export const usersApi = {
  async index() {
    return api.get('/users')
  },
  async getUser(userId: string) {
    return api.get(`/users/subjects/${userId}`)
  },
  async create(name: string, username: string, role: string, password: string) {
    return api.post('/users', {
      name,
      username,
      role,
      password,
    })
  },
  async update(name: string) {
    return api.post('/users', {
      name,
    })
  },
  async delete(id: string) {
    return api.delete(`/users/${id}`)
  }

  // Missing:
  // AddSubjectToCourse
  // RemoveSubjectFromCourse
}