import {Route, Routes} from "react-router-dom";
import {useAuth} from "./contexts/auth";
import {AdminAppointments} from "./Pages-Other/AdminAppointments";
import {AppointmentsFinished} from "./Pages-Other/AppointmentsFinished";
import {AppointmentsInProgress} from "./Pages-Other/AppointmentsInProgress";
import {AppointmentsNotStarted} from "./Pages-Other/AppointmentsNotStarted";
import {AuthTabs} from "./Pages-Other/AuthTabs";
import {AppointmentDetail} from "./Pages-Other/AppointmentDetail";
import {ClientAppointments} from "./Pages-Other/ClientAppointments";
import {NewAppointment} from "./Pages-Other/NewAppointment";
import {NewProfessional} from "./Pages-Other/NewProfessional";
import {NewService} from "./Pages-Other/NewService";
import {ProfessionalDetail} from "./Pages-Other/ProfessionalDetail";
import {Professionals} from "./Pages-Other/Professionals";
import {ServiceDetail} from "./Pages-Other/ServiceDetail";
import {Services} from "./Pages-Other/Services";

import {Courses} from "./Pages/Courses";
import {Subjects} from "./Pages/Subjects";
import {Users} from "./Pages/Users";
import {NewCourse} from "./Pages/NewCourse";
import {CourseDetail} from "./Pages/CourseDetail";
import {NewSubject} from "./Pages/NewSubject";
import {NewUser} from "./Pages/NewUser";
import {EditCourse} from "./Pages/EditCourse";
import {EditUser} from "./Pages/EditUser";

import {Student} from "./Pages/Student";
import { StudentSubjects } from "./Pages/StudentSubjects";
import { StudentCounseling } from "./Pages/StudentCounseling";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";

export function PublicRoutes() {
  return (
    <Routes>
      {/* //LOGIN */}
      <Route path="/" element={<SignIn />}></Route>


      {/* //ALUNO */}
      <Route path="/aluno" element={<Student />}></Route>
      <Route path="/alunoDisciplinas" element={<StudentSubjects />}></Route>
      <Route path="/alunoAconselhamento" element={<StudentCounseling />}></Route>


      {/* //ADMINISTRADOR */}
      {/* //USUARIOS */}
      <Route path="/usuarios" element={<Users />}></Route>
      <Route path="/usuarios/novo-usuario" element={<NewUser />}></Route>
      <Route path="/usuarios/editar-usuario" element={<EditUser />}></Route>

      {/* //DISCIPLINAS */}
      <Route path="/disciplinas" element={<Subjects />}></Route>

      {/* //CURSOS */}
      <Route path="/cursos" element={<Courses />}></Route>
      <Route path="/cursos/:id" element={<CourseDetail />}></Route>
      <Route
        path="/cursos/:id/nova-disciplina"
        element={<NewSubject />}
      ></Route>
      <Route path="/cursos/novo-curso" element={<NewCourse />}></Route>
      <Route path="/cursos/editar-curso" element={<EditCourse />}></Route>
    </Routes>
  );
}

export function PrivateRoutes() {
  const {user} = useAuth();

  return (
    <Routes>
      {user?.role == "admin" ? (
        <>
          <Route path="atendimentos" element={<AdminAppointments />} />
          <Route path="atendimentos/:id" element={<AppointmentDetail />} />
          <Route
            path="atendimentos/nao-iniciados"
            element={<AppointmentsNotStarted />}
          />
          <Route
            path="atendimentos/em-andamento"
            element={<AppointmentsInProgress />}
          />
          <Route
            path="atendimentos/finalizados"
            element={<AppointmentsFinished />}
          />

          <Route
            path="atendimentos/nao-iniciados/:id"
            element={<AppointmentDetail />}
          />
          <Route
            path="atendimentos/em-andamento:id"
            element={<AppointmentDetail />}
          />
          <Route
            path="atendimentos/finalizados/:id"
            element={<AppointmentDetail />}
          />

          <Route
            path="profissionais/novo-profissional"
            element={<NewProfessional />}
          />
          <Route path="services/novo-servico" element={<NewService />} />
        </>
      ) : (
        <>
          <Route path="novo-atendimento" element={<NewAppointment />} />

          <Route path="meus-atendimentos" element={<ClientAppointments />} />
          <Route path="meus-atendimentos/:id" element={<AppointmentDetail />} />
        </>
      )}
      <Route path="services" element={<Services />} />
      <Route path="services/:id" element={<ServiceDetail />} />

      <Route path="profissionais" element={<Professionals />} />
      <Route path="profissionais/:id" element={<ProfessionalDetail />} />
    </Routes>
  );
}

export function Paths() {
  const {signed} = useAuth();

  return signed ? <PrivateRoutes /> : <PublicRoutes />;
}
