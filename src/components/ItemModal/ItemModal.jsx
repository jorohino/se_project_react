import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <img src={card.imageUrl} alt="card.name" className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            className="modal__delete"
            type="button"
            onClick={onDeleteItem}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
