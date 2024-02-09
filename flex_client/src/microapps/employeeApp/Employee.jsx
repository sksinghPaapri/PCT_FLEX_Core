import { React, useState, useEffect, useContext } from 'react'
import { Container, Button, Col, Row, Form, DropdownButton, Dropdown, ButtonGroup, Tabs, Tab, Breadcrumb } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import ApiService from '../../helpers/ApiServices'
import { UserContext } from '../../components/states/contexts/UserContext';
import { errorMessage } from '../../helpers/Utils'
import AppContentBody from '../../flex/flexBuilder/AppContentBody'
import AppContentForm from '../../flex/flexBuilder/AppContentForm'
import AppContentHeader from '../../flex/flexBuilder/AppContentHeader'
import SelectField from '../../flex/flexField/SelectField'
import TextArea from '../../flex/flexField/TextArea'
import TextField from '../../flex/flexField/TextField'
import EmailField from '../../flex/flexField/EmailField'
import CheckboxField from '../../flex/flexField/CheckboxField'
import PasswordField from '../../flex/flexField/PasswordField'
import DateField from '../../flex/flexField/DateField'
import LogHistories from '../../flex/flexComponent/LogHistories'
import AppLoader from '../../flex/flexComponent/AppLoader'



export default function Employee() {
    const [loderStatus, setLoderStatus] = useState(null);
    const { dispatch, user } = useContext(UserContext)
    const [state, setState] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();
    const rootPath = location?.pathname?.split('/')[1];
    const { id } = useParams();
    const isAddMode = !id;
    const [searchParams] = useSearchParams();

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
        return ApiService.post('/employee', data).then(response => {
            if (response.data.isSuccess) {
                navigate(`/${rootPath}/employees/list`)
            }
        }).catch(e => {
            console.log(e.response?.data.message);
            errorMessage(e, null)
        })
    }

    const updateDocument = (id, data) => {
        ApiService.setHeader();
        return ApiService.patch(`/employee/${id}`, data).then(response => {
            console.log(response.data)
            if (response.data.isSuccess) {
                navigate(`/${rootPath}/employees/list`)
            }
        }).catch(e => {
            console.log(e.response?.data.message);
            //errorMessage(e, dispatch)
        })

    }

    const deleteDocument = () => {
        ApiService.setHeader();
        return ApiService.delete(`/employee/${id}`).then(response => {
            if (response.status == 204) {
                navigate(`/${rootPath}/employees/list`)
            }
        }).catch(e => {
            console.log(e.response.data.message);
            //errorMessage(e, dispatch)
        })
    }

    const findOneDocument = () => {
        ApiService.setHeader();
        return ApiService.get(`/employee/${id}`).then(response => {
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

    }, [id]);


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
                                <Breadcrumb.Item className='breadcrumb-item' linkAs={Link} linkProps={{ to: `/${rootPath}/employees/list` }}>   <div className='breadcrum-label'>EMPLOYEES</div></Breadcrumb.Item>
                                {isAddMode ? <Breadcrumb.Item active>NEW</Breadcrumb.Item> : <Breadcrumb.Item active >
                                    {state?.name}
                                </Breadcrumb.Item>}
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '-10px' }}>
                        <Col className='p-0 ps-1'>
                            <Button type="submit" variant="primary" size="sm">SAVE</Button>{" "}
                            <Button as={Link} to={`/${rootPath}/employees/list`} variant="secondary" size="sm">DISCARD</Button>
                            {!isAddMode && <DropdownButton size="sm" as={ButtonGroup} variant="light" title="ACTION">
                                <Dropdown.Item onClick={deleteDocument} eventKey="4">Delete</Dropdown.Item>
                            </DropdownButton>}
                        </Col>
                    </Row>
                </Container>


            </AppContentHeader>
            <AppContentBody>
                {/* BODY FIELDS */}
                <Container className='mt-1' fluid>
                    <Row>

                        <TextField
                            register={register}
                            errors={errors}
                            field={{
                                description: "First Name of the Employee.",
                                label: "FIRST NAME",
                                fieldId: "firstName",
                                placeholder: "",
                                required: true,
                                validationMessage: "Please enter the First Name of the employee!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />
                        <TextField
                            register={register}
                            errors={errors}
                            field={{
                                description: "Last Name of the Employee.",
                                label: "LAST NAME",
                                fieldId: "lastName",
                                placeholder: "",
                                required: true,
                                validationMessage: "Please enter the Last Name of the employee!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />

                        <SelectField
                            control={control}
                            errors={errors}
                            field={{
                                description: "",
                                label: "JOB POSITION",
                                fieldId: "jobPosition",
                                placeholder: "",
                                selectRecordType: "jobPosition",
                                multiple: false
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />

                        <TextField
                            register={register}
                            errors={errors}
                            field={{
                                description: "Phone number of the Employee.",
                                label: "PHONE NUMBER",
                                fieldId: "phone",
                                placeholder: "",
                                // required: true,
                                // validationMessage: "Please enter the Last Name of the employee!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />

                        <EmailField
                            register={register}
                            errors={errors}
                            field={{
                                description: "Email of the Employee.",
                                label: "EMAIL",
                                fieldId: "email",
                                placeholder: "",
                                required: true,
                                validationMessage: "Please enter the Email of the employee!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />
                        <TextArea
                            register={register}
                            errors={errors}
                            field={{
                                description: "Address",
                                label: "ADDRESS",
                                fieldId: "address",
                                placeholder: "",
                                // required: true,
                                // validationMessage: "Please enter the address name!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />

                        <SelectField
                            control={control}
                            errors={errors}
                            field={{
                                description: "Supervisor of the Employee.",
                                label: "SUPERVISOR",
                                fieldId: "supervisor",
                                placeholder: "",
                                selectRecordType: "employee",
                                multiple: false
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />
                    </Row>
                </Container>

                {/* SUBTABS */}
                <Container className='mt-2' fluid>
                    <Tabs defaultActiveKey='privateInformation'>
                        <Tab eventKey="privateInformation" title="PRIVATE INFORMATIONS">
                            <Container className="mt-2" fluid>
                                <Row>
                                    <SelectField
                                        control={control}
                                        errors={errors}
                                        field={{
                                            description: "Roles",
                                            label: "ROLES",
                                            fieldId: "roles",
                                            placeholder: "",
                                            // required: true,
                                            // validationMessage: "Please enter the department name!",
                                            selectRecordType: "role",
                                            multiple: true
                                        }}
                                        changeHandler={null}
                                        blurHandler={null}
                                    />


                                    <CheckboxField
                                        register={register}
                                        errors={errors}
                                        field={{
                                            description: "Give Access to the Employee.",
                                            label: "GIVE ACCESS",
                                            fieldId: "giveAccess",
                                            placeholder: "",
                                            // required: true,
                                            // validationMessage: "Please enter the Email of the employee!"
                                        }}
                                        changeHandler={null}
                                        blurHandler={null}
                                    />

                                    {/* {!isAddMode && user.id == id && <Form.Group as={Col} md="4" className="mb-2">
                                        <Form.Label className="m-0"> {" "}</Form.Label><br />
                                        <Button as={Link} to={`/${rootPath}/employees/changepassword/${id}`} size="sm">Change Password</Button>
                                    </Form.Group>} */}

                                    {isAddMode && <PasswordField
                                        register={register}
                                        errors={errors}
                                        field={{
                                            description: "Password",
                                            label: "PASSWORD",
                                            fieldId: "password",
                                            placeholder: "",
                                            // required: true,
                                            // validationMessage: "Please enter the Last Name of the employee!"
                                        }}
                                        changeHandler={null}
                                        blurHandler={null}
                                    />}

                                    {isAddMode && <PasswordField
                                        register={register}
                                        errors={errors}
                                        field={{
                                            description: "Password Confirm",
                                            label: "PASSWORD CONFIRM",
                                            fieldId: "passwordConfirm",
                                            placeholder: "",
                                            // required: true,
                                            // validationMessage: "Please enter the Last Name of the employee!"
                                        }}
                                        changeHandler={null}
                                        blurHandler={null}
                                    />}


                                </Row>
                            </Container>
                        </Tab>
                        <Tab eventKey="workInformation" title="WORK INFORMATIONS">
                            <Container className="mt-2" fluid>
                                <Row>
                                    <SelectField
                                        control={control}
                                        errors={errors}
                                        field={{
                                            description: "Location",
                                            label: "LOCATION",
                                            fieldId: "location",
                                            placeholder: "",
                                            // required: true,
                                            // validationMessage: "Please enter the department name!",
                                            selectRecordType: "location",
                                            multiple: false
                                        }}
                                        changeHandler={null}
                                        blurHandler={null}
                                    />
                                    <SelectField
                                        control={control}
                                        errors={errors}
                                        field={{
                                            description: "Department",
                                            label: "DEPARTMENT",
                                            fieldId: "department",
                                            placeholder: "",
                                            // required: true,
                                            // validationMessage: "Please enter the department name!",
                                            selectRecordType: "department",
                                            multiple: false
                                        }}
                                        changeHandler={null}
                                        blurHandler={null}
                                    />

                                </Row>
                            </Container>
                        </Tab>
                        {/* {!isAddMode && <Tab eventKey="auditTrail" title="AUDIT TRAIL">
                            <Container className="mt-2" fluid>
                                <Row>

                                </Row>
                                {!isAddMode && <LogHistories documentPath={"employee"} documentId={id} />}
                            </Container>
                        </Tab>} */}


                    </Tabs>

                </Container>

            </AppContentBody>
        </AppContentForm>
    )
}
