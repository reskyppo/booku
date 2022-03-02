import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  index: number;
  category: string;
  categoryId: number;
};

const CategoryCard = ({ index, category, categoryId }: Props) => {
  const [books, setBooks] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/fee-assessment-books?size=5&categoryId=${categoryId}`)
      .then((response) => {
        setBooks(response?.data);
      });
  }, [categoryId]);
  return (
    <div className={`${index % 2 !== 0 ? "bg-white" : "bg-[#FFE299]"}`}>
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl my-2 font-semibold">{category}</h3>
          <p
            onClick={() => navigate(`${categoryId}`)}
            className="cursor-pointer text-lg my-2 font-semibold"
          >
            See All
          </p>
        </div>
        <div className="flex justify-around items-center">
          {books.length > 0 &&
            books?.map((book) => (
              <div
                className="cursor-pointer truncate mr-1"
                onClick={() => navigate(`${book.category_id}/${book.id}/0`)}
              >
                <img className="w-3/4" src={book.cover_url} alt={book.title} />
                {book.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
