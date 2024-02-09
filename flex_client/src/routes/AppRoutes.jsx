import { React, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from '../components/states/contexts/UserContext';

import EmployeeModule from '../modules/employee/Index';
import CustomAppModule from '../modules/customApp/Index'
import CustomMicroAppModule from '../modules/customMicroApp/Index';

import Department from '../microapps/departmentApp/Department';

import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Logout from '../pages/logout/Logout';
import ConnectionModule from '../modules/connectionModule/Index';
import SettingsModule from '../modules/settingsModule/Index';
import NestingModule from '../modules/nestingModule/Index';

const AppRoutes = () => {
    const { user } = useContext(UserContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={<Login />} />
                <Route path="/*" element={user ? <Home /> : <Logout />} />
                <Route path='/employee/*' element={<EmployeeModule />} />
                <Route path='/customapps/*' element={<CustomAppModule />} />
                <Route path='custommicroapp/*' element={<CustomMicroAppModule />} />
                <Route path='document/department/*' element={<Department />} />
                <Route path='/connections/*' element={<ConnectionModule />} />
                <Route path='/settings/*' element={<SettingsModule />} />
                <Route path='/nesting/*' element={<NestingModule />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
