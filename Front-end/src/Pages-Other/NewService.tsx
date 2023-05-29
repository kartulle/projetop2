import { ErrorMessage, Field, Form, Formik } from "formik"
import { Sidebar } from "../components/Sidebar/Sidebar"
import * as Yup from 'yup'
import { servicesApi } from "../services/api/services"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useState } from "react"

export function NewService() {
  const [image, setImage] = useState<File | null>()
  const navigate = useNavigate()

  function handleGoBack() {
    navigate(-1)
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if(!e.target.files) {
      return
    }
    setImage(e.target.files[0])
  }

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2 min-h-screen h-full">
          <Sidebar activeSidebarItem="Serviços" />
        </div>
        <div className="col-span-10 mx-auto px-4 py-10">
          <Formik
            initialValues={{
              name: '',
              minutes: 0,
              cost: 0,
              description: ''      
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Nome é obrigatório'),
              minutes: Yup.number().required('Duração é obrigatória'),
              cost: Yup.number().required('Valor é obrigatório'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              const { name, minutes, cost, description } = values

              const data = new FormData()

              data.append('name', name)
              data.append('description', description)
              data.append('durationInMinutes', String(minutes))
              data.append('value', String(cost))

              if(image) {
                data.append('image', image)
              }
              
              const res = await servicesApi.create(data)

              if(res.status == 201) {
                alert('Serviço criado com sucesso')
                navigate(-1)
                return
              }
              alert('Erro inesperado na criação do serviço')
            }}
          >
            <Form>
              <div>
                <button onClick={handleGoBack} className="absolute cursor-pointer mt-2 mr-10 -ml-12">
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>
                <h1 className="text-2xl font-medium text-center mb-10">Adicionar Novo Serviço</h1>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="name">Nome*</label>
                <Field 
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal" 
                />
                <ErrorMessage name="name" />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="minutes">Duração (em minutos)*</label>
                <Field 
                  type="number"
                  id="minutes"
                  name="minutes"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal" 
                  min={0}
                />
                <ErrorMessage name="minutes" />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="cost">Valor*</label>
                <Field 
                  type="number"
                  id="cost"
                  name="cost"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal" 
                  min={0}
                  step={0.01}
                />
                <ErrorMessage name="cost" />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="description">Descrição</label>
                <Field 
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal" 
                  id="description"
                  name="description"
                  as="textarea"
                  rows={5}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="image">Selecione a imagem</label>
                <input 
                  type="file"
                  id="image"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleSelectImages}
                />
              </div>
              <button 
                type="submit"
                className="block w-24 h-10 py-2 text-center bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-lg"
              >
                Adicionar
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  )
}