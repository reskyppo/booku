import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BiHomeAlt } from "react-icons/bi";

const Category = () => {
  let { categoryId, name } = useParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [resCategories, setResCategories] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    const search = categories.filter((c) =>
      c.title.toLowerCase().includes(e.target.value)
    );
    setResCategories(search);
  };

  useEffect(() => {
    axios
      .get(
        `/fee-assessment-books?categoryId=${categoryId}&size=15&page=${page}`
      )
      .then((response) => {
        setCategories(response?.data);
        setResCategories(response?.data);
      });
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Categories | Booku</title>
      </Helmet>
      <div className="container mx-auto px-2">
        <div className="flex justify-center items-center my-2">
          <BiHomeAlt
            onClick={() => navigate(`/`)}
            size={56}
            className="text-indigo-500"
          />
          <input
            onChange={(e) => handleSearch(e)}
            className="px-2 h-12 w-5/6 md:w-1/2 border-2 border-indigo-500"
            placeholder="Search your book here"
          />
        </div>
        <h1 className="my-2 w-fit text-4xl border-b-4 border-indigo-500">
          {name}
        </h1>
        <div className="my-4 grid md:grid-cols-3">
          {resCategories?.map((c) => (
            <div
              className="flex my-2 mr-2 cursor-pointer"
              onClick={() => navigate(`/${c.category_id}/${c.id}/${page}`)}
            >
              <img className="w-1/4" src={c.cover_url} alt={c.title} />
              <div className="ml-2">
                <h2 className="text-xl font-bold">{c.title}</h2>
                <div className="flex">
                  {c.authors.map((a: string) => (
                    <p className="font-semibold mr-2">{a}</p>
                  ))}
                </div>
                <p className="text-sm">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center my-2">
          {page > 0 && <button onClick={() => setPage(page - 1)}>prev</button>}
          <p className="mx-2">{page + 1}</p>
          {page < 5 && <button onClick={() => setPage(page + 1)}>next</button>}
        </div>
      </div>
    </>
  );
};

export default Category;
