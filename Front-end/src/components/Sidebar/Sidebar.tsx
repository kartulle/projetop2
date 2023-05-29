import {useAuth} from "../../contexts/auth";
import * as Avatar from "@radix-ui/react-avatar";
import {SidebarItem} from "./components/SidebarItem";
import {useState} from "react";
import { Link } from "react-router-dom";

interface Props {
  onTabClick?: (tabTitle: string) => void;
  activeSidebarItem: string;
}

export function Sidebar({onTabClick, activeSidebarItem}: Props) {
  // const {user, logout} = useAuth();
  const user = {
    role: "admin",
    name: "Juquinha dos Santos",
  };
  const defaultSidebarItem =
    user!.role == "admin" ? "Atendimentos" : "Novo Atendimento";
  const [activeTab, setActiveTab] = useState(
    activeSidebarItem ? activeSidebarItem : defaultSidebarItem
  );

  function handleActiveTabChange(tabTitle: string) {
    setActiveTab(tabTitle);
  }

  return (
    <div className="fixed h-screen w-64 bg-slate-200 text-center">
      <div className="py-6">
        <div className="mt-4 mb-8">
          <Avatar.Root className="flex justify-center">
            <Avatar.Image
              src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.name}`}
              className="rounded-full my-2"
            />
            <Avatar.Fallback />
          </Avatar.Root>

          <h1 className="text-lg font-medium">{user?.name}</h1>
          <button className="text-base"><Link to="/" className="btn">Sair</Link></button>
        </div>
        <nav className="mt-4">
          {user.role == "admin" ? (
            <>
              <SidebarItem
                href="/cursos"
                title="Cursos"
                active={activeTab === "Cursos"}
                onClick={() => handleActiveTabChange("Cursos")}
              />
              {/* <SidebarItem
                href="/disciplinas"
                title="Disciplinas"
                active={activeTab === "Disciplinas"}
                onClick={() => handleActiveTabChange("Disciplinas")}
              /> */}
              <SidebarItem
                href="/usuarios"
                title="Usuários"
                active={activeTab === "Usuários"}
                onClick={() => handleActiveTabChange("Usuários")}
              />
              {/* <SidebarItem href="#" title="Clientes" active={activeTab === "Clientes"} onClick={() => handleActiveTabChange("Clientes")} /> */}
            </>
          ) : (
            <>
              <SidebarItem
                href="/novo-atendimento"
                title="Novo Atendimento"
                active={activeTab === "Novo Atendimento"}
                onClick={() => {
                  handleActiveTabChange("Novo Atendimento");
                }}
              />
              <SidebarItem
                href="/meus-atendimentos"
                title="Meus Atendimentos"
                active={activeTab === "Meus Atendimentos"}
                onClick={() => handleActiveTabChange("Meus Atendimentos")}
              />
              <SidebarItem
                href="/services"
                title="Serviços"
                active={activeTab === "Serviços"}
                onClick={() => handleActiveTabChange("Serviços")}
              />
              <SidebarItem
                href="/profissionais"
                title="Profissionais"
                active={activeTab === "Profissionais"}
                onClick={() => handleActiveTabChange("Profissionais")}
              />
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
