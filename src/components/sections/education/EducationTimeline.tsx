import React from 'react';
import { GraduationCap, Award, ChevronRight } from 'lucide-react';

interface Education {
    id: string;
    degree: string;
    institution: string;
    duration: string;
    achievements: string[];
    major?: string[];
    gpa?: string;
}

const educationData: Education[] = [
    {
        id: '1',
        degree: 'Bachelor of Science in Informatics & Computer Science',
        institution: 'Strathmore University',
        duration: '2021 - 2025',
        major: [
            'Computer Programming',
            'Software Engineering',
            'Database Management',
            'Network Security',
            'Cloud Computing'
        ],
        achievements: [
            'Upper Second Class Honours',
            'Dean\'s List Recognition',
        ],
        gpa: '3.5/4.0'
    },
    // Add more education data as needed
];

const EducationTimeline: React.FC = () => {
    return (
        <div className="py-0">
            <h3 className="text-2xl font-semibold mb-2" style={{ color: '#22223B' }}>
                Education Background
            </h3>

            <div className="space-y-2">
                {educationData.map((education) => (
                    <div
                        key={education.id}
                        className="relative pl-8 border-l-2 border-dashed"
                        style={{ borderColor: '#4A4E69' }}
                    >
                        {/* Timeline Dot */}
                        <div
                            className="absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#22223B' }}
                        >
                            <GraduationCap size={16} className="text-white" />
                        </div>

                        {/* Timeline Content */}
                        <div className="bg-white rounded-lg shadow-lg p-4 transition-transform hover:-translate-y-1">
                            {/* Header */}
                            <div className="mb-2">
                                <h4 className="text-xl font-semibold" style={{ color: '#22223B' }}>
                                    {education.degree}
                                </h4>
                                <p className="text-sm" style={{ color: '#4A4E69' }}>
                                    {education.institution} • {education.duration}
                                </p>
                                {education.gpa && (
                                    <p className="text-sm font-medium" style={{ color: '#4A4E69' }}>
                                        GPA: {education.gpa}
                                    </p>
                                )}
                            </div>

                            {/* Major Courses */}
                            {education.major && (
                                <div className="mb-2">
                                    <h5 className="text-sm font-semibold mb-2" style={{ color: '#22223B' }}>
                                        Major Courses
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {education.major.map((course, index) => (
                                            <span
                                                key={index}
                                                className="text-xs px-3 py-1 rounded-full"
                                                style={{ backgroundColor: '#4A4E69', color: '#F2E9E4' }}
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            <div>
                                <h5 className="text-sm font-semibold mb-2" style={{ color: '#22223B' }}>
                                    Achievements
                                </h5>
                                <ul className="space-y-2">
                                    {education.achievements.map((achievement, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-sm"
                                            style={{ color: '#4A4E69' }}
                                        >
                                            <Award size={16} className="mt-1 flex-shrink-0" style={{ color: '#9A8C98' }} />
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationTimeline;