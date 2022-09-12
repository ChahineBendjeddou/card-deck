import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Deck.css";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [remaining, setRemaining] = useState(52);

  async function getDeckData() {
    const { data } = await axios.get(`${API_BASE_URL}/new/shuffle`);
    setDeck(data);
  }

  useEffect(() => {
    getDeckData();
  }, []);

  async function getCard(e) {
    const CARD_API_URL = `${API_BASE_URL}/${deck.deck_id}/draw`;
    try {
      const { data } = await axios.get(CARD_API_URL);
      if (!data.success) throw new Error("No cards remaining");
      const card = data.cards[0];
      setRemaining((old) => old - 1);
      setCards((oldCards) => [
        ...oldCards,
        {
          id: card.code,
          name: `${card.value} of ${card.suit}`,
          image: card.image,
        },
      ]);
    } catch (error) {
      alert(error);
    }
  }

  function resetDeck(e) {
    setCards([]);
    getDeckData();
    setRemaining(52);
  }

  return (
    <div className="deck">
      <h1 className="deck-title">Card Dealer</h1>
      <h2 className="deck-title subtitle">A title demo made with react</h2>
      <h3 className="deck-title">Cards in deck : {remaining}</h3>
      <button
        className={`deck-btn ${remaining ? "enable" : "disable"}`}
        onClick={getCard}
        disabled={!remaining && true}
      >
        get card
      </button>
      <button
        className={`deck-btn enable ${remaining === 52 && "disable"}`}
        onClick={remaining < 52 && resetDeck}
      >
        Reset
      </button>
      <div className="deck-cards">
        {cards.map((c) => (
          <Card src={c.image} alt={c.name} key={c.id} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
