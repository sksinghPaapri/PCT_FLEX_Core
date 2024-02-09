import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Settings from './Settings'




export default function EmployeeApp() {

    return (
        <Routes>
            <Route path={`/`} element={<Settings />} />
        </Routes>
    )
}
