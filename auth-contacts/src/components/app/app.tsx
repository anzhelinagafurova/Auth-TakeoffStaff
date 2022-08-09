import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../authPage/authPage';
import ContactPage from '../contactPage/contactPage';

import './app.scss';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/contacts" element={<ContactPage />} />
        </Routes>


    )
}

export default App;
