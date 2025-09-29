import authService from '@/services/auth.js'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Footer } from '@/components'
import { useAuthInit } from '@/hooks'
import { Outlet } from "react-router";


export default function App() {
  // Fetch user data (consider adding error handling)
  useAuthInit();

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