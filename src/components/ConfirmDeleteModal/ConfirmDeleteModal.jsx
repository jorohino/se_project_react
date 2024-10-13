import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ closeActiveModal, isOpen, onDeleteItem, card }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal-delete__content">
        <div className="modal-delete__content-wrapper">
          <button
            onClick={closeActiveModal}
            className="modal__close"
            type="button"
          />
          <h2 className="modal-delete__header">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </h2>
          <button
            className="modal__delete-confirm"
            onClick={() => onDeleteItem(card._id)}
          >
            Yes, delete item.
          </button>
          <button className="modal__delete-cancel" onClick={closeActiveModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
