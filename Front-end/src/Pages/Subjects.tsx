import {useEffect, useState} from "react";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {
  faCircleInfo,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {subjectsApi} from "../services/api/subjects";

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  workload: number;
  optional: boolean | string;
  active: boolean | string;
  courseId: string;
}

export function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    getSubjects();
  }, []);

  async function getSubjects() {
    const res = await subjectsApi.index();
    setSubjects(res.data);
  }

  async function deleteSubjects(subjectId: string) {
    setSubjects(subjects.filter((subject) => subject.id != subjectId));
    await subjectsApi.delete(subjectId);
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 min-h-screen h-full">
        <Sidebar activeSidebarItem="Disciplinas" />
      </div>
      <div className="py-16 col-span-10">
        <h1 className="text-2xl font-medium uppercase text-center mb-4">
          Disciplinas
        </h1>
        <p className="text-lg text-center mb-8">Gerencia as disciplinas.</p>
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
                <th className="px-4 py-2">Curso Vinculado</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td className="border px-4 py-2">{subject.id}</td>
                  <td className="border px-4 py-2">{subject.name}</td>
                  <td className="border px-4 py-2">{subject.code}</td>
                  <td className="border px-4 py-2">{subject.semester}</td>
                  <td className="border px-4 py-2">{subject.workload}</td>
                  <td className="border px-4 py-2">
                    {subject.optional ? "Sim" : "Não"}
                  </td>
                  <td className="border px-4 py-2">
                    {subject.active ? "Ativo" : "Inativo"}
                  </td>
                  <td className="border px-4 py-2">{subject.courseId}</td>
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
