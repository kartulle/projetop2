import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import {coursesApi} from "../services/api/courses";

export function NewCourse() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2 min-h-screen h-full">
          <Sidebar activeSidebarItem="Profissionais" />
        </div>
        <div className="col-span-10 mx-auto px-4 py-10">
          <Formik
            initialValues={{
              name: "",
              requiredWorkload: 0,
              optionalWorkload: 0,
              maxSemesterNumber: 0,
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Nome é obrigatório"),
              requiredWorkload: Yup.number().required(
                'Campo "Carga horária obrigatória" é obrigatório'
              ),
              optionalWorkload: Yup.number().required(
                'Campo "Carga Horária eletiva" é obrigatório'
              ),
              maxSemesterNumber: Yup.number().required(
                "Número máximo de semestres é obrigatório"
              ),
            })}
            onSubmit={async (values, {}) => {
              const {
                name,
                requiredWorkload,
                optionalWorkload,
                maxSemesterNumber,
              } = values;

              const res = await coursesApi.create(
                name,
                requiredWorkload,
                optionalWorkload,
                maxSemesterNumber
              );

              if (res.status == 200) {
                alert("Curso criado com sucesso");
                navigate(-1);
                return;
              }
              alert("Erro inesperado na criação do curso");
            }}
          >
            <Form>
              <div>
                <button
                  onClick={handleGoBack}
                  className="absolute cursor-pointer mt-2 mr-10 -ml-12"
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>
                <h1 className="text-2xl font-medium text-center mb-10">
                  Adicionar Novo Curso
                </h1>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="name">
                  Nome*
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                />
                <ErrorMessage name="name" />
              </div>
              <div className="mb-4">
                <label
                  className="block font-medium mb-2"
                  htmlFor="requiredWorkload"
                >
                  Carga Horária Obrigatória*
                </label>
                <Field
                  type="number"
                  id="requiredWorkload"
                  name="requiredWorkload"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                  min={0}
                  step={1}
                />
                <ErrorMessage name="requiredWorkload" />
              </div>
              <div className="mb-4">
                <label
                  className="block font-medium mb-2"
                  htmlFor="optionalWorkload"
                >
                  Carga Horária Eletiva*
                </label>
                <Field
                  type="number"
                  id="optionalWorkload"
                  name="optionalWorkload"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                  min={0}
                  step={1}
                />
                <ErrorMessage name="optionalWorkload" />
              </div>
              <div className="mb-4">
                <label
                  className="block font-medium mb-2"
                  htmlFor="maxSemesterNumber"
                >
                  Número Máximo de Semestres*
                </label>
                <Field
                  type="number"
                  id="maxSemesterNumber"
                  name="maxSemesterNumber"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                  min={0}
                  step={1}
                />
                <ErrorMessage name="maxSemesterNumber" />
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
  );
}
