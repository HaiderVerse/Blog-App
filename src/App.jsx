import authService from '@/services/auth.js'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/features/auth/authSlice.js';
import { Header, Footer } from '@/components'
import { Outlet } from "react-router";
import { Client } from 'appwrite';
import conf from '@/conf/conf.js';


export default function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { status, userData } = useSelector((state) => state.auth)
  const client = new Client();

  client
    .setEndpoint(conf.appwriteUrl) // Appwrite endpoint
    .setProject(conf.appwriteProjectId);      // Your project ID

  useEffect(() => {
    console.log("Checking user authentication...  ");

    setLoading(true);
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);


  return loading ? (
    <div className="text-center p-4">
      Loading...
    </div>
  ) : (
    <div className="">
      <Header />
      <main>
        <p>{userData ? `Welcome back, ${userData.name}!` : "Please log in."}</p>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}