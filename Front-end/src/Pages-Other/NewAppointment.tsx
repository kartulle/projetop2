import {Sidebar} from "../components/Sidebar/Sidebar";
import * as Separator from "@radix-ui/react-separator";
import {Link} from "react-router-dom";
import {useAppointment} from "../contexts/appointment";
import {appointmentApi} from "../services/api/appointment";

export function NewAppointment() {
  const {
    professional,
    services,
    removeService,
    removeProfessional,
    resetAppointment,
  } = useAppointment();

  async function handleSubmit() {
    if (!professional || services.length == 0) {
      alert("Você deve selecionar no mínimo 1 profissional e 1 serviço.");
      return;
    }

    const res = await appointmentApi.create({
      professionalId: professional.id,
      servicesIds: services.map((service) => service.id),
    });

    if (res.status !== 201) {
      alert("Houve um erro na criação do atendimento! Tente novamente.");
      return;
    }

    alert(
      "Atendimento criado com sucesso. Aguarde o chamado de um dos nossos atendentes."
    );
    resetAppointment();
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 min-h-screen h-full">
        <Sidebar activeSidebarItem="Novo Atendimento" />
      </div>
      <div className="py-16 col-span-10">
        <h1 className="text-2xl font-medium uppercase text-center mb-4">
          Novo Atendimento
        </h1>
        <p className="text-lg text-center mb-8">
          Confira as informações do seu novo atendimento. Após submissão um
          funcionário irá entrar em contato para que possemos iniciar.
        </p>
        <div className="m-20">
          <section>
            <div className="flex items-center gap-5">
              <h2 className="text-2xl">Profissional</h2>
              <Link
                to="/profissionais"
                className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full text-xl w-10 h-10"
              >
                +
              </Link>
            </div>
            {professional == null && (
              <span className="text-lg">
                Selecione um profissional clicando no "+"
              </span>
            )}
            <div className="flex justify-start items-center min-h-32 my-5">
              {professional && (
                <div
                  className="relative mr-10 text-center"
                  key={professional.id}
                >
                  <img
                    src={
                      professional.imageUrl
                        ? professional.imageUrl
                        : "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    }
                    className="w-40 h-w-40 rounded"
                    alt={professional.name}
                  />
                  <span className="text-lg">{professional.name}</span>
                  <button
                    className="absolute top-0 right-0 p-2 text-white bg-red-500 hover:bg-red-600"
                    onClick={() => removeProfessional()}
                  >
                    x
                  </button>
                </div>
              )}
            </div>
          </section>
          <Separator.Root className="h-[1px] w-full bg-slate-400 my-8" />
          <section>
            <div className="flex items-center gap-5">
              <h2 className="text-2xl">Serviços</h2>
              <Link
                to="/services"
                className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full text-xl w-10 h-10"
              >
                +
              </Link>
            </div>
            {services.length === 0 && (
              <span className="text-lg">Adicione serviços clicando no "+"</span>
            )}
            <div className="flex justify-start items-center min-h-32 my-5">
              {services.map((service) => (
                <div className="relative mr-10 text-center" key={service.id}>
                  <img
                    src={
                      service.imageUrl
                        ? service.imageUrl
                        : "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    }
                    className="w-40 h-w-40 rounded"
                    alt={service.name}
                  />
                  <span className="text-lg">{service.name}</span>
                  <button
                    className="absolute top-0 right-0 p-2 text-white bg-red-500 hover:bg-red-600"
                    onClick={() => removeService(service.id)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </section>
          <Separator.Root className="h-[1px] w-full bg-slate-400 my-8" />
          <div className="flex justify-center gap-2 grid-cols-2">
            <button
              onClick={handleSubmit}
              className="block h-10 p-2 text-center bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-lg"
            >
              Submeter Atendimento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
