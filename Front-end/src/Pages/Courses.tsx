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
import {Link} from "react-router-dom";

export interface Course {
  id: string;
  name: string;
}

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState("");
  const user = {role: "admin"};

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    const res = await coursesApi.index();
    setCourses(res.data);
  }

  async function deleteCourse(courseId: string) {
    setCourses(courses.filter((course) => course.id != courseId));
    await coursesApi.delete(courseId);
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 min-h-screen h-full">
        <Sidebar activeSidebarItem="Cursos" />
      </div>
      <div className="py-16 col-span-10">
        <h1 className="text-2xl font-medium uppercase text-center mb-4">
          Cursos
        </h1>
        <p className="text-lg text-center mb-8">
          Gerencie os cursos e suas disciplinas.
        </p>
        <div className="flex items-center justify-center mt-4">
          <div className="flex">
            <div>
              <input
                className="bg-white focus:outline-none focus:shadow-outline-blue border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                placeholder="Procurar curso"
                value={filter}
                onInput={(e) => setFilter(e.target.value)}
              />
            </div>
            {user?.role == "admin" && (
              <div className="w-1/4 pl-16">
                <Link
                  to={"novo-curso"}
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
          <table className="table-auto mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {courses
                .filter((course) =>
                  course.name.toLowerCase().includes(filter.toLowerCase())
                )
                .map((course) => (
                  <tr key={course.id}>
                    <td className="border px-4 py-2">{course.id}</td>
                    <td className="border px-4 py-2">{course.name}</td>
                    <td className="border px-4 py-2">
                      <button className="mr-2">
                        <Link
                          to={`${course.id}`}
                          state={course}
                          key={course.id}
                        >
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            size="xl"
                            className="text-blue-500"
                          />
                        </Link>
                      </button>
                      {user?.role == "admin" && (
                        <Link to={"editar-curso"}>
                          <button className="mr-2">
                            <FontAwesomeIcon
                              icon={faPencil}
                              size="xl"
                              className="text-green-400"
                            />
                          </button>
                        </Link>
                      )}
                      <button onClick={() => deleteCourse(course.id)}>
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
