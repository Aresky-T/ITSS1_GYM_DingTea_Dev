import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Page not found</h1>
            <p className="not-found-text">The page you are looking for does not exist or you do not have access!</p>
            <Link to="/" className="not-found-link">Back to Home Page</Link>
        </div>
    )
}

export default NotFoundPage