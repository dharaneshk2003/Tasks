import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <Link to='/task1' className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600 transition duration-300">
                Task 1
            </Link>
            <Link to='/task2' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                Task 2
            </Link>
        </div>
    );
}

export default Home;
