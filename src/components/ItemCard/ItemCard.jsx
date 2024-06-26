import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <div className="item-card__name-frame">
        <h2 className="item-card__name">{item.name}</h2>
      </div>
      <img
        onClick={handleCardClick}
        src={item.link}
        alt={item.name}
        className="item-card__image"
      />
    </li>
  );
}

export default ItemCard;
