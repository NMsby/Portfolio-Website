"use client";

import React from 'react';
import PageSection from "@/components/layout/PageSection";
import SectionHeading from "@/components/layout/SectionHeading";
import EducationTimeline from "@/components/sections/education/EducationTimeline";
import CertificatesGrid from "@/components/sections/education/CertificatesGrid";

const Education = () => {
    return (
        <PageSection
            id="education"
            backgroundColor="background"
            containerWidth="default"
            className="py-4"
        >
            <SectionHeading
                title="Education & Certifications"
                subtitle="My academic journey and certifications"
                align="center"
            />

            {/* Education Timeline */}
            <EducationTimeline />

            {/* Certificates Grid */}
            <CertificatesGrid />

        </PageSection>
    );
};

export default Education;