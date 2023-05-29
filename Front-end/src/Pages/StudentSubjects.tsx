import {useEffect, useState} from "react";
// import {Sidebar} from "../components/Sidebar/Sidebar";
import {
  faCircleInfo,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function StudentSubjects() {
  return (
    <div className="grid">
      {/* <div className="col-span-2 min-h-screen h-full">
        <Sidebar activeSidebarItem="Disciplinas" />
      </div> */}
        <div className="p-2">
          <Link to="/" className="btn">Sair</Link>
        </div>
      <div className="py-16 col-span-10">
        <h1 className="text-2xl font-medium uppercase text-center mb-4">
          Aconselhamento de Matrícula
        </h1>
        <p className="text-lg text-center mb-1"><b>Agora você deve marcar as disciplinas que ja foram cursadas.</b><br></br> Posteriormente, você deve selecionar as disciplinas do curso que já foram cursadas.<br></br> Por fim, você será aconselhado!</p>
        <div className="my-5 mx-20 flex flex-col gap-2">
            <div>
              <table className="table-fixed">
                <thead>
                  <tr>
                    <th className="w-1/2 px-4 py-2">Disciplinas</th>
                    <th className="w-1/2 px-4 py-2">Código</th>
                    <th className="w-1/4 px-4 py-2">Período</th>
                    <th className="w-1/4 px-4 py-2">Disciplina Cursada</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">P1</td>
                    <td className="border px-4 py-2">CC001</td>
                    <td className="border px-4 py-2">1</td>
                    <td className="border px-4 py-2">
                      <div className="flex">
                        <div className="flex items-center h-5">
                            <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        </div>
                    </div>
                  </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">P2</td>
                    <td className="border px-4 py-2">CC002</td>
                    <td className="border px-4 py-2">2</td>
                    <td className="border px-4 py-2">
                      <div className="flex">
                        <div className="flex items-center h-5">
                            <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        </div>
                    </div>
                  </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-2">
              <Link to="/alunoAconselhamento"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Enviar
              </button></Link>
            </div>

            

        </div>
      </div>
    </div>
  );
}
