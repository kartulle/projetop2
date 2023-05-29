import {useEffect, useState} from "react";
// import {Sidebar} from "../components/Sidebar/Sidebar";
import {
  faCircleInfo,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function StudentCounseling() {
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
        <p className="text-lg text-center mb-8"><b>Aconselhamento gerado com Sucesso!</b><br></br>Aqui está o seu aconselhamento de matrícula:</p>
        <div className="m-20 flex flex-col gap-2">
              <table className="table-fixed">
                <thead>
                  <tr>
                    <th className="w-1/2 px-4 py-2">Disciplina</th>
                    <th className="w-1/2 px-4 py-2">Código</th>
                    <th className="w-1/4 px-4 py-2">Período</th>
                    <th className="w-1/2 px-4 py-2">Horário</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">P1</td>
                    <td className="border px-4 py-2">CC001</td>
                    <td className="border px-4 py-2">1</td>
                    <td className="border px-4 py-2">
                      <label htmlFor="helper-checkbox" className="font-medium">Terça & Quinta</label>
                      <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-500">13:30 ~ 15:20</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">P2</td>
                    <td className="border px-4 py-2">CC002</td>
                    <td className="border px-4 py-2">2</td>
                    <td className="border px-4 py-2">
                      <label htmlFor="helper-checkbox" className="font-medium">Segunda & Quarta</label>
                      <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-500">13:30 ~ 15:20</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            <div className="flex justify-center">
            <Link to="/aluno" className="btn"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Gerar Outro Aconselhamento
              </button></Link>
            </div>
        </div>
      </div>
    </div>
  );
}
