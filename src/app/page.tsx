import MainLayout from "@/components/layout/MainLayout";
import SectionContainer from "@/components/layout/SectionContainer";

export default function Home() {
  return (
    <main>
      {/*
          Test Components
              <StyleTest />
              <StyleInteractionTest />
        */}

      <MainLayout>
        {/* Hero Section */}
        <SectionContainer id="hero" fullWidth>
          {/* Hero content will go here */}
        </SectionContainer>

        {/* Projects Section */}
        <SectionContainer id="hero" fullWidth>
          {/* Projects content will go here */}
        </SectionContainer>

        {/* Skills Section */}
        <SectionContainer id="hero" fullWidth>
          {/* Skills content will go here */}
        </SectionContainer>

        {/* About Section */}
        <SectionContainer id="hero" fullWidth>
          {/* About content will go here */}
        </SectionContainer>

        {/* Contact Section */}
        <SectionContainer id="hero" fullWidth>
          {/* Contact content will go here */}
        </SectionContainer>
      </MainLayout>

    </main>
  );
}
