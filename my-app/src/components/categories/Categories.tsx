import "./Categories.css";
import { useEffect } from "react";
import { getCategories, setSelectedCategory } from "../../redux/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../redux/store';

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.items);

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const handleCategory = (category: string) => {
    dispatch(setSelectedCategory(category))
  }

  return (
    <>
      <select className="Category" name="category"
        onChange={(e) => handleCategory(e.target.value)}>
        <option>All</option>
        {categories.map((category: string, idx: number) => {
          return <option value={category} className="Category"
            key={idx}>
            {category}</option>
        })}
      </select>
    </>
  )
}

export default Categories;