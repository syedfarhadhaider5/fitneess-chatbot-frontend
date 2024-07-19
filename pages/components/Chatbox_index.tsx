import React, {useEffect, useState,useRef} from 'react';
import axios from 'axios';
import { format, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';

// Initialize socket connection

export default function ChatboxIndex() {
    const [uservisit, setUservisit] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [singleQuestion, setsingleQuestion] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const messagesEndRef = useRef(null); // Ref to the dummy div at the bottom

    const scrollToBottom = () => {
        if (messagesEndRef.current && messagesEndRef.current.scrollHeight > messagesEndRef.current.clientHeight) {
            // Ensure scroll height is greater than client height for relevance
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
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

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    };
    const handleQuestionClick = async (question) => {
        try {
            if(question !== ''){
                setLoading(true); // Show loading icon
                setsingleQuestion('')
                const response = await axios.post('http://localhost:4000/messages', {
                    question: question,
                    time: getCurrentTime(),
                    date: getCurrentDate(),
                    flag: "unseen"
                });
                 console.log('Message sent:', response.data);
                setUservisit(false);
                fetchMessages();
                setLoading(false); // Hide loading icon after request completes

            }
        } catch (error) {
            setLoading(false); // Hide loading icon after request completes
            console.error('Error sending message:', error);
        }
    };
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:4000/messages');
            setMessages(response.data);

            // Update each message's flag column to 'seen'
            const updatePromises = response.data.map(message => {
                return axios.patch(`http://localhost:4000/messages/${message._id}`, { flag: 'seen' });
            });

            await Promise.all(updatePromises);

        } catch (error) {
            console.error('Error fetching or updating messages:', error);
        }
    };

    const getFormattedRelativeDate = (baseDate) => {
        const now = new Date();
        const daysDiff = differenceInDays(now, baseDate);
        const weeksDiff = differenceInWeeks(now, baseDate);
        const monthsDiff = differenceInMonths(now, baseDate);
        const yearsDiff = differenceInYears(now, baseDate);
        const formatDate = (date) => format(date, 'yyyy-MM-dd');

        if (daysDiff === 0) {
            return `Today`;
        } else if (daysDiff === 1) {
            return `Yesterday`;
        } else if (daysDiff === -1) {
            return `Tomorrow`;
        } else if (daysDiff <= 7) {
            return `${daysDiff} days ago`;
        } else if (weeksDiff === 1) {
            return `One week ago: ${formatDate(baseDate)}`;
        } else if (monthsDiff <= 2) {
            return `${monthsDiff} months ago`;
        } else if (monthsDiff === 7) {
            return `Seven months ago`;
        } else if (yearsDiff === 1) {
            return `One year ago`;
        } else {
            return `More than a year ago`;
        }
    };
    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        setLoading(true); // Show loading icon

        // Emit the language change event to the server
        socket.emit('changeLanguage', { language: newLanguage }, (response) => {
            console.log('Server response:', response); // Debugging log
            if (response.success) {
                console.log('Language changed successfully:', response.data);
            } else {
                console.error('Error changing language:', response.error);
            }
            setLoading(false); // Hide loading icon
        });
    };
    // const handleLanguageChange = async (event) => {
    //     setSelectedLanguage(event.target.value);
    //     setLoading(true); // Show loading icon
    //     try {
    //         const response = await axios.post('http://localhost:4000/messages/translate', {
    //             language: event.target.value,
    //         });
    //
    //         console.log(event.target.value); // Handle success response
    //         setLoading(false); // Show loading icon
    //
    //     } catch (error) {
    //         console.error('Error:', error); // Handle error
    //     }
    //
    // };
    const handleInputQuestion = (event) => {
        setsingleQuestion(event.target.value)
    }
    const getButtonClass = (category) => {
        return category === activeCategory
            ? 'rounded-full font-bold py-1 px-4 text-sm bg-[#002a50] text-[#FFFFFF] rounded border border-[#f0f0f0]'
            : 'rounded-full font-bold py-1 px-4 text-sm bg-[#001835] text-[#FFFFFF] rounded border border-white hover:bg-[#002a50] hover:border-[#f0f0f0]';
    };
    const handleDateFormatPrint = (date) =>{
        const baseDate = new Date(date); // Set your static base date here
        const formattedDates = getFormattedRelativeDate(baseDate);
        return formattedDates
    }
    // Initialize socket connection
    const socket = io('http://localhost:4000');

    useEffect(() => {

        socket.on('connect', () => {
            console.log('Connected to the server');
        });

        socket.on('disconnect', () => {
            alert('Disconnected from the server');
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        fetchMessages();
    }, []);
    useEffect(() => {
        fetchMessages();
    }, [loading]);
    useEffect(() => {
        if (messages.length > 0) { // Check if messages exist to prevent errors
            scrollToBottom();
        }
    }, [messages]);

    return (
        <>
            <div className="h-screen">
                <div className="container mx-auto h-full relative">
                    <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                        <div className="md:col-span-9  overflow-y-auto h-full relative">
                            <div className="bg-[#002046]  shadow-lg p-4 flex flex-col h-full relative">
                                <div className="bg-[#001835] text-[#FFFFFF] text-center	 -m-4 -mt-5 p-4 mt-0 flex justify-between items-center">
                                    <h1 className="text-lg font-bold ">Fitness Pro</h1>
                                </div>
                                {loading && ( // Show loading icon if loading is true
                                    <div className="flex items-center justify-center  absolute inset-0">
                                        <svg
                                            className="animate-spin h-8 w-8 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.07 7.745l1.458.805A6 6 0 105 18.5v-1.209zM20 12h-4a8.001 8.001 0 01-7.07 4.455l1.457-.805A6 6 0 1019 11.5v1.209z"
                                            ></path>
                                        </svg>
                                    </div>
                                )}
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
                                        <div className="flex-1 overflow-y-auto mt-8">
                                            {/* Chat messages */}
                                            {messages.map((message, index) => (
                                                <>
                                                    <div className="flex items-start mb-4">
                                                        <img
                                                            className="w-10 h-10 rounded-full mr-3"
                                                            src="https://via.placeholder.com/40"
                                                            alt="Sender"
                                                        />
                                                        <div>
                                                            <div className="bg-[#001835] text-[#FFFFFF] rounded-lg text-sm" style={{ padding: '10px' }}>
                                                                <p>{message.question}</p>
                                                            </div>
                                                            <span className="text-xs text-gray-500">
                                                                <div style={{ cursor: 'pointer', display: 'inline-block' }} className={'pr-2'}>
                                                                    {message.flag === 'seen' ? (
                                                                        <FontAwesomeIcon icon={faCheckDouble} style={{ color: '#f9c604' }} />
                                                                    ) : (
                                                                        <FontAwesomeIcon icon={faCheck} />
                                                                    )}
                                                                </div>
                                                                {formatTime(message.time)}, {handleDateFormatPrint(message.date)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start mb-4 justify-end">
                                                        <div className="text-right">
                                                            <div className="bg-[#001835] text-[#FFFFFF] rounded-lg" style={{ padding: '10px' }}>
                                                                <div className={'text-start'} dangerouslySetInnerHTML={{ __html: message.answer }}></div>
                                                            </div>
                                                            <span className="text-xs text-gray-500">
                                                                 <div style={{ cursor: 'pointer', display: 'inline-block' }} className={'pr-2'}>
                                                                    {message.flag === 'seen' ? (
                                                                        <FontAwesomeIcon icon={faCheckDouble} style={{ color: '#f9c604' }} />
                                                                    ) : (
                                                                        <FontAwesomeIcon icon={faCheck} />
                                                                    )}
                                                                </div>
                                                                {formatTime(message.time)}, {handleDateFormatPrint(message.date)}
                                                            </span>
                                                        </div>
                                                        <img
                                                            className="w-10 h-10 rounded-full ml-3"
                                                            src="https://via.placeholder.com/40"
                                                            alt="Receiver"
                                                        />
                                                    </div>
                                                </>
                                            ))}

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
                                                    className="rounded-full py-1 px-4 text-sm bg-[#001835] text-[#FFFFFF]  m-1 rounded border border-white hover:bg-[#002a50] hover:border-[#f0f0f0]"
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
                                                disabled={uservisit}
                                                onChange={handleInputQuestion}
                                                value={singleQuestion}
                                            />
                                            <button
                                                className="absolute right-0 top-0 bg-blue-500 text-white p-2 rounded-full"
                                                style={{ padding: '9px' }}
                                                disabled={uservisit}
                                                onClick={() => handleQuestionClick(singleQuestion)}
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
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                value="chinese"
                                                checked={selectedLanguage === 'chinese'}
                                                onChange={handleLanguageChange}
                                            />
                                            <span className="ml-2 text-[#FFFFFF]">Chinese</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                value="persian"
                                                checked={selectedLanguage === 'persian'}
                                                onChange={handleLanguageChange}
                                            />
                                            <span className="ml-2 text-[#FFFFFF]">Persian</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                value="arabic"
                                                checked={selectedLanguage === 'arabic'}
                                                onChange={handleLanguageChange}
                                            />
                                            <span className="ml-2 text-[#FFFFFF]">Arabic</span>
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
