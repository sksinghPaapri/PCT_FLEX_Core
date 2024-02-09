import { React, useState, useEffect } from 'react'
import { BsFillGearFill } from 'react-icons/bs'
import { Container, Nav, Col, Row, DropdownButton, Dropdown, ButtonGroup, Tabs, Tab, Breadcrumb } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { AppContentBody, AppContentForm, AppContentHeader } from '../../flex/flexBuilder/Index'


export default function Settings() {
    const [loderStatus, setLoderStatus] = useState(null);
    const [state, setState] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();
    const rootPath = location?.pathname?.split('/')[1]; // path of the module
    const { id } = useParams();
    const isAddMode = !id;
    const [searchParams] = useSearchParams();

    const { register, control, reset, handleSubmit, getValues, setValue, watch, formState: { errors } } = useForm();





    return (
        <AppContentForm>
            <AppContentHeader>
                <Container fluid>
                    <Row>
                        <Col className='p-0 ps-2'>
                            <Breadcrumb style={{ fontSize: '24px', marginBottom: '0 !important' }}>
                                <Breadcrumb.Item className='breadcrumb-item' linkAs={Link} linkProps={{ to: `/${rootPath}/roles/list` }}>   <div className='breadcrum-label'>SETTINGS</div></Breadcrumb.Item>

                            </Breadcrumb>
                        </Col>
                    </Row>

                </Container>

            </AppContentHeader>
            <AppContentBody>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">
                                        <BsFillGearFill /> Settings
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">First tab :32:  'reset' is assigned a value but never used           no-unused-vars
                                    Line 18:39:  'handleSubmit' is assigned a value but never used    no-unused-vars
                                    Line 18:53:  'getValues' is assigned a value but never used       no-unused-vars
                                    Line 18:64:  'setValue' is assigned a value but never used        no-unused-vars
                                    Line 18:74:  'watch' is assigned a value but never used           no-unused-vars
                                    Line 18:94:  'errors' is assigned a value but never used</Tab.Pane>
                                <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </AppContentBody>

        </AppContentForm>
    )
}
