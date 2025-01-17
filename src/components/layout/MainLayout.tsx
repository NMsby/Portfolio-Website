import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps)=> {
    return (
        <div className="min-h-screen bg-background">
            {/*  Main content container  */}
            <main className="relative">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;