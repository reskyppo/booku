import HeroSVG from "../assets/hero.svg";

const Hero = () => {
  return (
    <div className="bg-[#FFE299] py-12 px-2">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <span>
            <h1 className="text-6xl font-bold">Booku</h1>
            <h5 className="text-xl my-4 font-medium">
              200+ ringkasan non-fiksi untuk perluas wawasanmu di mana pun,
              kapan pun. Ada versi audio & teks, dalam 2 bahasa!
            </h5>
          </span>
          <img
            className="w-1/2"
            src={HeroSVG}
            alt="a guy who stepping on books"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
