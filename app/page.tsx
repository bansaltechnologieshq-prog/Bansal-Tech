import { About } from "@/components/About";
import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <Hero />
      <About />
      <Careers />
      <Contact />
    </main>
  );
}
