import React, { useState } from 'react';

export default function ChatboxIndex() {
    const [uservisit, setUservisit] = useState(false);

    const handleButtonClick = () => {
        // Implement your logic here
        // setUservisit(false);
    };

    return (
        <>
            <div className="h-screen">
                <div className="container mx-auto h-full relative">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
                        <div className="md:col-span-9 p-4 overflow-y-auto h-full relative">
                            <div className="bg-[#002046] border rounded-lg shadow-lg p-4 flex flex-col h-full relative">
                                {uservisit && (
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#002046]">
                                        <div className="flex flex-col items-center">
                                            <div className="flex justify-end items-baseline mb-4 space-x-4">
                                                <button
                                                    onClick={handleButtonClick}
                                                    className="bg-[#001835] text-[#FFFFFF] py-2 px-4 rounded border border-white hover:bg-[#002a50] hover:border-[#f0f0f0]"
                                                >
                                                    Workout Plan
                                                </button>
                                                <button
                                                    onClick={handleButtonClick}
                                                    className="bg-[#001835] text-[#FFFFFF] py-2 px-4 rounded border border-white hover:bg-[#002a50] hover:border-[#f0f0f0]"
                                                >
                                                    Nutritional Advice
                                                </button>
                                                <button
                                                    onClick={handleButtonClick}
                                                    className="bg-[#001835] text-[#FFFFFF] py-2 px-4 rounded border border-white hover:bg-[#002a50] hover:border-[#f0f0f0]"
                                                >
                                                    Healthy Recipes
                                                </button>
                                            </div>
                                            {/* Message input */}
                                            <div className="mt-4 flex justify-center w-full" >
                                                <div className="relative flex items-center w-3/4" style={{'margin': 'auto'}}>
                                                    <input
                                                        type="text"
                                                        className="w-full border rounded-full p-2 pr-10 focus:outline-none"
                                                        placeholder="Type a message..."
                                                    />
                                                    <button
                                                        className="absolute right-0 top-0 bg-blue-500 text-white p-2 rounded-full"
                                                        style={{ padding: '9px' }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!uservisit && (
                                    <>
                                        <div className="flex-1 overflow-y-auto">
                                            {/* Chat messages */}
                                            <div className="flex items-start mb-4">
                                                <img
                                                    className="w-10 h-10 rounded-full mr-3"
                                                    src="https://via.placeholder.com/40"
                                                    alt="Sender"
                                                />
                                                <div>
                                                    <div className="bg-[#001835] text-[#FFFFFF] rounded-lg" style={{ padding: '10px' }}>
                                                        <p>Hello! How are you?</p>
                                                    </div>
                                                    <span className="text-xs text-gray-500">10:30 AM, Today</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start mb-4 justify-end">
                                                <div className="text-right">
                                                    <div className="bg-[#001835] text-[#FFFFFF] rounded-lg" style={{ padding: '10px' }}>
                                                        <p>I'm good, thank you! How about you?</p>
                                                    </div>
                                                    <span className="text-xs text-gray-500">10:32 AM, Today</span>
                                                </div>
                                                <img
                                                    className="w-10 h-10 rounded-full ml-3"
                                                    src="https://via.placeholder.com/40"
                                                    alt="Receiver"
                                                />
                                            </div>
                                            <div className="flex items-start mb-4">
                                                <img
                                                    className="w-10 h-10 rounded-full mr-3"
                                                    src="https://via.placeholder.com/40"
                                                    alt="Sender"
                                                />
                                                <div>
                                                    <div className="bg-[#001835] text-[#FFFFFF] rounded-lg" style={{ padding: '10px' }}>
                                                        <p>Hello! How are you?</p>
                                                    </div>
                                                    <span className="text-xs text-gray-500">10:30 AM, Today</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start mb-4 justify-end">
                                                <div className="text-right">
                                                    <div className="bg-[#001835] text-[#FFFFFF] rounded-lg" style={{ padding: '10px' }}>
                                                        <p>I'm good, thank you! How about you?</p>
                                                    </div>
                                                    <span className="text-xs text-gray-500">10:32 AM, Today</span>
                                                </div>
                                                <img
                                                    className="w-10 h-10 rounded-full ml-3"
                                                    src="https://via.placeholder.com/40"
                                                    alt="Receiver"
                                                />
                                            </div>
                                            <div className="flex items-start mb-4">
                                                <img
                                                    className="w-10 h-10 rounded-full mr-3"
                                                    src="https://via.placeholder.com/40"
                                                    alt="Sender"
                                                />
                                                <div>
                                                    <div className="bg-[#001835] text-[#FFFFFF] rounded-lg" style={{ padding: '10px' }}>
                                                        <p>Hello! How are you?</p>
                                                    </div>
                                                    <span className="text-xs text-gray-500">10:30 AM, Today</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start mb-4 justify-end">
                                                <div className="text-right">
                                                    <div className="bg-[#001835] text-[#FFFFFF] rounded-lg" style={{ padding: '10px' }}>
                                                        <p>I'm good, thank you! How about you?</p>
                                                    </div>
                                                    <span className="text-xs text-gray-500">10:32 AM, Today</span>
                                                </div>
                                                <img
                                                    className="w-10 h-10 rounded-full ml-3"
                                                    src="https://via.placeholder.com/40"
                                                    alt="Receiver"
                                                />
                                            </div>
                                            <div className="flex items-start mb-4">
                                                <img
                                                    className="w-10 h-10 rounded-full mr-3"
                                                    src="https://via.placeholder.com/40"
                                                    alt="Sender"
                                                />
                                                <div>
                                                    <div className="bg-[#001835] text-[#FFFFFF] rounded-lg" style={{ padding: '10px' }}>
                                                        <p>Hello! How are you?</p>
                                                    </div>
                                                    <span className="text-xs text-gray-500">10:30 AM, Today</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start mb-4 justify-end">
                                                <div className="text-right">
                                                    <div className="bg-[#001835] text-[#FFFFFF] rounded-lg" style={{ padding: '10px' }}>
                                                        <p>I'm good, thank you! How about you?</p>
                                                    </div>
                                                    <span className="text-xs text-gray-500">10:32 AM, Today</span>
                                                </div>
                                                <img
                                                    className="w-10 h-10 rounded-full ml-3"
                                                    src="https://via.placeholder.com/40"
                                                    alt="Receiver"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative flex items-center w-3/4"  style={{'margin': 'auto'}}>
                                            <input
                                                type="text"
                                                className="w-full border rounded-full p-2 pr-10 focus:outline-none"
                                                placeholder="Type a message..."
                                            />
                                            <button
                                                className="absolute right-0 top-0 bg-blue-500 text-white p-2 rounded-full"
                                                style={{ padding: '9px' }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-3 p-4">
                            {/* Right sidebar content */}
                            <p className="text-white">3 Columns</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
