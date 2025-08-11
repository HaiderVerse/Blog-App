import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h1>404 - Page Not Found</h1>
            <p>Oops! We couldn't find what you were looking for.</p>
            <Link to="/">Go Back Home</Link>
        </>
    );
}
