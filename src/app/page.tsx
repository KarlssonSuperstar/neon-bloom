import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import dynamic from 'next/dynamic';

const Cassettes = dynamic(() => import("@/components/Cassettes"));
const World = dynamic(() => import("@/components/World"));
const Gameplay = dynamic(() => import("@/components/Gameplay"));
const Story = dynamic(() => import("@/components/Story"));
const Faction = dynamic(() => import("@/components/Faction"));
const CharacterShowcase = dynamic(() => import("@/components/CharacterShowcase"));
const Gallery = dynamic(() => import("@/components/Gallery"));
const Finale = dynamic(() => import("@/components/Finale"));
const Footer = dynamic(() => import("@/components/Footer"));

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
