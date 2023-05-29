import {useEffect, useState} from "react";
import {coursesApi} from "../services/api/courses";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {
  faCircleInfo,
  faTrash,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useLocation} from "react-router-dom";
import {Subject} from "./Subjects";
import {Course} from "./Courses";

export function CourseDetail() {
  const [filter, setFilter] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const user = {role: "admin"};

  const location = useLocation();
  const course: Course = location.state;

  useEffect(() => {
    getCourseSubjects();
  }, []);

  async function getCourseSubjects() {
    const res = await coursesApi.getCourseSubjects(course.id);
    setSubjects(res.data);
  }

  async function deleteSubjects(subjectId: string) {
    setSubjects(subjects.filter((subject) => subject.id != subjectId));
    await coursesApi.delete(subjectId);
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 min-h-screen h-full">
        <Sidebar activeSidebarItem="Cursos" />
      </div>
      <div className="py-16 col-span-10">
        <h1 className="text-2xl font-medium uppercase text-center mb-4">
          Curso: {course.name}
        </h1>
        <p className="text-lg text-center mb-8">
          Gerencie o curso <strong>{course.name}</strong>
        </p>
        <div className="flex items-center justify-center mt-4">
          <div className="flex">
            <div>
              <input
                className="bg-white focus:outline-none focus:shadow-outline-blue border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                placeholder="Procurar disciplina"
                value={filter}
                onInput={(e) => setFilter(e.target.value)}
              />
            </div>
            {user?.role == "admin" && (
              <div className="w-1/4 pl-16">
                <Link
                  to={"nova-disciplina"}
                  state={course}
                  key={course.id}
                  className="block w-24 h-10 py-2 text-center bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-lg"
                >
                  Novo
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex justify-center mb-10">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Adicionar Curso
          </button>
        </div> */}
        <div className="m-20">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Código</th>
                <th className="px-4 py-2">Semestre</th>
                <th className="px-4 py-2">Carga Horária</th>
                <th className="px-4 py-2">Opcional</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {subjects
                .filter((course) =>
                  course.name.toLowerCase().includes(filter.toLowerCase())
                )
                .map((subject) => (
                  <tr key={subject.id}>
                    <td className="border px-4 py-2">{subject.id}</td>
                    <td className="border px-4 py-2">{subject.name}</td>
                    <td className="border px-4 py-2">{subject.code}</td>
                    <td className="border px-4 py-2">{subject.semester}</td>
                    <td className="border px-4 py-2">{subject.workload}</td>
                    <td className="border px-4 py-2">
                      {subject.optional == "true" ? "Sim" : "Não"}
                    </td>
                    <td className="border px-4 py-2">
                      {subject.active == "true" ? "Ativo" : "Inativo"}
                    </td>
                    <td className="border px-4 py-2">
                      <button className="mr-2">
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          size="xl"
                          className="text-blue-500"
                        />
                      </button>
                      <button className="mr-2">
                        <FontAwesomeIcon
                          icon={faPencil}
                          size="xl"
                          className="text-green-400"
                        />
                      </button>
                      <button onClick={() => deleteSubjects(subject.id)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="xl"
                          className="text-red-500"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
