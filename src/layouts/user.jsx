import { Header, Footer, getUserData } from '@/components';
import { Outlet } from "react-router";
import { ProfileHeader } from '@/components';
import { useSelector } from 'react-redux';
import { NotFound } from '@/pages'

export default function User() {
    const { userData, loading } = useSelector((state) => state.auth);
    // Fetch user data (consider adding error handling)
    getUserData('user.jsx');

    const path = window.location.pathname;
    const userEmail = userData?.email?.replace('@gmail.com', '')?.replaceAll('.', '-') || '';
    console.log(userEmail);

    // More robust path comparison
    const isCorrectUser = path.endsWith(userEmail) || path.includes(`/${userEmail}/`);

    return loading ? (
        <div className="text-center p-4">
            Loading...
        </div>
    ) : (
        <>
            <Header />
            <main>
                {!isCorrectUser ? (
                    <NotFound />
                ) : (
                    <>
                        <ProfileHeader />
                        <Outlet />
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}
