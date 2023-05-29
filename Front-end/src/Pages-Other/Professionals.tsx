import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { useAuth } from "../contexts/auth"
import { professionalsApi } from "../services/api/professionals"

export interface Professional {
  id: string
  name: string
  commission: number
  imageUrl?: string
  description?: string
}

export function Professionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [filter, setFilter] = useState('')
  const { user } = useAuth()

  async function getProfessionals() {
    const professionals = await professionalsApi.index()
    setProfessionals(professionals.data)
  }
  
  useEffect(() => {
    getProfessionals()
  }, [])

  return (
    <div className="grid grid-cols-12">
    <div className="col-span-2 min-h-screen h-full">
      <Sidebar activeSidebarItem="Profissionais" />
    </div>
    <div className="py-16 col-span-10">
      <h1 className="text-2xl font-medium uppercase text-center mb-4">Profissionais</h1>
      <p className="text-lg text-center mb-8">Confira abaixo os profissionais disponíveis para te atender (para mais detalhes clique na imagem).</p>
      <div className="flex items-center justify-center mt-4">
          <div className="w-1/4">
            <input 
              className="bg-white focus:outline-none focus:shadow-outline-blue border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
              type="text" 
              placeholder="Procurar profissional"
              value={filter}
              onInput={(e) => setFilter(e.target.value)}
            />
          </div>
          {
            user?.role == 'admin' && (
              <div className="w-1/4 pl-16">
                <Link 
                to={"novo-profissional"}
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
          professionals.filter(professional => professional.name.toLowerCase().includes(filter.toLowerCase())).map(professional => (
            <Link to={`${professional.id}`}  
            state={professional}
            key={professional.id} 
            className="flex flex-col col-span-1 min-w-64 max-w-md mx-auto items-center brightness-75 hover:opacity-90 cursor-pointer"
            >
              <img 
                src={`
                  ${professional.imageUrl ? professional.imageUrl : "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                `} 
                alt={String(professional.name)}
                className="w-full max-h-80 rounded-md"
              />
              <h2 className="text-lg font-medium mt-2">{professional.name}</h2>
            </Link>
          ))
        }
      </div>
    </div>
  </div>

  )
}