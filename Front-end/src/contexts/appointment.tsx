import { createContext, useContext, useState } from "react";
import { Professional } from "../Pages-Other/Professionals";
import { Service } from "../Pages-Other/Services";

interface AuthContextValue {
  services: Service[]
  professional: Professional | null
  addService: (newService: Service) => void
  wasServiceAlreadyAdded: (serviceId: string) => boolean
  removeService: (serviceId: string) => void
  addProfessional: (professional: Professional) => void
  removeProfessional: () => void,
  resetAppointment: () => void
}

const AppointmentContext = createContext<AuthContextValue>({
  services: [],
  professional: null,
  addService: () => {},
  removeService: () => {},
  wasServiceAlreadyAdded: () => false,
  addProfessional: () => {},
  removeProfessional: () => {},
  resetAppointment: () => {}
})

interface Props {
  children: React.ReactNode
}

export function AppointmentProvider({children}: Props) {
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [services, setServices] = useState<Service[]>([])

  function addService(newService: Service) {
    setServices([...services, newService])
  }

  function removeService(serviceId: string) {
    setServices(
      services.filter(service => service.id != serviceId)
    )
  }

  function wasServiceAlreadyAdded(serviceId: string) {
    const service = services.find(service => service.id === serviceId)
    return service ? true : false
  }

  function addProfessional(newProfessional: Professional) {
    setProfessional(newProfessional)
  }

  function removeProfessional() {
    setProfessional(null)
  }

  function resetAppointment() {
    setServices([])
    setProfessional(null)
  }

  return (
    <AppointmentContext.Provider 
      value={{ services, professional, addService, removeService, wasServiceAlreadyAdded,  addProfessional, removeProfessional, resetAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointment() {
  const context = useContext(AppointmentContext)
  return context
}