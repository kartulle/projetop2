import { useEffect, useState } from "react"
import { AppointmentListItem } from "../components/AppointmentListItem"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { appointmentApi } from "../services/api/appointment"
import { Appointment } from "./AdminAppointments"

export function AppointmentsInProgress() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const inProgressAppointments = appointments?.filter(appointment => appointment.startTime && appointment.endTime == null)

  useEffect(() => {
    getAppointments()
  }, [])

  async function getAppointments() {
    const appointmentsRes = await appointmentApi.findAll()
    setAppointments(appointmentsRes.data)
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 min-h-screen h-full">
        <Sidebar activeSidebarItem="Atendimentos" />
      </div>
      <div className="py-16 col-span-10 px-8">
        <h1 className="text-2xl font-medium uppercase text-center mb-20">Atendimentos Em Andamento</h1>
          {
            inProgressAppointments.length != 0 ? (
              inProgressAppointments.map(appointment => (
                <AppointmentListItem 
                  appointment={appointment}
                />
              ))
            )
              :
            <span>Nenhum atendimento em andamento.</span>
          }
      </div>
    </div>
  )
}