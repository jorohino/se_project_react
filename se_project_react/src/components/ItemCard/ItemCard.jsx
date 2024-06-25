import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <li className="item-card">
      <div className="item-card__name-frame">
        <h2 className="item-card__name">{item.name}</h2>
      </div>
      <img src={item.link} alt={item.name} className="item-card__image" />
    </li>
  );
}

export default ItemCard;
