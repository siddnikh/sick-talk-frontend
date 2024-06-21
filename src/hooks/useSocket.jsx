import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { REACT_APP_API_URL } from '../../constants.json';

export const useSocket = () => {
    const socketRef = useRef();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if (token) {
            socketRef.current = io(REACT_APP_API_URL, {
                auth: {
                    token: token
                }
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    return socketRef.current;
};
