import { login, logout, setLoading } from '@/features/auth/authSlice.js';
import authService from '@/services/auth.js';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function useAuthInit() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true));
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        dispatch(logout());
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);
}
