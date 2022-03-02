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
  const [chapters, setChapters] = useState<number>();

  let { category, id, page } = useParams();

  useEffect(() => {
    axios
      .get(`/fee-assessment-books?page=${page}&categoryId=${category}&size=15`)
      .then((response) => {
        console.log(response);
        const book = response?.data?.filter(
          (book: { id: number}) =>
            book.id === parseInt(id || "")
        );
        setBook(book[0]);
      });
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white max-w-screen shadow-xl py-6">
        <div className="md:flex justify-center md:w-2/3 lg:w-1/3 md:mx-auto ">
          <img
            className="mx-auto w-1/3"
            src={book?.cover_url}
            alt={book?.title}
          />
          <div className="my-4 ml-4">
            <h1 className="text-3xl font-bold">{book?.title}</h1>
            <div className="flex my-2">
              {book?.authors.map((a: string) => (
                <p className="font-semibold mr-2">{a}</p>
              ))}
            </div>
            <p className="text-sm">{book?.description}</p>
            <button className="bg-rose-400 py-2 px-4 mt-2 rounded-md text-white">
              Save as Favorite
            </button>
          </div>
        </div>
      </div>
      <div className="container bg-white rounded-xl shadow-md p-4 mx-0 md:mx-auto mt-12">
        <h3 className="text-2xl font-bold"> List Chapters</h3>
        {book?.sections?.map((section, idx) => (
          <div className="my-4" key={idx}>
            <p className="font-semibold text-lg w-fit border-b-2 border-indigo-500">
              {section?.title}
            </p>
            <p className="mt-2">{section?.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;
