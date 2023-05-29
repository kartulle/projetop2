import {useEffect, useState} from "react";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {
  faCircleInfo,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {usersApi} from "../services/api/users";
import {Link} from "react-router-dom";

export interface User {
  id: string;
  name: string;
  username: string;
  role: string;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const user = {role: "admin"};

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const res = await usersApi.index();
    setUsers(res.data);
  }

  async function deleteUser(userId: string) {
    setUsers(users.filter((user) => user.id != userId));
    await usersApi.delete(userId);
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 min-h-screen h-full">
        <Sidebar activeSidebarItem="Usuários" />
      </div>
      <div className="py-16 col-span-10">
        <h1 className="text-2xl font-medium uppercase text-center mb-4">
          Usuários
        </h1>
        <p className="text-lg text-center mb-8">
          Gerencie os usuários e suas informações.
        </p>
        <div className="flex justify-center mt-4">
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
                    to={"novo-usuario"}
                    className="block w-24 h-10 py-2 text-center bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-lg"
                    >
                    Novo
                  </Link>
                </div>
              )}
          </div>
        </div>
        <div className="m-20">
          <table className="table-auto mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Cargo</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    <button className="mr-2">
                      <Link to="/usuarios/editar-usuario" className="btn">
                        <FontAwesomeIcon
                          icon={faPencil}
                          size="xl"
                          className="text-green-400"
                        />
                      </Link>
                    </button>
                    <button onClick={() => deleteUser(user.id)}>
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
