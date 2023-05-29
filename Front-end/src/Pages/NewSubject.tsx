import {useLocation, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import {coursesApi} from "../services/api/courses";
import {Course} from "./Courses";
import {subjectsApi} from "../services/api/subjects";

export function NewSubject() {
  const navigate = useNavigate();
  const location = useLocation();
  const course: Course = location.state;

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
              code: "",
              semester: 1,
              workload: 1,
              optional: "true",
              active: "true",
              courseId: course.id,
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Nome é obrigatório"),
              code: Yup.string().required("Código é obrigatório"),
              semester: Yup.number().required("Semestre é obrigatório"),
              workload: Yup.number().required("Carga horária é obrigatória"),
            })}
            onSubmit={async (values, {}) => {
              const {
                name,
                code,
                semester,
                workload,
                optional,
                active,
                courseId,
              } = values;

              const res = await subjectsApi.create(
                name,
                code,
                semester,
                workload,
                optional == "true" ? true : false,
                active == "true" ? true : false,
                courseId
              );

              if (res.status == 200) {
                alert("Disciplina criada com sucesso");
                navigate(-1);
                return;
              }
              alert("Erro inesperado na criação da disciplina");
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
                  Adicionar Nova Disciplina
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
                <label className="block font-medium mb-2" htmlFor="code">
                  Código*
                </label>
                <Field
                  type="text"
                  id="code"
                  name="code"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                />
                <ErrorMessage name="code" />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="semester">
                  Semestre*
                </label>
                <Field
                  type="number"
                  id="semester"
                  name="semester"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                  min={0}
                  step={1}
                />
                <ErrorMessage name="semester" />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2" htmlFor="workload">
                  Carga Horária*
                </label>
                <Field
                  type="number"
                  id="workload"
                  name="workload"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                  min={0}
                  step={1}
                />
                <ErrorMessage name="workload" />
              </div>
              <div className="mb-4">
                <div className="block font-medium mb-2">
                  Matéria Obrigatória ou Eletiva?*
                </div>
                <div
                  role="group"
                  aria-labelledby="my-radio-group"
                  className="flex"
                >
                  <label className="mr-6">
                    <Field type="radio" name="optional" value="true" />{" "}
                    Obrigatória
                  </label>
                  <br />
                  <label>
                    <Field type="radio" name="optional" value="false" /> Eletiva
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <div className="block font-medium mb-2">Matéria Ativa?*</div>
                <div
                  role="group"
                  aria-labelledby="my-radio-group"
                  className="flex"
                >
                  <label className="mr-6">
                    <Field type="radio" name="active" value="true" />{" "}
                    Obrigatória
                  </label>
                  <br />
                  <label>
                    <Field type="radio" name="active" value="false" /> Eletiva
                  </label>
                </div>
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
