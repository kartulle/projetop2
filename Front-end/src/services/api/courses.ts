import { api } from "./api"

export const coursesApi = {
  async index() {
    return api.get('/courses')
  },
  async getCourseSubjects(courseId: string) {
    return api.get(`/courses/subjects/${courseId}`)
  },
  async create(name: string, requiredWorkload: number, requiredOptional: number, maxSemesterNumber: number) {
    return api.post('/courses', {
      name,
      requiredWorkload,
      requiredOptional,
      maxSemesterNumber,
    })
  },
  async update(courseId: string, name: string) {
    return api.post(`/courses/${courseId}`, {
      name,
    })
  },
  async delete(id: string) {
    return api.delete(`/courses/${id}`)
  }

  // Missing:
  // AddSubjectToCourse
  // RemoveSubjectFromCourse
}