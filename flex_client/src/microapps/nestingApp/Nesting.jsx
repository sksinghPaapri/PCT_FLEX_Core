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
import TextArea from '../../flex/flexField/TextArea'
import TextField from '../../flex/flexField/TextField'
import axios from 'axios'

export default function Nesting() {
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

    const stringToArray = (string) => {
        // Remove '[' and ']' characters from the string
        string = string.replace(/\[|\]/g, '');
        // Split the string by ',' to get individual numbers
        var numbers = string.split(',');
        // Convert each number from string to integer and store in the array
        var array = numbers.map(function (num) {
            return parseInt(num);
        });
        return array;
    }

    const optimizeCutHandler = () => {

        const stockBars = getValues('stockBars')
        const requireBars = getValues('requireBars')

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "stockBars": stringToArray(stockBars),
            "requireBars": stringToArray(requireBars),
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://1003.app.pctflex.com", requestOptions)
            .then(response => response.text())
            .then(result => {
                setValue('results', result)
            })
            .catch(error => alert("Internal Server Error"));



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
                                <Breadcrumb.Item className='breadcrumb-item' linkAs={Link} linkProps={{ to: `/${rootPath}/connections/list` }}>   <div className='breadcrum-label'>PCT NESTING</div></Breadcrumb.Item>
                                {isAddMode ? <Breadcrumb.Item active>TEST</Breadcrumb.Item> : <Breadcrumb.Item active >
                                    {state?.accountId}
                                </Breadcrumb.Item>}
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '-10px' }}>
                        <Col className='p-0 ps-1'>
                            {/* <Button type="submit" variant="primary" size="sm">SAVE</Button>{" "} */}
                            <Button onClick={optimizeCutHandler} variant="secondary" size="sm">GET OPTIMIZED DATA</Button>
                            {/* {!isAddMode && <DropdownButton size="sm" as={ButtonGroup} variant="light" title="ACTION">
                                <Dropdown.Item onClick={deleteDocument} eventKey="4">Delete</Dropdown.Item>
                            </DropdownButton>} */}
                        </Col>
                    </Row>
                </Container>


            </AppContentHeader>
            <AppContentBody>
                {/* BODY FIELDS */}
                <Container fluid>
                    <Row>
                        <TextArea
                            register={register}
                            errors={errors}
                            field={{
                                description: "Write array of number like [2, 5, 10, ...]",
                                label: "STOCK BARS",
                                fieldId: "stockBars",
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
                                description: "Write array of number like [2, 5, 10, ...]",
                                label: "REQUIRE BARS",
                                fieldId: "requireBars",
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
                                description: "",
                                label: "RESULTS",
                                fieldId: "results",
                                placeholder: "",
                                // required: true,
                                // validationMessage: "Please enter the address name!"
                            }}
                            changeHandler={null}
                            blurHandler={null}
                        />
                    </Row>



                </Container>

            </AppContentBody>
        </AppContentForm>
    )
}
