import React from 'react';
import { Home, Login, Register, TurfDetailsPage, Layout, AuthProvider, MyTurfPage, AllTurfs, Users, GlobalStyle, BookingPage } from './index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../src/context/PrivateRoute'; // Import PrivateRoute component

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/turf/:id" element={<PrivateRoute element={<TurfDetailsPage />} />} />
            <Route path="/booking-history"  element={<PrivateRoute element={<BookingPage />} />}/>
            <Route path="/turf" element={<PrivateRoute element={<MyTurfPage />} />} />
            <Route path="/turfs" element={<PrivateRoute element={<AllTurfs />} />} />
            <Route path="/users" element={<PrivateRoute element={<Users />} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
