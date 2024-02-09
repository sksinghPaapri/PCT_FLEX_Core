import { React, useContext, useState, useEffect } from 'react';
import './login.css';
import { Container } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../components/states/contexts/UserContext';
import ApiService from '../../helpers/ApiServices';
import { TokenService } from '../../helpers/StorageServices';


export default function Login() {
    let navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const [show, setShow] = useState(false);
    const [errorShow, seterrorShow] = useState("You dont have access to this account!");
    const { dispatch, isFetching } = useContext(UserContext)

    console.log(searchParams.get("flexAuth"));



    const isLogged = async () => {


        TokenService.saveToken(searchParams.get("flexAuth"))
        ApiService.setHeader();
        try {
            setShow(false)
            dispatch({ type: "LOGIN_START" });
            const response = await ApiService.post('employee/authLogin', {});

            console.log("response", response);
            if (response.data.isSuccess) {

                if (response?.data.document.giveAccess) {
                    console.log("World")
                    console.log("response", response.data.document);
                    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.document });
                    navigate('/')

                } else {
                    console.log("Hello")
                    setShow(true)
                    //seterrorShow("This user does not have the access to login. Please contact with administrator.")
                    // alert("this user does not have the access to login. Please contact with administrator.")
                }

            } else {
                setShow(true)
                dispatch({ type: "LOGIN_FAILURE" });
                navigate('/logout')
            }

        } catch (error) {
            setShow(true)
            dispatch({ type: "LOGIN_FAILURE" });
            navigate('/logout')
        }

    }



    useEffect(() => {
        isLogged();
    }, []);



    return (
        <div className="loginPage">
            <Container className="loginForm">

                <div className="loading-text">
                    {!show ? "Just a moment, we're getting flex ready for you..." : "You dont have access to this account! Please contact to your administrator."}
                </div>

            </Container>
        </div>
    )
}
