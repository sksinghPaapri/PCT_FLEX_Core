import { React, useContext, useEffect } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import './home.css';

import { UserContext } from '../../components/states/contexts/UserContext';
import AppGallery from '../../components/organisms/AppGallery';
import ApiService from '../../helpers/ApiServices';
import constants from '../../helpers/Constants';

export default function Home() {

    const { dispatch, user } = useContext(UserContext)

    const handleLogout = async () => {


        ApiService.setHeader();
        ApiService.get(`employee/logout`).then(response => {
            const document = response;
            //console.log(document);
            // cookieObj.set("jwt", null, {
            //     domain: constants.DOMAIN
            // })
            //console.log("LOGOUT", cookieObj.get('jwt'), response);
            dispatch({ type: "LOGOUT_USER" });
        }).catch(e => {
            console.log(e.response?.data.message);

        })


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





    return (
        <Container className='p-0 m-0' fluid>
            <Navbar className='p-0 m-0' collapseOnSelect style={{ backgroundColor: '#009999' }} variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">PCTFlex</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                        </Nav>
                        <Nav >
                            <Nav.Link href="/">
                                <div style={{ backgroundColor: generateRandomColor(), minWidth: '24px', minHeight: '24px', borderRadius: '50%', color: 'black', textAlign: 'center' }}>{user?.name && user?.name[0]}</div>
                            </Nav.Link>
                            <NavDropdown align='end' title={user?.name} id="nav-dropdown">
                                <NavDropdown.Item className="d-grid gap-2">
                                    <Button onClick={handleLogout} variant="primary" size="sm">Logout</Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid className='appContainer'>
                <Container style={{ maxWidth: '1100px' }}>
                    <AppGallery />
                </Container>

            </Container>

        </Container>
    )
}
