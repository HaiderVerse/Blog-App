import authService from '@/services/auth.js'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Footer, getUserData } from '@/components'
import { Outlet } from "react-router";


export default function App() {
  // Fetch user data (consider adding error handling)
  getUserData('user.jsx');

  const { userData, loading } = useSelector((state) => state.auth)
  return loading ? (
    <div className="text-center p-4">
      Loading...
    </div>
  ) : (
    <div className="">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}