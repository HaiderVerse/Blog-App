import { useReducer } from "react";
import { Input, Label } from '@/components/global/form';
import Icons from "@/components/icons";
import GlobalButton from "@/components/global/Button";
import authService from "@/services/auth";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: 'Hasnain Haider',
    email: 'hasnain.h1215@gmail.com',
    password: 'HHfutball@7',
    confirmPassword: 'HHfutball@7',
    passwordVisible: false,
    passwordLength: 8,
    isSubmitting: false,
    error: {
        name: null,
        email: null,
        password: null,
        response: null
    },
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_CONFIRM_PASSWORD':
            return { ...state, confirmPassword: action.payload };
        case 'SET_PASSWORD_LENGTH':
            return { ...state, passwordLength: action.payload };
        case 'TOGGLE_PASSWORD_VISIBILITY':
            return { ...state, passwordVisible: !state.passwordVisible };
        case 'IS_SUBMITTING':
            return { ...state, isSubmitting: action.payload };
        case 'SET_ERROR':
            return { ...state, error: { ...state.error, ...action.payload } };
        default:
            return state;
    }
}

export default function SignUp() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const sliceDispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = (state) => {
        const errors = {};
        if (!state.name) errors.name = 'Name is required';
        if (!state.email) errors.email = 'Email is required';
        if (!state.password) errors.password = 'Password is required';
        if (!state.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
        if (state.password !== state.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (state.password && state.password.length < state.passwordLength) errors.password = `Password must be at least ${state.passwordLength} characters long`;

        return errors;
    };

    const handleAccountCreation = async (e) => {
        e.preventDefault();
        const errors = validateForm(state);

        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'SET_ERROR', payload: errors });
            return;
        }

        dispatch({ type: 'IS_SUBMITTING', payload: true });
        try {
            const user = await authService.createAccount({
                name: state.name,
                email: state.email,
                password: state.password
            });
            if (user) {
                sliceDispatch(login({ userData: user }));
                navigate('/');
            }
        } catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: { response: error.message || "Something went wrong. Please try again." }
            });
        } finally {
            dispatch({ type: 'IS_SUBMITTING', payload: false });
        }
    };

    return (
        <>
            <div className="w-full  bg-[#F8FAFC] flex items-stretch justify-center mx-auto lg:h-auto">
                <div className="w-[100%] max-w-[90%] mx-auto h-full flex items-center justify-center sm:max-w-[75%] lg:w-[60%] lg:px-[60px] xl:pl-[135px] xl:w-[55%] py-28">
                    <div className="w-full lg:w-[622px] bg-white rounded-[20px] border-[1px] border-[#EBEBEB] border-solid px-[1.6rem] py-12 md:p-10">
                        <div className="flex justify-center sm:justify-between items-center " >
                            <img src="/images/logo.png" alt="logo" className="h-[60px] object-cover" />
                            <h4 className="hidden sm:flex text-[16px] font-normal text-[#585C67]">Don’t have an account ?<a href="/register" className="text-[#F03DA7] text-[16px] font-semibold pl-3 hover:text-primary-pink-hover">Sign Up</a></h4>
                        </div>
                        <div className="mt-10 lg:mt-20">
                            <h1 className="text-[#2D3340] text-4xl font-semibold">Login</h1>
                            <div className=" my-7 sm:my-[35px] h-[1px] w-full bg-[#D2D3D6]"></div>
                            <form method="post" onSubmit={handleAccountCreation} onChange={() => dispatch({ type: 'SET_ERROR', payload: { response: '' } })}>
                                <div className="mb-6 sm:mb-[30px]">
                                    <div className="relative ">
                                        <Input type="text" name="name" value={state.name}
                                            onInputChange={(e) => {
                                                dispatch({ type: 'SET_NAME', payload: e.target.value });
                                                if (state.error.name) {
                                                    console.log(state.error.name);
                                                    dispatch({ type: 'SET_ERROR', payload: { name: null } });
                                                }

                                            }}
                                        />
                                        <Label htmlFor="name">Name</Label>
                                    </div>
                                    {state.error.name && (<span className="text-red-500">{state.error.name}</span>)}
                                </div>
                                <div className="mb-6 sm:mb-[30px]">
                                    <div className="relative ">
                                        <Input type="email" name="email" value={state.email}
                                            onInputChange={(e) => {
                                                dispatch({ type: 'SET_EMAIL', payload: e.target.value });
                                                if (state.error.email) {
                                                    console.log(state.error.email);
                                                    dispatch({ type: 'SET_ERROR', payload: { email: null } });
                                                }

                                            }}
                                        />
                                        <Label htmlFor="email">E-mail address</Label>
                                    </div>
                                    {state.error.email && (<span className="text-red-500">{state.error.email}</span>)}
                                </div>
                                <div className="mb-6 sm:mb-[30px]">
                                    <div className="relative">
                                        <Input type={state.passwordVisible ? "text" : "password"} name="password" value={state.password}
                                            onInputChange={(e) => {
                                                dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
                                                if (state.error.password) {
                                                    console.log(state.error.password);
                                                    dispatch({ type: 'SET_ERROR', payload: { password: null } });
                                                }

                                            }}
                                        />
                                        <Label htmlFor="password">Password</Label>
                                        <span className="block absolute right-[5%] top-[33%] cursor-pointer" onClick={() => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' })}>
                                            {state.passwordVisible ? (
                                                <Icons type="eyeOpen" />
                                            ) : (
                                                <Icons type="eyeClose" />
                                            )}
                                        </span>
                                    </div>
                                    {state.error.password && (<span className="text-red-500">{state.error.password}</span>)}

                                </div>
                                <div className="mb-6 sm:mb-[30px]">
                                    <div className="relative">
                                        <Input type={state.passwordVisible ? "text" : "password"} name="confirmPassword" value={state.confirmPassword}
                                            onInputChange={(e) => {
                                                dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value });
                                                if (state.error.confirmPassword) {
                                                    console.log(state.error.confirmPassword);
                                                    dispatch({ type: 'SET_ERROR', payload: { confirmPassword: null } });
                                                }

                                            }}
                                        />
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    </div>
                                    {state.error.confirmPassword && (<span className="text-red-500">{state.error.confirmPassword}</span>)}
                                </div>
                                {state.error.response && (
                                    <span className="block text-red-500 mb-4">{state.error.response}</span>
                                )}
                                <GlobalButton type="Submit" customClass="w-full py-3 text-xl mt-4" disabled={state.isSubmitting}>SignUP</GlobalButton>
                            </form>
                        </div>
                    </div>
                </div >
                <div className="hidden w-[40%] relative bg-cover bg-no-repeat lg:flex lg:items-center xl:w-[45%] bg-[url('/images/auth.png')]">
                    <div className="w-[75%] ml-[60px] flex flex-col gap-[30px] xl:ml-[72px] xl:w-[60%] ">
                        <h3 className="text-white text-3xl font-medium xl:text-4xl xl:font-semibold">Privacy-Centric Creators' Free Wishlist</h3>
                        <h4 className="text-white text-xl font-medium xl:text-2xl xl:font-semibold">Instant Orders: Complete Control, Secure Communication</h4>
                    </div>
                </div>
            </div >
        </>
    )
}
