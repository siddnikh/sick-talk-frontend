import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useEffect } from 'react';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import ChatInterface from './components/Chat/ChatInterface';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <RedirectToChat />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/yourenotsupposedtobehere" element={<Register />} />
                    <Route path="/chat" element={<ChatInterface />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

const RedirectToChat = () => {
    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('sickuser'));
        if (storedUser) {
            navigate('/chat');
        } else if (currentPath !== '/yourenotsupposedtobehere') {
            navigate('/login');
        }
    }, [navigate, currentPath]); // Add currentPath to dependencies

    return null; // This component doesn't need to render anything
};

export default App;
