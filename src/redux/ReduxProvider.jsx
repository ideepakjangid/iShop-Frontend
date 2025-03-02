"use client"
import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store'
import { Toaster } from 'react-hot-toast';

const ReduxProvider = ({children}) => {
    return (
        <Provider store={Store}>
            <Toaster />
            {children}
        </Provider>
    );
}

export default ReduxProvider;
