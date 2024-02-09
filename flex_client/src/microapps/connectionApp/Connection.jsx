import { React, useState, useEffect } from 'react'
import { Container, Button, Col, Row, DropdownButton, Dropdown, ButtonGroup, Breadcrumb, Tabs, Tab, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import ApiService from '../../helpers/ApiServices'
import { errorMessage } from '../../helpers/Utils'
import AppContentBody from '../../flex/flexBuilder/AppContentBody'
import AppContentForm from '../../flex/flexBuilder/AppContentForm'
import AppContentHeader from '../../flex/flexBuilder/AppContentHeader'
import AppLoader from '../../flex/flexComponent/AppLoader'
import CheckboxField from '../../flex/flexField/CheckboxField'
import NumberField from '../../flex/flexField/NumberField'
import TextArea from '../../flex/flexField/TextArea'
import TextField from '../../flex/flexField/TextField'

export default function Connection() {
    const [state, setState] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();
    const rootPath = location?.pathname?.split('/')[1];
    const { id } = useParams();
    const isAddMode = !id;
    const [searchParams] = useSearchParams();
    const [loderStatus, setLoderStatus] = useState(null);

    const { register, control, reset, handleSubmit, getValues, setValue, watch, formState: { errors } } = useForm();



    // Functions

    const onSubmit = (formData) => {
        console.log(formData);
        return isAddMode
            ? createDocument(formData)
            : updateDocument(id, formData);
    }

    const createDocument = (data) => {
        ApiService.setHeader();
        return ApiService.post('/connection', data).then(response => {
            if (response.data.isSuccess) {
                navigate(`/${rootPath}/connections/list`)
            }
        }).catch(e => {
            console.log(e.response?.data.message);
            errorMessage(e, null)
        })
    }

    const updateDocument = (id, data) => {
        ApiService.setHeader();
        return ApiService.patch(`/connection/${id}`, data).then(response => {
            console.log(response.data)
            if (response.data.isSuccess) {
                navigate(`/${rootPath}/connections/list`)
            }
        }).catch(e => {
            console.log(e.response?.data.message);
            //errorMessage(e, dispatch)
        })

    }

    const deleteDocument = () => {
        ApiService.setHeader();
        return ApiService.delete(`/connection/${id}`).then(response => {
            if (response.status == 204) {
                navigate(`/${rootPath}/connections/list`)
            }
        }).catch(e => {
            console.log(e.response.data.message);
            //errorMessage(e, dispatch)
        })
    }

    const findOneDocument = () => {
        ApiService.setHeader();
        return ApiService.get(`/connection/${id}`).then(response => {
            const document = response?.data.document;
            setState(document)
            reset(document);
            if (document.date) {
                setValue('date', document?.date.split("T")[0])
            }
            setLoderStatus("SUCCESS");
        }).catch(e => {
            console.log(e.response?.data.message);
            errorMessage(e, null)
        })

    }


    useEffect(() => {

        if (!isAddMode) {
            setLoderStatus("RUNNING");
            findOneDocument()
        }

    }, []);

    if (loderStatus === "RUNNING") {
        return (
            <AppLoader />
        )
    }


    return (
        <AppContentForm onSubmit={handleSubmit(onSubmit)}>
            <AppContentHeader>

                <Container fluid >
                    <Row>
                        <Col className='p-0 ps-2'>
                            <Breadcrumb style={{ fontSize: '24px', marginBottom: '0 !important' }}>
                                <Breadcrumb.Item className='breadcrumb-item' linkAs={Link} linkProps={{ to: `/${rootPath}/connections/list` }}>   <div className='breadcrum-label'>FLEX CONNECTIONS</div></Breadcrumb.Item>
                                {isAddMode ? <Breadcrumb.Item active>NEW</Breadcrumb.Item> : <Breadcrumb.Item active >
                                    {state?.accountId}
                                </Breadcrumb.Item>}
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '-10px' }}>
                        <Col className='p-0 ps-1'>
                            <Button type="submit" variant="primary" size="sm">SAVE</Button>{" "}
                            <Button as={Link} to={`/${rootPath}/connections/list`} variant="secondary" size="sm">DISCARD</Button>
                            {!isAddMode && <DropdownButton size="sm" as={ButtonGroup} variant="light" title="ACTION">
                                <Dropdown.Item onClick={deleteDocument} eventKey="4">Delete</Dropdown.Item>
                            </DropdownButton>}
                        </Col>
                    </Row>
                </Container>


            </AppContentHeader>
            <AppContentBody>
                {/* BODY FIELDS */}
                <Container fluid>
                    <Row>

                        <TextField
                            register={register}
                            errors={errors}
                            field={{
                                description: "Name of the company",
                                label: "CLIENT NAME",
                                fieldId: "name",
                                placeholder: "",
                                required: true,
                                validationMessage: "Please enter the Client name!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />

                        <TextField
                            register={register}
                            errors={errors}
                            field={{
                                description: "Account ID",
                                label: "ACCOUNT ID",
                                fieldId: "accountId",
                                placeholder: "",
                                // required: true,
                                // validationMessage: "Please enter the department name!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />

                        <TextField
                            register={register}
                            errors={errors}
                            field={{
                                description: "Application ID",
                                label: "APPLICTAION ID",
                                fieldId: "applicationId",
                                placeholder: "",
                                // required: true,
                                // validationMessage: "Please enter the department name!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />

                    </Row>


                    <Row>
                        <CheckboxField
                            register={register}
                            errors={errors}
                            field={{
                                description: "Indicate the user is active or not",
                                label: "ACTIVE",
                                fieldId: "isActive",
                                placeholder: "",
                                // required: true,
                                // validationMessage: "Please enter the address name!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />

                    </Row>
                </Container>

                {/* SUBTABS */}
                <Container className='mt-2' fluid>
                    <Tabs defaultActiveKey='accessTokens'>

                        <Tab eventKey="accessTokens" title="ACCESS TOKENS">
                            <Row>
                                <TextArea
                                    register={register}
                                    errors={errors}
                                    field={{
                                        description: "A value used by the consumer to identify itself to the service provider.",
                                        label: "CONSUMER KEY",
                                        fieldId: "consumerKey",
                                        placeholder: "",
                                        // required: true,
                                        // validationMessage: "Please enter the address name!"
                                    }}
                                    changeHandler={null}
                                    blurHandler={null}
                                />
                                <TextArea
                                    register={register}
                                    errors={errors}
                                    field={{
                                        description: "A secret used by the consumer to establish ownership of the consumer key.",
                                        label: "CONSUMER SECRET",
                                        fieldId: "consumerSecret",
                                        placeholder: "",
                                        // required: true,
                                        // validationMessage: "Please enter the address name!"
                                    }}
                                    changeHandler={null}
                                    blurHandler={null}
                                />
                                <TextArea
                                    register={register}
                                    errors={errors}
                                    field={{
                                        description: "Access token",
                                        label: "TOKEN KEY",
                                        fieldId: "tokenKey",
                                        placeholder: "",
                                        // required: true,
                                        // validationMessage: "Please enter the address name!"
                                    }}
                                    changeHandler={null}
                                    blurHandler={null}
                                />
                            </Row>
                            <Row>
                                <TextArea
                                    register={register}
                                    errors={errors}
                                    field={{
                                        description: "A secret used by the consumer to establish ownership of a given token.",
                                        label: "TOKEN SECRET",
                                        fieldId: "tokenSecret",
                                        placeholder: "",
                                        // required: true,
                                        // validationMessage: "Please enter the address name!"
                                    }}
                                    changeHandler={null}
                                    blurHandler={null}
                                />
                            </Row>

                        </Tab>
                    </Tabs>
                </Container>

            </AppContentBody>
        </AppContentForm>
    )
}
