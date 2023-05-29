import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import * as Separator from '@radix-ui/react-separator';
import { useEffect, useState } from "react";
import { appointmentApi } from "../services/api/appointment";
import { getFormatedDateTime } from "../utils/getFormatedDateTime";
import { getFormatedMinutes } from "../utils/getFormattedMinutes";
import { Appointment } from "./AdminAppointments";
import { useAuth } from "../contexts/auth";

export interface AppointmentDetail {
  id: string
  startTime?: Date,
  endTime?: Date,
  createdAt: Date
  summary: {
    servicesCost: number
    professionalCommission: number
    totalCost: number
    expectedDurationInMinutes: number
    appointmentDurationInMinutes: number | null
  }
  professional: {
    name: string
    commission: number
  }
  services: [
    {
      name: string
      value: number
      duration: number
    }
  ]
  attendeeId: string
}

export function AppointmentDetail() {
  const [appointment, setAppointment] = useState<AppointmentDetail | null>(null)

  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { id: appointmentId, client }: Appointment = location.state

  useEffect(() => {
    getAppointmentDetail()
  }, [])

  async function getAppointmentDetail() {
    const appointmentDetails = await appointmentApi.get(appointmentId)
    setAppointment(appointmentDetails.data)
  }

  async function handleUpdateAppointmentStatus() {
    if(!appointment) {
      return
    }
    
    if(!appointment.startTime) {
      appointmentApi.startAppointment(appointment.id)
    }
    else if(appointment.startTime && !appointment.endTime) {
      appointmentApi.endAppointment(appointment.id)
    }

    setAppointment(null)
    alert('Atendimento atualizado com sucesso!')
    getAppointmentDetail()
  }

  async function handleDeleteAppointment() {
    if(!appointment) {
      return
    }
    
    const res = await appointmentApi.delete(appointment.id)

    if(res.status !== 200) {
      alert('Houve um problema durante a remoção do Atendimento')
      return
    }
    
    alert('Atendimento deletado com sucesso')
    navigate(-1)
  }

  function handleGoBack() {
    navigate(-1)
  }
  
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 min-h-screen h-full">
      <Sidebar activeSidebarItem={ user?.role == 'admin' ? 'Atendimentos' : 'Meus Atendimentos'} />
      </div>
      <div className="relative col-span-10 px-8 py-16">
        <button onClick={handleGoBack} className="absolute cursor-pointer">
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <h1 className="text-2xl font-medium uppercase text-center mb-4">Detalhes do Atendimento</h1>
        <p className="text-lg text-center mb-8">Atendimento solicitado por <strong>{client.name}</strong></p>
        <section className="flex justify-center">
          <div className="w-80 gap-y-8 mx-20 mt-16 text-center">
            <h2 className="text-2xl text-left mb-4">Valores</h2>
            <div className="flex justify-between border-b border-black mb-4">
              <span>Custo dos Serviços</span>
              <span>R$ {appointment?.summary.servicesCost}</span>
            </div>
            <div className="flex justify-between border-b border-black mb-4">
              <span>Comissão do Profissional</span>
              <span>R$ {appointment?.summary.professionalCommission}</span>
            </div>
            <div className="flex justify-between border-b border-black mb-4">
              <span><strong>Total</strong></span>
              <span><strong>R$ {appointment?.summary.totalCost}</strong></span>
            </div>
          </div>
          <div className="w-80 gap-y-8 mx-20 mt-16 text-center">
            <h2 className="text-2xl text-left mb-4">Tempo</h2>
            <div className="flex justify-between border-b border-black mb-4">
              <span>Solicitado em</span>
              <span>
                { appointment ? getFormatedDateTime(appointment?.createdAt) : '' }
              </span>
            </div>
            <div className="flex justify-between border-b border-black mb-4">
              <span>Iniciado</span>
              <span>
                { appointment?.startTime ? getFormatedDateTime(appointment.startTime) : 'Não iniciado' }
              </span>
            </div>
            <div className="flex justify-between border-b border-black mb-4">
              <span>Finalizado</span>
              <span>
                { appointment?.endTime ? getFormatedDateTime(appointment.endTime) : 'Não finalizado' }
              </span>
            </div>
            <div className="flex justify-between border-b border-black mb-4">
              <span>Tempo Previsto</span>
              <span>
                { appointment ? `${getFormatedMinutes(appointment.summary.expectedDurationInMinutes)}` : '' }
              </span>
            </div>
            <div className="flex justify-between border-b border-black mb-4">
              <span><strong>Tempo Decorrido</strong></span>
              <span>
                <strong>
                  { appointment?.summary.appointmentDurationInMinutes ? `${getFormatedMinutes(appointment.summary.appointmentDurationInMinutes)}` : '' }
                </strong>
              </span>
            </div>
          </div>
        </section>
        <Separator.Root className="h-[1px] w-full bg-slate-400 my-8" />
        <section className="flex justify-center">
          <div className="w-80 gap-y-8 mx-20 mt-16 text-center">
            <h2 className="text-2xl text-left mb-4">Serviços</h2>
              {
                appointment?.services.map(service => (
                  <div className="flex justify-between border-b border-black mb-4" key={service.name}>
                    <span>{service.name}</span>
                    <span>{service.duration} min</span>
                    <span>R$ {service.value}</span>
                  </div>
                ))
              }
          </div>
          <div className="w-80 gap-y-8 mx-20 mt-16 text-center">
            <h2 className="text-2xl text-left mb-4">Funcionários</h2>
            <div className="flex justify-between border-b border-black mb-4">
              <span>Profissional Responsável</span>
              <span>{appointment?.professional.name}</span>
            </div>
            <div className="flex justify-between border-b border-black mb-4">
              <span>Taxa do Profissional</span>
              <span>{appointment?.professional.commission}</span>
            </div>
            <div className="border-b border-black mb-4">
              <span>Atendente: </span>
              <span>{appointment?.attendeeId}</span>
            </div>
          </div>
        </section>
        <div className="flex items-center justify-center mt-4">
          {
            user?.role == 'admin' && (
              <>
                {
                  !appointment?.endTime && (
                    <div className="mx-4">
                      <button 
                        onClick={handleUpdateAppointmentStatus}
                        className="block w-24 h-10 py-2 text-center bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-lg"
                      >
                        { appointment?.startTime ? 'Finalizar' : 'Iniciar' }
                      </button>
                    </div>
                  )
                }
                <div className="mx-4">
                  <button 
                    onClick={handleDeleteAppointment}
                    className="block w-24 h-10 py-2 text-center bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg"
                >
                  Excluir
                </button>
              </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}