import {useEffect, useState} from "react";
// import {Sidebar} from "../components/Sidebar/Sidebar";
import {
  faCircleInfo,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function Student() {
  return (
    <div className="grid">
      {/* <div className="col-span-2 min-h-screen h-full">
      <div className="py-16 col-span-10">
      <Sidebar activeSidebarItem="Disciplinas" />
    </div> */}
        <div className="p-2">
            <Link to="/" className="btn">Sair</Link>
        </div>
        
        <h1 className="text-2xl font-medium uppercase text-center mb-4">
          Aconselhamento de Matrícula
        </h1>
        <p className="text-lg text-center mb-8">Bem vindo!<br></br><b>Para que consigamos aconselha-lo, você deve nos informar o período do curso e qual o seu curso.</b><br></br> Posteriormente, você deve selecionar as disciplinas do curso que já foram cursadas.<br></br> Por fim, você será aconselhado!</p>
        <div className="m-20 flex flex-col gap-2">
            <div>
                <input type="number" id="period" className="border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Em que período você está?" required/>
            </div>
            <select data-te-select-init className="border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="1">Curso 1</option>
              <option value="2">Curso 2</option>
              <option value="3">Curso 3</option>
              <option value="4">Curso 4</option>
              <option value="5">Curso 5</option>
            </select>
            <div className="flex justify-center">
              
              <Link to="/alunoDisciplinas"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Escolher Curso</button></Link>
               
            </div>

        </div>
      </div>
  );
}
