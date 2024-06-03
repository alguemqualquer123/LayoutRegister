import { useEffect } from "react";
import { Container } from "./components/Container";
import { TNuiMessage } from "./types/TNuiMessage";
import { useNavigate, Routes, Route } from "react-router-dom";

export default function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const eventListener = ({ data }: { data: TNuiMessage }) => {
      if (data["action"] === "showUi") navigate("/ui")
    };
    window.addEventListener("message", eventListener);
    return () => {
      window.removeEventListener("message", eventListener);
    };
  }, []);
  return <Routes>
    <Route path="/" element={<Container />}/>
    {/* <Route path="/ui" element={<Menu/>}/> */}
  </Routes>;
}