import PropTypes from "prop-types";
import "./style.scss";

const ModalEvent = ({ event }) => {
  const date = event.date ? new Date(event.date) : null;
  const formattedDate = date
    ? date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : event.periode || "Date inconnue";

  return (
    <div className="ModalEvent">
      <div className="ModalEvent__imageContainer">
        <img
          data-testid="card-image-testid"
          src={event.cover}
          alt={event.title}
        />
      </div>
      <div className="ModalEvent__title">
        <div className="ModalEvent__titleLabel">{event.title}</div>
        <div className="ModalEvent__titlePeriode">{formattedDate}</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
        <h3>Description</h3>
        <div>{event.description}</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
        <h3>Participants</h3>
        <div>{event.nb_guesses} participants</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
        <h3>Prestations</h3>
        {event.prestations.map((presta) => (
          <div key={presta}>{presta}</div>
        ))}
      </div>
    </div>
  );
};

ModalEvent.propTypes = {
  event: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    periode: PropTypes.string,
    description: PropTypes.string.isRequired,
    nb_guesses: PropTypes.number.isRequired,
    prestations: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ModalEvent;
