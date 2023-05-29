import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { appointmentApi } from "../services/api/appointment";
import { Appointment } from "./AdminAppointments";
import { AppointmentListItem } from "../components/AppointmentListItem";

export function ClientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const notStartedAppointments = appointments?.filter(appointment => appointment.startTime == null)
  const inProgressAppointments = appointments?.filter(appointment => appointment.startTime && appointment.endTime == null)
  const finishedAppointments = appointments?.filter(appointment => appointment.endTime != null)

  useEffect(() => {
    getAppointments()
  }, [])
  
  async function getAppointments() {
    const appointmentsRes = await appointmentApi.findAllFromUser()
    setAppointments(appointmentsRes.data)
  }
  
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 min-h-screen h-full">
        <Sidebar activeSidebarItem="Meus Atendimentos" />
      </div>
      <div className="py-16 col-span-10">
        <h1 className="text-2xl font-medium uppercase text-center mb-4">Meus Atendimentos</h1>
        <p className="text-lg text-center mb-8">Veja aqui os seus atendimentos passados ou para serem iniciados.</p>
        <section className="grid grid-cols-2 gap-y-8 m-20 text-center">
          <h2 className="text-2xl text-left">Em Andamento</h2>
          <div className="col-span-2 px-8">
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
        </section>
        <section className="grid grid-cols-2 gap-y-8 m-20 text-center">
          <h2 className="text-2xl text-left">Não Iniciados</h2>
          <div className="col-span-2 px-8">
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
          </div>
        </section>
        <section className="grid grid-cols-2 gap-y-8 m-20 text-center">
          <h2 className="text-2xl text-left">Finalizados</h2>
          <div className="col-span-2 px-8">
          {
            finishedAppointments.length != 0 ? (
              finishedAppointments.map(appointment => (
                <AppointmentListItem 
                  appointment={appointment}
                />
              ))
            )
              :
            <span>Nenhum atendimento finalizado ainda.</span>
          }
          </div>
        </section>
      </div>
    </div>
  )
}