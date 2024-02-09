import { React, useState, useEffect } from 'react'
import { Container, Button, Col, Row, DropdownButton, Dropdown, ButtonGroup, Breadcrumb } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import ApiService from '../../helpers/ApiServices'
import { errorMessage } from '../../helpers/Utils'
import AppContentBody from '../../flex/flexBuilder/AppContentBody'
import AppContentForm from '../../flex/flexBuilder/AppContentForm'
import AppContentHeader from '../../flex/flexBuilder/AppContentHeader'
import AppLoader from '../../flex/flexComponent/AppLoader'
import TextArea from '../../flex/flexField/TextArea'
import TextField from '../../flex/flexField/TextField'

export default function JobPosition() {
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
        return ApiService.post('/jobPosition', data).then(response => {
            if (response.data.isSuccess) {
                navigate(`/${rootPath}/jobpositions/list`)
            }
        }).catch(e => {
            console.log(e.response?.data.message);
            errorMessage(e, null)
        })
    }

    const updateDocument = (id, data) => {
        ApiService.setHeader();
        return ApiService.patch(`/jobPosition/${id}`, data).then(response => {
            console.log(response.data)
            if (response.data.isSuccess) {
                navigate(`/${rootPath}/jobpositions/list`)
            }
        }).catch(e => {
            console.log(e.response?.data.message);
            //errorMessage(e, dispatch)
        })

    }

    const deleteDocument = () => {
        ApiService.setHeader();
        return ApiService.delete(`/jobPosition/${id}`).then(response => {
            if (response.status == 204) {
                navigate(`/${rootPath}/jobpositions/list`)
            }
        }).catch(e => {
            console.log(e.response.data.message);
            //errorMessage(e, dispatch)
        })
    }

    const findOneDocument = () => {
        ApiService.setHeader();
        return ApiService.get(`/jobPosition/${id}`).then(response => {
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
                                <Breadcrumb.Item className='breadcrumb-item' linkAs={Link} linkProps={{ to: `/${rootPath}/jobpositions/list` }}>   <div className='breadcrum-label'>JOB POSITIONS</div></Breadcrumb.Item>
                                {isAddMode ? <Breadcrumb.Item active>NEW</Breadcrumb.Item> : <Breadcrumb.Item active >
                                    {state?.name}
                                </Breadcrumb.Item>}
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '-10px' }}>
                        <Col className='p-0 ps-1'>
                            <Button type="submit" variant="primary" size="sm">SAVE</Button>{" "}
                            <Button as={Link} to={`/${rootPath}/jobpositions/list`} variant="secondary" size="sm">DISCARD</Button>
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
                                description: "Job Position or Job Title",
                                label: "JOB POSITION",
                                fieldId: "name",
                                placeholder: "",
                                required: true,
                                validationMessage: "Please enter the Job Position or Job Title!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />
                        <TextArea
                            register={register}
                            errors={errors}
                            field={{
                                description: "Job Description",
                                label: "JOB DESCRIPTION",
                                fieldId: "jobDescription",
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

            </AppContentBody>
        </AppContentForm>
    )
}
