import "./Card.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Item } from '../../models/models';

const Card = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Item | null>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/' + id)
      .then(res => res.json())
      .then(json => setProduct(json))
  }, [id])

  return <div className="Card-container">
    <h2 className="Product-title">{product?.title}</h2>
    <img width='200px' src={product?.image} alt={product?.title} />
    <div className="Product-description">{product?.description}</div>
    <div className="Product-price">{product?.price} $</div>
  </div>
}

export default Card;