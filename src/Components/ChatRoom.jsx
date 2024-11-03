import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { database } from './FirebaseConfig';
import { ref, push, onValue, update, remove } from "firebase/database";
import './Chat.css';

function ChatRoom() {
    const [name, setName] = useState('');
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false); // Loader state
    const navigate = useNavigate(); // For navigation

    const dbRef = ref(database, 'chats');

    // Logout function with loader and redirect
    const handleLogout = () => {
        
        setTimeout(() => {
            
            navigate('/'); // Redirect after 2 seconds
        }, 2000);
    };

    // Function to send or edit chat messages
    const setCh = () => {
        if (name && message) {
            if (editId) {
                update(ref(database, `chats/${editId}`), { name, message });
                setEditId(null);
            } else {
                push(dbRef, { name, message });
            }
            setMessage('');
        }
    };

    // Function to delete a message
    const deleteMessage = (id) => {
        remove(ref(database, `chats/${id}`));
    };

    // Function to initiate edit of a message
    const editMessage = (id, currentMessage) => {
        setMessage(currentMessage);
        setEditId(id);
    };

    // Fetch chat messages in real-time
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedChats = Object.entries(data).map(([id, chat]) => ({ id, ...chat }));
                setChats(loadedChats);
            }
        });
    }, []);

    return (
        <div className='main'>
            {loading ? (
                <div className="loader">Logging out...</div>
            ) : (
                <>
                    <header className="header">
                        <h1>Chat Room</h1>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </header>

                    {name && <div className="welcome-message">Welcome, {name}!</div>}

                    <div className="name-input">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="chat-container">
                        {chats.map((c) => (
                            <div key={c.id} className={`container ${c.name === name ? 'me' : ''}`}>
                                <p className='chat-box'>
                                    <strong>{c.name}</strong>
                                    <span>{c.message}</span>
                                </p>
                                {c.name === name && (
                                    <div className="message-actions">
                                        <button onClick={() => editMessage(c.id, c.message)}>Edit</button>
                                        <button onClick={() => deleteMessage(c.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="input">
                        <input
                            type="text"
                            placeholder='Enter Your Message:'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <button onClick={setCh}>{editId ? 'Update' : 'Send'}</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ChatRoom;
