import { createBrowserRouter } from "react-router-dom";
import App from "@/App.jsx";
import { Home, About, Articles, AddArticle, Login, Signup, NotFound } from "@/pages";
import AuthLayout from "@/layouts/auth";
import NotFoundLayout from "../layouts/NotFoundLayout";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },
            {
                path: "/articles",
                element: (
                    <AuthLayout authentication={true}>
                        <Articles />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-article",
                element: (
                    <AuthLayout authentication={false}>
                        <AddArticle />
                    </AuthLayout>
                ),
            }
        ],
    },
    // Not Found route outside main layout
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