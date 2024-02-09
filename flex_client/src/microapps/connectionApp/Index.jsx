import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Connection from './Connection';
import ConnectionList from './ConnectionList'




export default function ConnectionApp() {

    return (
        <Routes>
            <Route path={`/`} element={<ConnectionList />} />
            <Route path={`/list`} element={<ConnectionList />} />
            <Route path={`/add`} element={<Connection />} />
            <Route path={`/edit/:id`} element={<Connection />} />
        </Routes>
    )
}
