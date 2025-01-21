import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import Hero from "@/components/sections/hero/Hero";
import Projects from "@/components/sections/projects/Projects";
import Education from "@/components/sections/education/Education";
import Experience from "@/components/sections/experience/Experience";
import About from "@/components/sections/about/About";
import Contact from "@/components/sections/contact/Contact";
import Footer from "@/components/sections/footer/Footer";

export default function Home() {
  return (
      <MainLayout>
        {/* Hero Section */}
        <Hero />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Education Section */}
        <Education />

        {/* About Section */}
        <About />

        {/* Contact Section */}
        <Contact />

        {/* Footer Section */}
        <Footer />

      </MainLayout>
  );
}
