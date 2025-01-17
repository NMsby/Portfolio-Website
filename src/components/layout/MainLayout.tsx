import React from 'react';
import Navbar from "@/components/navigation/Navbar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps)=> {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {/*  Main content container  */}
            <main className="relative pt-16">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;