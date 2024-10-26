// pages/chat.js
import React, { useState, useEffect, useRef } from 'react';

const ChatPage = () => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatRef = useRef(null); // Ref for the chat container

    useEffect(() => {
        // Auto-scroll to the bottom when responses change
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [responses]);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate a dummy scroll effect by adding a small delay
        const dummyResponse = { user: userInput, bot: '...' }; // Initial bot response placeholder
        setResponses((prev) => [...prev, dummyResponse]);
        setUserInput('');

        // Simulate delay for generating a response
        setTimeout(async () => {
            try {
                const response = await fetch('http://localhost:8000/generate-text', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: userInput, max_length: 100, temperature: 0.7 }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setResponses((prev) => prev.map((r, index) => 
                    index === prev.length - 1 ? { user: r.user, bot: data.generated_text } : r
                ));
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }, 1000); // Simulate loading delay (adjust as needed)
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#121212', borderRadius: '12px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.7)' }}>
            <h1 style={{ textAlign: 'center', color: '#ffffff', marginBottom: '20px' }}>Chat with Llama 3.2</h1>
            <div ref={chatRef} style={{ height: '400px', overflowY: 'auto', marginBottom: '10px', padding: '15px', backgroundColor: '#1f1f1f', borderRadius: '12px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)' }}>
                {responses.map((r, index) => (
                    <div key={index} style={{ margin: '10px 0' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-block', backgroundColor: '#4CAF50', padding: '10px 15px', borderRadius: '20px', maxWidth: '75%', marginLeft: '15px', color: '#ffffff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)' }}>
                                <strong>You:</strong> {r.user}
                            </div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ display: 'inline-block', backgroundColor: '#3a3a3a', padding: '10px 15px', borderRadius: '20px', maxWidth: '75%', marginRight: '15px', color: '#ffffff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)' }}>
                                <strong>Llama:</strong> {r.bot}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <textarea
                    value={userInput}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Ask Your Finance related questions..."
                    style={{ width: '100%', borderRadius: '8px', padding: '10px', border: '1px solid #444', marginBottom: '10px', resize: 'none', backgroundColor: '#333', color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer', transition: 'background-color 0.3s', fontWeight: 'bold' }}>
                    {loading ? 'Generating...' : 'Send'}
                </button>
            </form>
            {loading && <p style={{ color: '#00bfff', textAlign: 'center', marginTop: '10px' }}>Generating response, please wait...</p>}
        </div>
    );
};

export default ChatPage;
