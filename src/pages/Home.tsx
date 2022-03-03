import { Helmet } from "react-helmet";
import { Categories, Footer, Hero } from "../components";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Booku</title>
        <meta name="description" content="Booku Website" />
      </Helmet>
      <Hero />
      <Categories />
      <Footer />
    </>
  );
};
