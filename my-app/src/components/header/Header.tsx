import "./Header.css";
import {
  Link, useNavigate
} from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue, getProductFromCategories } from "../../redux/slices/productsSlice";
import { loadLocalStorageItems } from "../../redux/slices/basketSlice";
import { AppDispatch, RootState } from '../../redux/store';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const totalCount = useSelector((state: RootState) => state.shopBasket.totalCount);
  const category = useSelector((state: RootState) => state.categories.selectedCategory);

  useEffect(() => {
    dispatch(loadLocalStorageItems())
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      dispatch(getProductFromCategories(category!))
    }
    else { dispatch(setSearchValue(e.target.value)) }
  }

  return (
    <div className="Header">
      <div className="Main-section">
        <button onClick={() => { navigate("/") }} className="Main-btn">Main</button>
        <div>
          <input placeholder="Search"
            onChange={handleChange}
            className="Input-search" />
        </div>
        <h2 className="Header-main-text">Online Shop</h2>
      </div>
      <div className="Cart-section">
        <Link to="/basket" className="Basket"><span className="Cart-link">Cart: {totalCount}</span></Link>
      </div>
    </div>
  )
}

export default Header;