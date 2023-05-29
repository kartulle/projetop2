import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useAuth } from '../contexts/auth';

export function SignIn() {  
  const { login, signed, user, } = useAuth()
  const navigate = useNavigate()
  
  return (
    <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    validationSchema={Yup.object({
      password: Yup.string().required('Required')
    })}
    onSubmit={async (values, { setSubmitting }) => {
        const { username, password } = values
        await login(username, password)
        setSubmitting(false)
    }}
    >
        <Form className="w-full bg-white p-6 shadow-md">
          <div className='text-center'>
            <h1><b>Login</b></h1>
            <h2>Acesso de Usuário</h2>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">Username</label>
            <Field className="border border-gray-400 p-2 rounded-lg w-full" name="username" type="text" />
            <ErrorMessage name="username" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
            <Field className="border border-gray-400 p-2 rounded-lg w-full" name="password" type="password" />
            <ErrorMessage name="password" />
          </div>

          <div className="text-center">
            
            <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600" type="submit">
              Entrar
            </button>
          </div>
          <div className='text-center'>
            
            <Link to="/cursos/" className="btn">Admin</Link>
             |
            <Link to="/aluno/" className="btn">Aluno</Link>
          </div>
        </Form>
    </Formik>
  );
};
