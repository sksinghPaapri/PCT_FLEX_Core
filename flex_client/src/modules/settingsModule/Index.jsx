import { React, useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { BsGrid3X3GapFill, BsWifi } from 'react-icons/bs';
import { AppContainer, AppHeader, AppContentContainer } from '../../flex/flexBuilder/Index';
import ApiService from '../../helpers/ApiServices';
import { UserContext } from '../../components/states/contexts/UserContext';
import SettingsApp from '../../microapps/settingsApp/Index';




export default function SettingsModule() {
    const { dispatch, user } = useContext(UserContext)
    const [appNavigationCenter, setAppNavigationCenter] = useState(null);


    const getAppNavigationCenter = async () => {
        const response = await ApiService.get('appNavigationCenter/query?navigationCenterId=nav_settings');
        if (response.data.isSuccess) {
            console.log(response.data.document)
            setAppNavigationCenter(response.data.document);
        }
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
                                    <div style={{ backgroundColor: 'white', minWidth: '24px', minHeight: '24px', borderRadius: '50%', color: 'black', textAlign: 'center' }}>{user?.name[0]}</div>
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
                    <Route path="/" element={<SettingsApp />} />
                    <Route path="/settings*" element={<SettingsApp />} />

                </Routes>


            </AppContentContainer>
        </AppContainer>
    )
}