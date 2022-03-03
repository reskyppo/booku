import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { Helmet } from "react-helmet";
function Home() {
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
}

export default Home;
