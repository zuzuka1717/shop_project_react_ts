import "./Product.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { addProductToBasket, removeProductFromBasket } from "../../redux/slices/basketSlice"
import { Item } from '../../models/models';

const Product = ({ props }: { props: Item }) => {
  const [productCount, setProductCount] = useState<number>(0);
  const { title, id, price, image } = props;
  const dispatch = useDispatch();
  const basketProducts = useSelector((state: RootState) => state.shopBasket.localStorageItems);

  useEffect(() => {
    const findProductFromBasket = basketProducts.find((it: Item) => it.id === id);
    if (findProductFromBasket) {
      setProductCount(findProductFromBasket.count);
    }
  }, [basketProducts, id]);

  useEffect(() => {
    const data = {
      id: id,
      title: title,
      price: price,
      count: productCount,
      image: image
    }
    if (productCount > 0) {
      dispatch(addProductToBasket(data));
    }
  }, [productCount]);

  const addToBasket = () => {
    setProductCount(productCount + 1);
  };

  const removeFromBasket = () => {
    if (productCount > 0) {
      setProductCount(productCount - 1);
      dispatch(removeProductFromBasket(id))
    }
    dispatch(removeProductFromBasket(id))
  }

  return (
    <div className="Product-item">
      <Link className="Product-title" to={`/card/${id}`}>{title}</Link>
      <h3>{productCount > 0 ? (price * productCount).toFixed(2) : price} $</h3>
      <img className="Product-image" src={image} alt={title} />
      <div className="Add-product">

        <button
          className="Btn-small"
          onClick={addToBasket}
        >+</button>

        <button
          className="Btn-small"
          onClick={removeFromBasket}
        >-</button>
      </div>
      <div className="Count">Count: {productCount}</div>
    </div>
  )
};

export default Product;