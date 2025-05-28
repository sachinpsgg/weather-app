import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './Router.jsx';
import { WeatherProvider } from './context/WeatherContext.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Toaster} from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <WeatherProvider>
                <AppRouter />
                <Toaster />
            </WeatherProvider>
        </QueryClientProvider>
    </StrictMode>
);
