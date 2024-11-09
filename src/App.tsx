import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GOOGLE_SCRIPT_URL } from "./data";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useLocation,
  useSubmit,
  redirectDocument,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return;
  }

  const formData = await request.formData();

  const name = formData.get("name");
  const wish = formData.get("wish");

  return await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ name, wish }),
    mode: "no-cors",
  }).then(
    async () => {
      toast("Feito! Agora é só esperar o presente! 😎");

      await new Promise((r) => setTimeout(r, 3500));
      return redirectDocument("/");
    },
    () => alert("Algo deu errado, chama o Álister <3")
  );
}

function App() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [submitting, setSubmitting] = useState(false);

  let { submitted } = useLocation();

  useEffect(() => {
    if (submitted) {
      setName("");
      setWish("");
    }
  }, [submitted]);

  const submit = useSubmit();
  const sendToSpreadsheet = () => {};

  return (
    <Form
      className="wishForm"
      method="post"
      action="/"
      state={{ submitted: true }}
    >
      <label htmlFor="name">Seu nome ou Apelido: </label>
      <input
        type="text"
        required
        placeholder="Insira seu nome..."
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label htmlFor="wish">O que você quer ganhar de Natal?</label>
      <textarea
        name="wish"
        className="wishTextArea"
        placeholder="Exemplo: Sabonetes, o presente favorito da tia Márcia"
        required
        onChange={(e) => setWish(e.target.value)}
        value={wish}
      />
      <button
        type="submit"
        style={{ gridColumnStart: 1, gridColumnEnd: 3, alignSelf: "center" }}
        className={submitting ? ":disabled" : ""}
      >
        Manda ver!
      </button>
      <ToastContainer autoClose={3000} />
    </Form>
  );
}

export default App;
