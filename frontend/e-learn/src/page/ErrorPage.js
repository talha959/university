import React from "react";

const ErrorPage = () => {
return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">
                Page Not Found
            </h2>
            <p className="mt-2 text-gray-600">
                The page you are looking for does not exist or has been moved.
            </p>
            <button
                disabled
                className="mt-6 inline-block cursor-none rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                Go Back Home
            </button>
        </div>
    </div>
);
};

export default ErrorPage;
