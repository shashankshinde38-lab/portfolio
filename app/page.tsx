/* ================================================================== */
/* PAGE.TSX — SERVER COMPONENT (MODULAR SECTION ASSEMBLY)             */
/* ================================================================== */

import ActiveSectionProvider from "@/web/components/ActiveSectionProvider/ActiveSectionProvider";
import Hero from "@/web/sections/Hero/Hero";
import About from "@/web/sections/About/About";
import Experience from "@/web/sections/Experience/Experience";
import Skills from "@/web/sections/Skills/Skills";
import Projects from "@/web/sections/Projects/Projects";
import Simulator from "@/web/sections/Simulator/Simulator";
import Certifications from "@/web/sections/Certifications/Certifications";
import FAQ from "@/web/sections/FAQ/FAQ";
import Contact from "@/web/sections/ContactSection/Contact";

export default function PortfolioPage() {
  return (
    <ActiveSectionProvider footer={null}>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Simulator />
      <Certifications />
      <FAQ />
      <Contact />
    </ActiveSectionProvider>
  );
}
