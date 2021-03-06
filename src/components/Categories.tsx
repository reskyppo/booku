import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryCard } from "./CategoryCard";

export const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/fee-assessment-categories").then((response) => {
      setCategories(response?.data);
    });
  }, []);
  return (
    <>
      <div className="container mx-auto my-4 px-2">
        <h2 className="text-2xl m-2 font-semibold">Explore Categories</h2>
        <div className="my-4 grid grid-cols-2 md:flex justify-between items-center">
          <p
            className="cursor-pointer m-2 md:mr-2 w-fit border border-gray-400 rounded-md p-2"
            onClick={() => navigate(`/favorite`)}
          >
            My Favorite
          </p>
          {categories.length > 0 &&
            categories?.map((category) => (
              <p
                onClick={() => navigate(`${category.name}/${category.id}`)}
                className="m-2 md:mr-2 w-fit border border-gray-400 rounded-md p-2 cursor-pointer"
              >
                {category.name}
              </p>
            ))}
        </div>
      </div>
      {categories.length > 0 &&
        categories?.map((category, idx) => (
          <CategoryCard
            index={idx + 1}
            category={category.name}
            categoryId={category.id}
          />
        ))}
    </>
  );
};
