import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import SectionHeading from "@/components/layout/SectionHeading";
import Hero from "@/components/sections/hero/Hero";
import Projects from "@/components/sections/projects/Projects";
import Education from "@/components/sections/education/Education";
import Experience from "@/components/sections/experience/Experience";
import About from "@/components/sections/about/About";

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
        <PageSection id="contact" backgroundColor="primary">
          <SectionHeading
              title="Let's Connect"
              subtitle="Have a project in mind? Let's create something amazing together."
              align="center"
          />
          {/* Contact content will go here */}
        </PageSection>

        {/* Footer Section */}
        <PageSection
            backgroundColor="background"
            containerWidth="full"
            className="py-8"
        >
          {/* Footer content will go here */}
        </PageSection>

      </MainLayout>
  );
}
