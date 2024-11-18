import "./Basket.css";
import "../../components/products/Product.css";
import Product from "../../components/products/Product";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from '../../redux/store';
import { loadLocalStorageItems } from "../../redux/slices/basketSlice"

const Basket = () => {
  const basketProducts = useSelector((state: RootState) => state.shopBasket.localStorageItems);
  const totalSum = useSelector((state: RootState) => state.shopBasket.totalSum);
  const totalCount = useSelector((state: RootState) => state.shopBasket.totalCount);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadLocalStorageItems())
  }, []);

  useEffect(() => {
    basketProducts.filter(product => product.count > 0);
  }, [basketProducts]);

  const basketItem = basketProducts.map((product) =>
   <Product props={product} key={product.id} />
  );

  return (
    <div className="Basket-wrapper">
      <div className="Products-container">
        {basketItem}
      </div>
      {totalCount ?
        (<div className="Total-section">
          <span>Total: {totalCount} products</span>
          <div>{totalSum}$</div>
        </div>) : (<div className="Total-section">No items</div>)
      }
    </div>
  )
}

export default Basket;