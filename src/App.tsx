import { useEffect, useState } from "react";
import { ActionFunctionArgs, Form, redirectDocument } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./App.css";
import { GOOGLE_SCRIPT_URL } from "./data";

import teteu from "./assets/mc-teteu-dingo-bell.mp3";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return;
  }

  const formSubmitBtn = document.getElementById("submit-button")! as HTMLButtonElement;
  formSubmitBtn.disabled = true;

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
      formSubmitBtn.disabled = false;
      await new Promise((r) => setTimeout(r, 3500));
      return redirectDocument(import.meta.env.BASE_URL);
    },
    () => alert("Algo deu errado, chama o Álister <3")
  );
}

function App() {

  const [name, setName] = useState("");
  const [wish, setWish] = useState("");

  const [easterEggCount, setEasterEggCount] = useState(0);
  const incEasterEgg = () => {
    setEasterEggCount(easterEggCount + 1);
  };

  useEffect(() => {
    if (easterEggCount < 3) return;
    const audio = new Audio(teteu);
    audio.play();
    setEasterEggCount(0);
  }, [easterEggCount]);

  return (
    <>
      <h1>Natal da Guerreirada &mdash; Amigo Secreto 🎅</h1>
      <br />
      <div className="introContainer">
        <p>
          E aí, família! Hora de decidir o que cada um quer ganhar de Amigo Secreto no Natal 🎄🎁
          <span onClick={incEasterEgg}>😎</span> <br />
          <br />
          Preencham o nome, o presente que vocês querem, e cliquem no &quot;Manda ver!&quot; ali
          embaixo. Pode demorar um pouquinho pra página atualizar, mas confia que vai dar bom. Beijo
          em todos vocês!
        </p>
      </div>
      <div className="container">
        <Form className="wishForm" method="post" action="/">
          <label htmlFor="name">Seu nome ou Apelido: </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Insira seu nome..."
            name="name"
            onChange={(e) => setName(e.target.value)}
            autoComplete="given-name"
            value={name}
          />
          <label htmlFor="wish">O que você quer ganhar de Natal?</label>
          <textarea
            id="wish"
            name="wish"
            className="wishTextArea"
            placeholder="Exemplo: Sabonetes, o presente favorito da tia Márcia"
            required
            onChange={(e) => setWish(e.target.value)}
            value={wish}
            autoComplete="off"
          />
          <button
            id="submit-button"
            type="submit"
            style={{ gridColumnStart: 1, gridColumnEnd: 3, alignSelf: "center" }}
          >
            Manda ver!
          </button>
          <ToastContainer autoClose={3000} />
        </Form>
        <aside style={{ float: "right" }}>
          <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_2t2rH_wp0n-KgV5yDK94VcDztYe3I9sbE3rdm0te9cJHlgTAiLrll2qA2Uq0wSuYxBUFxKildXL9/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false&amp;range=A1:B&amp;chrome=false"></iframe>
        </aside>
      </div>
    </>
  );
}

export default App;
