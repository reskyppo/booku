import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IBook {
  id: number;
  title: string;
  category_id: number;
  sections: Array<{ title: string; content: string }>;
  description: string;
  cover_url: string;
  authors: Array<string>;
  audio_length: number;
}

const Book = () => {
  const [book, setBook] = useState<IBook>();

  let { category, id, page } = useParams();

  useEffect(() => {
    axios
      .get(`/fee-assessment-books?page=${page}&categoryId=${category}&size=15`)
      .then((response) => {
        console.log(response);
        const book = response?.data?.filter(
          (book: { id: number }) => book.id === parseInt(id || "")
        );
        setBook(book[0]);
      });
  }, []);
  return (
    <div>
      <img src={book?.cover_url} alt={book?.title} />
      <p>{book?.title}</p>
      {book?.authors?.map((author) => (
        <p>{author}</p>
      ))}
      {book?.sections?.map((section) => (
        <div>
          <p>{section?.title}</p>
          <p>{section?.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Book;
