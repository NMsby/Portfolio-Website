import React from 'react';

const StyleTest = () => {
    return (
        <div className="p-8 space-y-12 bg-background">
            {/*  Colors  */}
            <section>
                <h2 className="font-primary text-2xl font-bold mb-4">Color Palette</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        { name: 'Primary', class: 'bg-primary' },
                        { name: 'Secondary', class: 'bg-secondary' },
                        { name: 'Accent', class: 'bg-accent' },
                        { name: 'Interactive', class: 'bg-interactive' },
                        { name: 'Background', class: 'bg-background border' },
                    ].map((color) => (
                        <div key={color.name} className="space-y-2">
                            <div className={`${color.class} h-20 rounded-lg`}></div>
                            <p className="text-sm font-medium text-primary">{color.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/*  Typography  */}
            <section>
                <h2 className="font-primary text-2xl font-bold mb-4">Typography</h2>
                <div className="space-y-4">
                    <div>
                        <h1 className="font-primary text-4xl font-bold text-primary">Heading 1</h1>
                        <p className="text-sm text-secondary">font-primary, text-4xl, font-bold</p>
                    </div>
                    <div>
                        <h2 className="font-primary text-3xl font-bold text-primary">Heading 2</h2>
                        <p className="text-sm text-secondary">font-primary, text-3xl, font-bold</p>
                    </div>
                    <div>
                        <h3 className="font-primary text-2xl font-semibold text-primary">Heading 3</h3>
                        <p className="text-sm text-secondary">font-primary, text-2xl, font-semibold</p>
                    </div>
                    <div>
                        <p className="font-secondary text-base text-primary">Body Text Regular</p>
                        <p className="text-sm text-secondary">font-secondary, text-base</p>
                    </div>
                    <div>
                        <p className="font-secondary text-sm text-primary">Small Text</p>
                        <p className="text-sm text-secondary">font-secondary, text-sm</p>
                    </div>
                </div>
            </section>

            {/*  Interactive Elements  */}
            <section>
                <h2 className="font-primary text-2xl font-bold mb-4">Interactive Elements</h2>
                <div className="space-y-4">
                    <button className="px-4 py-2 bg-interactive text-primary rounded-lg font-primary font-medium
                    hover:scale-105 transition-transform">Primary Button
                    </button>
                    <br/>
                    <button className="px-4 py-2 bg-secondary text-background rounded-lg font-primary font-medium
                    hover:scale-105 transition-transform">Secondary Button
                    </button>
                </div>
            </section>

        </div>
    );
};

export default StyleTest;