import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import SectionHeading from "@/components/layout/SectionHeading";

export default function Home() {
  return (
      <MainLayout>

        {/* Hero Section */}
        <PageSection
            id="hero"
            backgroundColor="primary"
            containerWidth="full"
            className="min-h-screen flex items-center"
        >
          <MaxWidthWrapper>
            {/* Hero content will go here */}
          </MaxWidthWrapper>
        </PageSection>

        {/* Projects Section */}
        <PageSection id="projects" backgroundColor="background">
          <SectionHeading
              title="Featured Projects"
              subtitle="A collection of my work showcasing my skills in web development, data visualization, and software engineering."
              align="center"
          />
          {/* Projects content will go here */}
        </PageSection>

        {/* Skills Section */}
        <PageSection id="skills" backgroundColor="primary">
          <SectionHeading
              title="Skills & Expertise"
              subtitle="A comprehensive overview of my technical skills and development expertise"
              align="center"
          />
          {/* Skills content will go here */}
        </PageSection>

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
