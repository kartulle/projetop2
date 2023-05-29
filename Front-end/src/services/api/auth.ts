import { api } from "./api"

export const authApi = {
  async login(email: string, password: string) {
    return api.post('/auth/login', {
      email,
      password
    })
  }
}