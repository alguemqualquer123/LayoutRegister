import { useState } from "react";
import { api } from "@app/Config";

export const Container = () => {
  // const navigate = useNavigate()
  const [Error, setError] = useState("");
  const [clientName, setclientName] = useState("");
  const [clientDate, setclientDate] = useState("");
  const [clientIdentity, setclientIdentity] = useState("");
  const [clientRoom, setclientRoom] = useState("");
  const [clientValue, setclientValue] = useState("");
  const [Status, setStatus] = useState(false);
  const formatCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length <= 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return cpf;
  };

  const formatRG = (rg: string) => {
    rg = rg.replace(/\D/g, "");
    if (rg.length <= 9) {
      return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
    }
    return rg;
  };

  const isCPF = (text: string | any[]) => {
    return text.length === 11;
  };

  const isRG = (text: string | any[]) => {
    return text.length === 9;
  };

  const FilterType = (type: string, text: any) => {
    switch (type) {
      case "Name":
        setclientName(text);
        break;
      case "Value":
        setclientValue(text);
        break;
      case "NumberRoom":
        setclientRoom(text);
        break;
      case "Identity":
        const cleanedText = text.replace(/\D/g, "");
        if (isCPF(cleanedText)) {
          const formattedCPF = formatCPF(cleanedText);
          setclientIdentity(formattedCPF);
        } else if (isRG(cleanedText)) {
          const formattedRG = formatRG(cleanedText);
          setclientIdentity(formattedRG);
        } else {
          setclientIdentity(text);
        }
        break;
      case "Date":
        setclientDate(text);
        break;
      default:
    }
  };

  const formatToBRL = (value: string) => {
    const number = parseInt(value.replace(/\D/g, ""), 10);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(number / 100);
  };

  const CurrentError = (text: string) => {
    setError(text);
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  const Subimit = () => {
    if (
      clientName.length == 0 ||
      clientDate.length == 0 ||
      clientIdentity.length == 0 ||
      clientRoom.length == 0 ||
      clientValue.length == 0
    ) {
      CurrentError("Preencha os parametros corretamente !!!");
      return;
    }

    setStatus(true);
    api
      .post("newClient", {
        name: clientName,
        date: clientDate,
        identity: clientIdentity,
        room: clientRoom,
        value: clientValue,
      })
      .then((resulte) => {
        CurrentError("Usuario Registrado 👍");
        console.log(resulte);
      })
      .catch((error) => {
        switch (error.response.status) {
          case "403":
            CurrentError("Cliente Já Registrado 💢");
            break;
          case "400":
            setError("Erro Na Requisição 💥");
            break;
          default:
        }
        console.error(error);
      })
      .finally(() => {
        setTimeout(() => {
          setStatus(false);
        }, 2000);
      });
  };

  return (
    <main className="flex flex-col justify-center items-center w-[100vw] h-[100vh] rounded gap-20">
      <div className="w-[50%] bg-[rgba(0,0,0,0.5)] p-2 rounded-lg flex justify-center items-center text-white">
        <h1 className="font-Outfit font-semibold">Cadastro de Funcionário</h1>
      </div>
      <form
        action=""
        id="form-div"
        className="bg-[rgba(0,0,0,0.5)] p-20 rounded-lg"
      >
        <h1 className="font-bold">Formulario</h1>
        <div id="div-input">
          <label htmlFor="">Nome Do Cliente:</label>
          <input
            type="text"
            placeholder="Nome"
            value={clientName}
            onChange={(e: any) => {
              FilterType("Name", e.target.value);
            }}
          />
        </div>
        <div id="div-input">
          <label htmlFor="">Data de nascimento:</label>
          <input
            type="date"
            placeholder=""
            value={clientDate}
            onChange={(e: any) => {
              FilterType("Date", e.target.value);
            }}
          />
        </div>
        <div id="div-input">
          <label htmlFor="">RG ou CPF:</label>
          <input
            value={clientIdentity}
            type="text"
            placeholder="Identificação "
            onChange={(e: any) => {
              FilterType("Identity", e.target.value);
            }}
          />
        </div>
        <div id="div-input">
          <label htmlFor="">Número do quarto:</label>
          <input
            type="text"
            placeholder="0º"
            value={`${clientRoom}`}
            onChange={(e: any) => {
              let value = e.target.value;
              value = value.replace(/\D/g, "");
              FilterType("NumberRoom", value);
            }}
          />
        </div>
        <div id="div-input">
          <label htmlFor="">Valor:</label>
          <input
            type="text"
            placeholder="$1,000,000.00"
            value={clientValue}
            onChange={(e: any) => {
              let Nvalue = e.target.value;
              Nvalue = Nvalue.replace(/\D/g, "");

              const formattedValue = formatToBRL(Nvalue);
              if (Nvalue == undefined || Nvalue == null) {
                Nvalue = 0;
              }
              FilterType("Value", formattedValue);
            }}
          />
        </div>
        {Status && <div className="loader"></div>}
        <h1 className="text-red-900">{Error}</h1>
        <button
          className="mt-8 font-semibold text-[10px] bg-[rgba(0,0,0,0.5)] p-4 rounded-lg hover:bg-[rgba(0,0,0,1)] hover:text-red-900 text-white durarion-1000 transition-all "
          onClick={Subimit}
          type="button"
        >
          Registrar Cliente
        </button>
      </form>
    </main>
  );
};
