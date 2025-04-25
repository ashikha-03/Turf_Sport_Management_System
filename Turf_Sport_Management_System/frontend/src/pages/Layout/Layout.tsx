// src/components/Layout.tsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div>{children}</div>
        </div>
    );
};

export default Layout;
