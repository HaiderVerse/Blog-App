import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Container from '@/components/global/container';
import GlobalButton from '@/components/global/Button';
import { logout } from '@/features/auth/authSlice.js';
import authService from '@/services/auth.js';
import UserMenu from './UserMenu';


export default function Header() {
    const { status, userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Articles",
            slug: "/articles",
            active: status,
        },
        {
            name: "New Article",
            slug: "/article/new",
            active: status,
        },
    ]

    async function handleLogout() {
        try {
            const respose = await authService.logout();
            if (respose) dispatch(logout());
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return (
        <header className='w-full bg-black py-4'>
            <Container>
                <div className='flex items-center justify-between'>
                    <div className='max-w-32'>
                        <NavLink to="/">
                            <img src="/images/logo.png" alt="logo" />
                        </NavLink>
                    </div>
                    <nav className=''>
                        <ul className='flex items-center gap-x-10 text-white'>
                            {navItems.map(item => {
                                if (item.active) {
                                    return (
                                        <li key={item.name} className='font-[cursive, sans-serif] font-normal text-md'>
                                            <NavLink to={item.slug}>{item.name}</NavLink >
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </nav>
                    {status ? (

                        <UserMenu logout={handleLogout} />
                    ) : (
                        <div className='flex items-center gap-x-4 text-white'>
                            <GlobalButton link="/login">Login</GlobalButton>
                            <GlobalButton link="/signup">Signup</GlobalButton>
                        </div>
                    )}
                </div>
            </Container>
        </header >
    )
}
