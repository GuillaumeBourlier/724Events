import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

const byDateDesc = data?.focus
  ? [...data.focus].sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)) // tri par date décroissante le tableau
  : [];

  useEffect(() => { // Utilsation de useEffect pour faire défiler les événements toutes les 5 secondes
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 5000);
        return () => clearInterval(interval);
  }, [byDateDesc]);

  return (
    <div className="SlideCardList"> 
      {byDateDesc?.map((event, idx) => (
          <div key={event.id || idx} // Ajout d'une clé unique
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          )
          )}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((event, radioIdx) => (
                <input
                  key={`${event.id ||`radio-${radioIdx}`}`} // Ajout d'une clé unique
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)} // Ajout de la fonction onChange pour changer l'index des radios (bouton radio pour le slider)
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

