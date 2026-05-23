import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World</div>,
    },
    {
        path: "/login",
        element: <div>Login</div>,
    },
    {
        path: "/register",
        element: <div>Register</div>,
    }    
]);
