import { createBrowserRouter } from "react-router-dom";
import App from "@/App.jsx";
import { Home, Articles, NewArticle, Login, Signup, NotFound, VerifyEmail, Article } from "@/pages";
import AuthContainer from "@/components/authContainer";
import { NotFoundLayout, User } from "@/layouts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true, // Home
                element: <Home />,
            },
            {
                path: "verify-email",
                element: <VerifyEmail />,
            },
            {
                path: "login",
                element: (
                    <AuthContainer authentication={false}>
                        <Login />
                    </AuthContainer>
                ),
            },
            {
                path: "signup",
                element: (
                    <AuthContainer authentication={false}>
                        <Signup />
                    </AuthContainer>
                ),
            },
            {
                path: "articles",
                element: (
                    <AuthContainer authentication={true}>
                        <Articles />
                    </AuthContainer>
                ),
            },
            {
                path: "article/new",
                element: (
                    <AuthContainer authentication={true}>
                        <NewArticle />
                    </AuthContainer>
                ),
            },
            {
                path: "article/:slug",
                element: (
                    <AuthContainer authentication={true}>
                        <Article />
                    </AuthContainer>
                ),
            },
            {
                path: "article/:slug/edit",
                element: (
                    <AuthContainer authentication={true}>
                        <Article />
                    </AuthContainer>
                ),
            },
        ],
    },

    // User profile routes (NO header/footer)
    {
        path: ":id",
        element: <User />, // Custom layout without header/footer
        children: [
            {
                index: true,
                element: (
                    <AuthContainer authentication={true}>
                        <Articles />
                    </AuthContainer>
                ),
            },
            {
                path: 'articles',
                element: (
                    <AuthContainer authentication={true}>
                        <Articles />
                    </AuthContainer>
                ),
            },
            {
                path: 'wishlist',
                element: (
                    <AuthContainer authentication={true}>
                        <Articles />
                    </AuthContainer>
                ),
            },
            {
                path: 'collections',
                element: (
                    <AuthContainer authentication={true}>
                        <Articles />
                    </AuthContainer>
                ),
            },
            {
                path: 'about',
                element: (
                    <AuthContainer authentication={true}>
                        <Articles />
                    </AuthContainer>
                ),
            },
        ],
    },

    // Not found
    {
        path: "*",
        element: (
            <NotFoundLayout>
                <NotFound />
            </NotFoundLayout>
        ),
    },
]);

export default router;
