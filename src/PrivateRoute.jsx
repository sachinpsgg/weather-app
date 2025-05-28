import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {supabase} from "./lib/supabaseClient.js";

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    if (loading) return <div className="text-center text-white mt-20">Loading...</div>;

    return session ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
