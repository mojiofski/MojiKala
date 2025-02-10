import SliderHero from "@/components/SliderHero";
import NewProducts from "@/components/NewProducts";
import React from "react";
import Navbar from "@/components/Navbar";


const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
        <SliderHero />
        <NewProducts />
      </div>
    </div>
  );
};

export default Home;
