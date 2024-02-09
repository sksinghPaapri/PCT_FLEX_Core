import { React, useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { BsGrid3X3GapFill, BsWifi } from 'react-icons/bs';
import { AppContainer, AppHeader, AppContentContainer } from '../../flex/flexBuilder/Index';
import _header from './data/_header.json';
import ApiService from '../../helpers/ApiServices';
import { UserContext } from '../../components/states/contexts/UserContext';
import EmployeeApp from '../../microapps/employeeApp/Index';
import RoleApp from '../../microapps/roleApp/Index';
import DepartmentApp from '../../microapps/departmentApp/Index';
import LocationApp from '../../microapps/locationApp/Index';
import JobPositionApp from '../../microapps/jobPositionApp/Index';




export default function EmployeeModule() {
    const { dispatch, user } = useContext(UserContext)
    const [appNavigationCenter, setAppNavigationCenter] = useState(null);


    const getAppNavigationCenter = async () => {
        const response = await ApiService.get('appNavigationCenter/query?navigationCenterId=nav_employee');
        if (response.data.isSuccess) {
            console.log(response.data.document)
            setAppNavigationCenter(response.data.document);
        }
    }

    const generateRandomColor = () => {
        // Generate random values for RGB (Red, Green, Blue)
        const red = Math.floor(Math.random() * 150) + 100; // Random value between 100 and 250
        const green = Math.floor(Math.random() * 150) + 100; // Random value between 100 and 250
        const blue = Math.floor(Math.random() * 150) + 100; // Random value between 100 and 250

        // Convert RGB values to hexadecimal
        const hexColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

        return hexColor;
    }


    useEffect(() => {


        getAppNavigationCenter();


    }, [])



    return (
        <AppContainer>
            <AppHeader>
                <Navbar className='p-0 m-0' collapseOnSelect style={{ backgroundColor: '#009999' }} variant="dark" expand="lg">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/"><BsGrid3X3GapFill style={{ marginTop: '-5px' }} /></Navbar.Brand>
                        <Navbar.Brand as={Link} to={`/${appNavigationCenter && appNavigationCenter?.baseRoute}`}>
                            {
                                appNavigationCenter && appNavigationCenter?.name
                            }
                        </Navbar.Brand>


                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                {
                                    appNavigationCenter &&
                                    appNavigationCenter?.navigations.map((navItem, index) => {


                                        if (navItem?.navigationType === "AppNavigationLink")
                                            return <Nav.Link active key={index} as={Link} to={`${navItem?.navigation?.baseRoute}`}>
                                                {navItem.navigation?.name}
                                            </Nav.Link>


                                        if (navItem?.navigationType === "AppNavigationCategory")
                                            return <NavDropdown active key={index} title={`${navItem?.navigation?.label}`} id="collasible-nav-dropdown">
                                                {
                                                    navItem?.navigation?.navigationItems.map((dropdownItem, index) => {
                                                        return <NavDropdown.Item key={index} as={Link} to={`${dropdownItem.baseRoute}`}>{dropdownItem.name}</NavDropdown.Item>


                                                    })
                                                }
                                            </NavDropdown>

                                    })
                                }
                            </Nav>


                            <Nav>
                                <Nav.Link href="#home">
                                    <div style={{ backgroundColor: generateRandomColor(), minWidth: '24px', minHeight: '24px', borderRadius: '50%', color: 'black', textAlign: 'center' }}>{user?.name[0]}</div>
                                </Nav.Link>
                                <Nav.Link>{user?.name}</Nav.Link>
                                <Nav.Link active><BsWifi /></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


            </AppHeader>
            <AppContentContainer>
                <Routes>
                    <Route path="/" element={<EmployeeApp />} />
                    <Route path="/employees*" element={<EmployeeApp />} />
                    <Route path="/roles*" element={<RoleApp />} />
                    <Route path="/departments*" element={<DepartmentApp />} />
                    <Route path="/locations*" element={<LocationApp />} />
                    {/* <Route path="/classes*" element={<ClassApp />} /> */}
                    <Route path="/jobpositions*" element={<JobPositionApp />} />
                </Routes>


            </AppContentContainer>
        </AppContainer>
    )
}