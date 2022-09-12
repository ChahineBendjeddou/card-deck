import { useEffect, useState } from "react";
import "./Card.css";
const Card = ({ src, alt }) => {
  const [transform, setTransform] = useState("");
  useEffect(() => {
    const angle = Math.random() * 45;
    const xPos = Math.random() * 20;
    const yPos = Math.random() * 20;
    setTransform(`translate(${xPos}px, ${yPos}px) rotate(${angle}deg`);
  }, []);
  return <img style={{ transform }} className="card" src={src} alt={alt} />;
};

export default Card;
