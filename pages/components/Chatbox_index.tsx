import React, { useState } from 'react';

export default function ChatboxIndex() {
    const [uservisit, setUservisit] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        let newQuestions = [];
        if (category === 'Workout Plan') {
            newQuestions = [
                'What is your current fitness level?',
                'Do you have any specific fitness goals?',
                'How many days a week can you commit to working out?',
            ];
        } else if (category === 'Nutritional Advice') {
            newQuestions = [
                'Do you have any dietary restrictions?',
                'What are your current eating habits?',
                'Are you aiming for weight loss, maintenance, or gain?',
            ];
        } else if (category === 'Healthy Recipes') {
            newQuestions = [
                'Do you have any favorite cuisines?',
                'Are there any ingredients you dislike?',
                'How much time can you spend on cooking daily?',
            ];
        }
        setQuestions(newQuestions);
    };

    const handleQuestionClick = (question) => {
        alert(question);
    };
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };
    const getButtonClass = (category) => {
        return category === activeCategory
            ? 'rounded-full font-bold py-1 px-4 text-sm bg-[#002a50] text-[#FFFFFF] rounded border border-[#f0f0f0]'
            : 'rounded-full font-bold py-1 px-4 text-sm bg-[#001835] text-[#FFFFFF] rounded border border-white hover:bg-[#002a50] hover:border-[#f0f0f0]';
    };

    return (
        <>
            <div className="h-screen">
                <div className="container mx-auto h-full relative">
                    <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                        <div className="md:col-span-9  overflow-y-auto h-full relative">
                            <div className="bg-[#002046]  shadow-lg p-4 flex flex-col h-full relative">
                                <div className="bg-[#001835] text-[#FFFFFF] text-center	 -m-4 -mt-4 p-4 mt-0 flex justify-between items-center">
                                    <h1 className="text-lg font-bold ">Fitness Pro</h1>
                                </div>
                                {uservisit && (
                                    <div className="flex items-center justify-center mb-4">
                                        <img
                                            src="/images/banner.png"
                                            alt="Banner"
                                            className="max-h-96 mx-auto"
                                        />
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
                                            </div>   <div className="flex items-start mb-4">
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
                                            {/* Add more chat messages here if needed */}
                                        </div>
                                        <div className="mt-4 flex justify-center w-full">
                                            <div className="relative flex items-center w-3/4" style={{ margin: 'auto' }}>
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
                                    </>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#002046]">
                                    {uservisit && (
                                    <div className="flex flex-col items-center">
                                        <div className="flex justify-end items-baseline mb-4 space-x-4">
                                            <button
                                                onClick={() => handleCategoryClick('Workout Plan')}
                                                className={getButtonClass('Workout Plan') + ''}
                                            >
                                                Workout Plan
                                            </button>
                                            <button
                                                onClick={() => handleCategoryClick('Nutritional Advice')}
                                                className={getButtonClass('Nutritional Advice')}
                                            >
                                                Nutritional Advice
                                            </button>
                                            <button
                                                onClick={() => handleCategoryClick('Healthy Recipes')}
                                                className={getButtonClass('Healthy Recipes')}
                                            >
                                                Healthy Recipes
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap justify-center">
                                            {questions.map((question, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleQuestionClick(question)}
                                                    className="rounded-full py-1 px-4 text-sm bg-[#001835] text-[#FFFFFF] py-2 px-4 m-1 rounded border border-white hover:bg-[#002a50] hover:border-[#f0f0f0]"
                                                >
                                                    {question}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    )}
                                    <div className="mt-4 flex justify-center">
                                        <div className="relative flex items-center w-3/4" style={{ margin: 'auto' }}>
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
                        </div>
                        <div className="md:col-span-3 ">
                            {/* Right sidebar content */}
                            <div className="xs:min-h-0 md:min-h-screen flex items-center justify-center bg-[#001835]">
                                <div className="max-w-md p-8 relative">
                                    <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#4CAF50] to-[#00796B] rounded-l-lg"></div>
                                    <h2 className="text-2xl mb-4 text-center text-white">Language Selector</h2>
                                    <div className="flex flex-col space-y-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                value="english"
                                                checked={selectedLanguage === 'english'}
                                                onChange={handleLanguageChange}
                                            />
                                            <span className="ml-2 text-[#FFFFFF]">English</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                value="urdu"
                                                checked={selectedLanguage === 'urdu'}
                                                onChange={handleLanguageChange}
                                            />
                                            <span className="ml-2 text-[#FFFFFF]">Urdu</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                value="german"
                                                checked={selectedLanguage === 'german'}
                                                onChange={handleLanguageChange}
                                            />
                                            <span className="ml-2 text-[#FFFFFF]">German</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
