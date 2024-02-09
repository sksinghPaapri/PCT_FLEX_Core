import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nesting from './Nesting';
import NestingList from './NestingList'




export default function NestingApp() {

    return (
        <Routes>
            <Route path={`/`} element={<Nesting />} />
            {/* <Route path={`/list`} element={<NestingList />} />
            <Route path={`/add`} element={<Nesting />} />
            <Route path={`/edit/:id`} element={<Nesting />} /> */}
        </Routes>
    )
}
