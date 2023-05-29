import { useEffect, useState } from "react"
import { AppointmentListItem } from "../components/AppointmentListItem"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { appointmentApi } from "../services/api/appointment"
import { Appointment } from "./AdminAppointments"

export function AppointmentsNotStarted() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const notStartedAppointments = appointments?.filter(appointment => appointment.startTime == null)

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
        <h1 className="text-2xl font-medium uppercase text-center mb-20">Atendimentos Não Iniciados</h1>
          {
            notStartedAppointments.length != 0 ? (
              notStartedAppointments.map(appointment => (
                <AppointmentListItem 
                  appointment={appointment}
                />
              ))
            )
              :
            <span>Nenhum atendimento para ser iniciado.</span>
            }
        {
        }
      </div>
    </div>
  )
}