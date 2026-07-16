import Hero from "@/sections/Hero";
import Products from "@/sections/Products";
import Recipes from "@/sections/Recipes";
import Values from "@/sections/Values";
import About from "@/sections/About";
import Stats from "@/sections/Stats";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Recipes />
      <Values />
      <About />
      <Stats />
      <Contact />
    </>
  );
}
