import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { useAuth } from "../contexts/auth";
import { servicesApi } from "../services/api/services";

export interface Service {
  id: string
  name: string
  value: number
  duration: number
  imageUrl?: string
  description?: string
}

export function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [filter, setFilter] = useState('')
  const { user } = useAuth()

  const [currentTab, setCurrentTab] = useState("Novo Atendimento")

  function handleTabClick(tabTitle: string) {
    setCurrentTab(tabTitle)
  }

  async function getServices() {
    const services = await servicesApi.index()
    setServices(services.data)
  }
  
  useEffect(() => {
    getServices()
  }, [])

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 min-h-screen h-full">
        <Sidebar activeSidebarItem="Serviços" />
      </div>
      <div className="py-16 col-span-10">
        <h1 className="text-2xl font-medium uppercase text-center mb-4">Serviços</h1>
        <p className="text-lg text-center mb-8">
          Confira abaixo os serviços que oferecemos (para mais detalhes clique na imagem).
        </p>
        <div className="flex items-center justify-center mt-4">
            <div className="w-1/4">
              <input 
                className="bg-white focus:outline-none focus:shadow-outline-blue border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
                type="text" 
                placeholder="Procurar serviço"
                value={filter}
                onInput={(e) => setFilter(e.target.value)}
              />
            </div>
            {
              user?.role == 'admin' && (
                <div className="w-1/4 pl-16">
                  <Link 
                  to={"novo-servico"}
                  className="block w-24 h-10 py-2 text-center bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-lg"
                >
                  Novo
                </Link>
              </div>
              )
            }
        </div>
        <div className="grid grid-cols-2 gap-y-14 m-20 text-center">
          {
            services.filter(service => service.name.toLowerCase().includes(filter.toLowerCase())).map(service => (
              <Link to={`${service.id}`}  
              state={service}
              key={service.id} 
              className="flex flex-col col-span-1 min-w-64 max-w-md mx-auto items-center brightness-75 hover:opacity-90 cursor-pointer"
              >
                <img 
                  src={`
                    ${service.imageUrl ? service.imageUrl : "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                  `} 
                  alt={String(service.duration)}
                  className="w-full rounded-md"
                />
                <h2 className="text-lg font-medium mt-2">{service.name}</h2>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}
