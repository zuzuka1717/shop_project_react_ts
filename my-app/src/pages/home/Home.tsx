import { useEffect } from "react";
import "./Home.css";
import Product from "../../components/products/Product";
import Categories from "../../components/categories/Categories";
import { getProductFromCategories } from "../../redux/slices/productsSlice";
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.items.items);
  const category = useSelector((state: RootState) => state.categories.selectedCategory);

  useEffect(() => {
    dispatch(getProductFromCategories(category!))
  }, [category, dispatch]);

  const productsData = products?.map((product) =>
    <Product props={product} key={product.id} />
  );

  if (products?.length === 0) {
    return <div>No products</div>
  }

  return (
    <>
      <Categories />
      <div className="Products-container">{productsData}</div>
    </>
  )
}

export default Home;