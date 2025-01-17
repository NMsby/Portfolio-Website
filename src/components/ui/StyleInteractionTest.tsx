"use client"
import React, {useState} from 'react';

const StyleInteractionTest = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    return (
        <div className="p-8 space-7-12 bg-background">
            <section>
                <h2 className="font-primary text-2xl font-bold mb-4">Interactive Elements</h2>

                {/*  Cards with hover effects  */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="p-6 rounded-lg transition-all duration-300 cursor-pointer"
                            style={{
                                backgroundColor: activeCard === item ? '#C9ADA7' : '#22223B',
                                transform: `scale(${activeCard === item ? 1.05 : 1})`,
                            }}
                            onMouseEnter={() => setActiveCard(item)}
                            onMouseLeave={() => setActiveCard(null)}
                        >
                            <h3 className="font-primary text-xl font-semibold mb-2"
                                style={{ color: activeCard === item ? '#22223B' : '#F2E9E4' }}>
                                Interactive Card {item}
                            </h3>
                            <p style={{ color: activeCard === item ? '#22223B' : '#9A8C98' }}>
                                Hover to see color transitions and scaling effects
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StyleInteractionTest;