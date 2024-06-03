import { useState } from "react";

export const Container = () => {
  // const navigate = useNavigate()
  const [clientName, setclientName] = useState("");
  const [clientDate, setclientDate] = useState("");
  const [clientIdentity, setclientIdentity] = useState("");
  const [clientRoom, setclientRoom] = useState("");
  const [clientValue, setclientValue] = useState("");
  const [Status, setStatus] = useState("");
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
        console.log(type, text);
        setclientName(text);
        break;
      case "Value":
        console.log(type, parseInt(text));
        setclientValue(text);
        break;
      case "NumberRoom":
        console.log(type, text);
        setclientRoom(text);
        break;
      case "Identity":
        const cleanedText = text.replace(/\D/g, "");
        if (isCPF(cleanedText)) {
          const formattedCPF = formatCPF(cleanedText);
          console.log(type, formattedCPF);
          setclientIdentity(formattedCPF);
        } else if (isRG(cleanedText)) {
          const formattedRG = formatRG(cleanedText);
          console.log(type, formattedRG);
          setclientIdentity(formattedRG);
        } else {
          console.log(type, text);
          setclientIdentity(text);
        }
        break;
      case "Date":
        console.log(type, text);
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
        <h1>{Status}</h1>
        <button className="mt-8 font-semibold bg-[rgba(0,0,0,0.5)] p-4 rounded-lg hover:bg-[rgba(0,0,0,1)] hover:text-red-900 text-white durarion-1000 transition-all ">
          Submit Query
        </button>
      </form>
    </main>
  );
};
