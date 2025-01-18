import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import SectionHeading from "@/components/layout/SectionHeading";
import Hero from "@/components/sections/hero/Hero";
import Projects from "@/components/sections/projects/Projects";
import Education from "@/components/sections/education/Education";

export default function Home() {
  return (
      <MainLayout>
        {/* Hero Section */}
        <Hero />

        {/* Projects Section */}
        <Projects />

        {/* Education Section */}
        <Education />

        {/* About Section */}
        <PageSection id="about" backgroundColor="background">
            <SectionHeading
                title="About Me"
                subtitle="Get to know more about my journey and experience"
                align="center"
            />
            {/* About content will go here */}
        </PageSection>

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
