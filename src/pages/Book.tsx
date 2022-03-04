import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteDataLocalStorage, saveLocalStorage } from "../lib/utils";
import { Helmet } from "react-helmet";
import { Loading } from "../components";

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

export const Book = () => {
  const data = JSON.parse(localStorage.getItem("prod") || "[]");

  const [book, setBook] = useState<IBook>();
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let { category, id, page } = useParams();

  const favBook = {
    id: book?.id,
    title: book?.title,
    category_id: book?.category_id,
    description: book?.description,
    cover_url: book?.cover_url,
    authors: book?.authors,
    page: page,
  };

  const setFavorite = (favorite: boolean, id?: number) => {
    if (favorite) {
      saveLocalStorage(favBook);
      setIsFavorite(true);
    } else {
      id && deleteDataLocalStorage(id);
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    axios
      .get(`/fee-assessment-books?page=${page}&categoryId=${category}&size=15`)
      .then((response) => {
        const book = response?.data?.filter(
          (book: { id: number }) => book.id === parseInt(id || "")
        );
        setBook(book[0]);
        setIsLoading(false);
        const res = data.filter(
          (item: { id: number }) => item.id === book[0]?.id
        );
        res.length > 0 ? setIsFavorite(true) : setIsFavorite(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Booku</title>
      </Helmet>
      <div className="bg-gray-50 min-h-screen">
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
                  {!isFavorite ? (
                    <button
                      className="bg-rose-400 py-2 px-4 mt-2 rounded-md text-white"
                      onClick={() => setFavorite(true)}
                    >
                      Save as Favorite
                    </button>
                  ): (
                    <button
                      className="bg-rose-400 py-2 px-4 mt-2 rounded-md text-white"
                      onClick={() => setFavorite(false, book?.id)}
                    >
                      Delete from favorite
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="container bg-white rounded-xl shadow-md p-4 mx-0 md:mx-auto my-12">
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
          </>
        )}
      </div>
    </>
  );
};
