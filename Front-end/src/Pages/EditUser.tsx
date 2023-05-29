import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import {usersApi} from "../services/api/users";

export function EditUser() {
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
              username: "",
              role: "",
              password: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Nome é obrigatório"),
              username: Yup.string().required(
                'Campo "Nome de Usuário" é obrigatório'
              ),
              role: Yup.string().required(
                'Campo "Cargo" é obrigatório'
              ),
              password: Yup.string().required(
                'Campo "Senha" é obrigatório'
              )
            })}
            onSubmit={async (values, {}) => {
              const {
                name,
                username,
                role,
                password,
              } = values;

              const res = await usersApi.create(
                name,
                username,
                role,
                password,
              );

              if (res.status == 200) {
                alert("Usuário criado com sucesso");
                navigate(-1);
                return;
              }
              alert("Erro inesperado na criação do usuário");
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
                  Editar Usuário
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
                  htmlFor="username"
                >
                  Nome de Usuário*
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                />
                <ErrorMessage name="username" />
              </div>
              <div className="mb-4">
                <label
                  className="block font-medium mb-2"
                  htmlFor="role"
                >
                  Cargo* - 'admin' ou 'aluno'
                </label>
                <Field
                  type="text"
                  id="role"
                  name="role"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                />
                <ErrorMessage name="role" />
              </div>
              <div className="mb-4">
                <label
                  className="block font-medium mb-2"
                  htmlFor="password"
                >
                  Senha*
                </label>
                <Field
                  type="text"
                  id="password"
                  name="password"
                  className="bg-gray-200 border border-gray-200 rounded-lg py-2 px-4 block w-full leading-normal"
                />
                <ErrorMessage name="password" />
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
