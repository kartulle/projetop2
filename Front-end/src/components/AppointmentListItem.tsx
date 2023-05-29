import * as Separator from '@radix-ui/react-separator';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { Appointment } from '../Pages-Other/AdminAppointments';
import { getFormatedDateTime } from "../utils/getFormatedDateTime"

interface Props {
  appointment: Appointment
}

export function AppointmentListItem({ appointment }: Props) {
  const { user } = useAuth()
  
  return (
    <>
      <div className="flex justify-between items-center" key={appointment.id}>
        <span>Criado: {getFormatedDateTime(String(appointment.createdAt))}</span>
        {
          user?.role == 'admin' ?
            <span>Cliente: {appointment.client.name}</span> 
            : <span>Profissional: {appointment.professional.name}</span>
        }
        <span>Iniciado: {appointment?.startTime ? getFormatedDateTime(appointment.startTime) : 'Não iniciado'}</span>
        <span>Finalizado: {appointment?.endTime ? getFormatedDateTime(appointment?.endTime) : 'Não finalizado'}</span>
        <Link 
          to={`${appointment.id}`}
          state={appointment}
          className="block w-24 h-10 py-2 text-center bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-lg"
        >
          Detalhes
        </Link>
      </div>
      <Separator.Root className="h-[1px] w-full bg-slate-400 my-8" />
    </>
  )
}

