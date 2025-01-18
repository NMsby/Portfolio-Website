import React, { useEffect, useState } from 'react';
import { GraduationCap, Award, ChevronRight } from 'lucide-react';

// Type Definitions
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
    // State management
    const [isVisible, setIsVisible] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);

    // Animation on load
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Keyboard navigation handler
    const handleKeyPress = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpandedId(expandedId === id ? null : id);
        }
    };

    return (
        <div className={`py-0 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
            <h3 className="text-2xl font-semibold mb-2" style={{ color: '#22223B' }}>
                Education Background
            </h3>

            <div className="space-y-2">
                {educationData.map((education, index) => (
                    <div
                        key={education.id}
                        className={`relative pl-8 border-l-2 border-dashed transition-all duration-500 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}
                        style={{
                            borderColor: '#4A4E69',
                            transitionDelay: `${index * 200}ms`
                        }}
                    >
                        {/* Timeline Dot */}
                        <div
                            className={`absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                                expandedId === education.id ? 'scale-110' : ''
                            }`}
                            style={{ backgroundColor: '#22223B' }}
                        >
                            <GraduationCap size={16} className="text-white" />
                        </div>

                        {/* Timeline Content */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setExpandedId(expandedId === education.id ? null : education.id)}
                            onKeyDown={(e) => handleKeyPress(e, education.id)}
                            className={`bg-white rounded-lg shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 ${
                                expandedId === education.id ? 'ring-2 ring-[#4A4E69]' : ''
                            } focus:outline-none focus:ring-2 focus:ring-[#4A4E69]`}
                            aria-expanded={expandedId === education.id}
                        >
                            {/* Header */}
                            <div className="mb-2">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-xl font-semibold" style={{color: '#22223B'}}>
                                        {education.degree}
                                    </h4>
                                    <ChevronRight
                                        size={20}
                                        className={`transform transition-transform ${
                                            expandedId === education.id ? 'rotate-90' : ''
                                        }`}
                                        style={{color: '#4A4E69'}}
                                    />
                                </div>
                                <p className="text-sm" style={{color: '#4A4E69'}}>
                                    {education.institution} • {education.duration}
                                </p>
                                {education.gpa && (
                                    <p className="text-sm font-medium" style={{color: '#4A4E69'}}>
                                        GPA: {education.gpa}
                                    </p>
                                )}
                            </div>

                            {/* Expandable Content */}
                            <div className={`transition-all duration-300 ${
                                expandedId === education.id ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                            }`}>
                                {/* Major Courses */}
                                {education.major && (
                                    <div className="mb-2">
                                        <h5 className="text-sm font-semibold mb-2" style={{color: '#22223B'}}>
                                            Major Courses
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {education.major.map((course, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs px-3 py-1 rounded-full transition-all hover:scale-105"
                                                    style={{backgroundColor: '#4A4E69', color: '#F2E9E4'}}
                                                >
                                                {course}
                                            </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Achievements */}
                                <div>
                                    <h5 className="text-sm font-semibold mb-2" style={{color: '#22223B'}}>
                                        Achievements
                                    </h5>
                                    <ul className="space-y-2">
                                        {education.achievements.map((achievement, index) => (
                                            <li
                                                key={index}
                                                className={`flex items-start gap-2 text-sm transition-all duration-300 ${
                                                    hoveredAchievement === index ? 'translate-x-2' : ''
                                                }`}
                                                style={{color: '#4A4E69'}}
                                                onMouseEnter={() => setHoveredAchievement(index)}
                                                onMouseLeave={() => setHoveredAchievement(null)}
                                            >
                                                <Award
                                                    size={16}
                                                    className={`mt-1 flex-shrink-0 transition-transform ${
                                                        hoveredAchievement === index ? 'scale-110' : ''
                                                    }`}
                                                    style={{color: '#9A8C98'}}
                                                />
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationTimeline;