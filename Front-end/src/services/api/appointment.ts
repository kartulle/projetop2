import { api } from "./api"

interface createAppointmentDto {
  professionalId: string
  servicesIds: string[]
}

export const appointmentApi = {
  async create(data: createAppointmentDto) {
    return api.post('/appointments', data)
  },
  async findAll() {
    return api.get('/appointments')
  },
  async findAllFromUser() {
    return api.get('/appointments/client')
  },
  async get(id: string) {
    return api.get(`/appointments/${id}`)
  },
  async startAppointment(id: string) {
    return api.post(`/appointments/${id}/start`)
  },
  async endAppointment(id: string) {
    return api.post(`/appointments/${id}/finish`)
  },
  async delete(id: string) {
    return api.delete(`/appointments/${id}`)
  }
}