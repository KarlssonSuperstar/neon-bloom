import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Cassettes from "@/components/Cassettes";
import World from "@/components/World";
import Gameplay from "@/components/Gameplay";
import Story from "@/components/Story";
import Faction from "@/components/Faction";
import CharacterShowcase from "@/components/CharacterShowcase";
import Gallery from "@/components/Gallery";
import Finale from "@/components/Finale";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Intro />
        <Cassettes />
        <World />
        <Gameplay />
        <Story />
        <Faction />
        <CharacterShowcase />
        <Gallery />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
