import { React, useEffect, useState, useContext } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import { UserContext } from '../../components/states/contexts/UserContext';
import { TokenService } from '../../helpers/StorageServices';
import ApiService from '../../helpers/ApiServices';

const Logout = () => {
    let navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const [show, setShow] = useState(false);
    const [errorShow, seterrorShow] = useState("Your email or password is incorrect! Please try again.");
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
                    console.log("response", response.data.document);
                    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.document });
                    navigate('/')

                } else {
                    setShow(true)
                    seterrorShow("this user does not have the access to login. Please contact with administrator.")
                    // alert("this user does not have the access to login. Please contact with administrator.")
                }

            } else {
                setShow(true)
                dispatch({ type: "LOGIN_FAILURE" });
            }

        } catch (error) {
            setShow(true)
            dispatch({ type: "LOGIN_FAILURE" });
        }

    }



    useEffect(() => {
        window.location.replace('https://auth.pctflex.com/logout')
        //window.location.replace('http://localhost:3001/')

        // isLogged();

    }, []);



    return (
        <Container className='mt-4'>
            {/* <Alert variant={'success'}>
                You have logged out.
                <Alert.Link href="https://auth.pctflex.com/">Please login!</Alert.Link>
            </Alert> */}
        </Container>
    );
}

export default Logout;
