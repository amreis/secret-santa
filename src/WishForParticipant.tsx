import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GOOGLE_SCRIPT_URL } from "./data";

export default function WishForParticipant() {
  const { participantId } = useParams();
  const [whoYouGotName, setWhoYouGotName] = useState("...");
  const [whoYouGotWish, setWhoYouGotWish] = useState("...");

  useEffect(() => {
    const url = new URL(GOOGLE_SCRIPT_URL);
    url.searchParams.set("uid", participantId!);

    const fetchData = async () => {
      const resp = await fetch(url);
      const asJson = await resp.json();

      setWhoYouGotName(asJson.name);
      setWhoYouGotWish(asJson.wish);
    };

    fetchData().catch(console.log);
  }, [participantId]);

  return (
    <div>
      <p>Você tirou: {whoYouGotName}</p>
      <div><p>Essa pessoa pediu: <br />{whoYouGotWish}</p></div>
    </div>
  );
}
