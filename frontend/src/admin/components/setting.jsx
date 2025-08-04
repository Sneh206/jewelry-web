import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminHeader from '../page/AdminHeader';

const Setting = () => {
    const navigate = useNavigate();
    const [saveCredentials, setSaveCredentials] = useState(false);

    const handleSaveToggle = () => {
        const newState = !saveCredentials;
        setSaveCredentials(newState);

        if (newState) {
            setTimeout(() => {
                navigate('/savepassaword');
            }, 1000);
        }
    };

    return (
        <>
        <div className=" top-0 z-50 shadow-md">
        <AdminHeader />
      </div>
        <div className="w-full max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

            {/* Save username/password switch */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <span className="text-gray-700 font-medium">
                    Save Username & Password
                </span>
                <div className="flex items-center space-x-3">
                    <div
                        onClick={handleSaveToggle}
                        className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
                            saveCredentials ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                    >
                        <div
                            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                                saveCredentials ? 'translate-x-6' : ''
                            }`}
                        ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                        {saveCredentials ? 'ON' : 'OFF'}
                    </span>
                </div>
            </div>

            {/* Change password */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <span className="text-gray-700 font-medium">Change Password</span>
                <Link to="/changepassword">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                        Change Password
                    </button>
                </Link>
            </div>

            {/* Delete Account */}
            <div className="flex justify-between items-center">
                <span className="text-red-600 font-medium">
                    Permanently delete admin panel account?
                </span>
                <Link to="/deleteadmin">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                        Delete Account
                    </button>
                </Link>
            </div>
        </div>
        </>
    );
};

export default Setting;
