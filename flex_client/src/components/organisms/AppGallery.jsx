import { React, useState, useEffect, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie'
import { BsBank2, BsBuilding, BsGraphUp, BsBagCheckFill, BsPersonFill, BsFillGearFill } from 'react-icons/bs';
import { MdPointOfSale, MdPrecisionManufacturing, MdOutlineDashboardCustomize, MdOutlineSyncAlt, MdAppRegistration } from 'react-icons/md';
import { GrTasks, GrOptimize } from 'react-icons/gr'
import { DiAtom } from 'react-icons/di'
import { TbManualGearbox } from 'react-icons/tb'
import { MdSecurity } from 'react-icons/md'
import { AiOutlineFileText } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import ApiService from '../../helpers/ApiServices';
import { UserContext } from '../../components/states/contexts/UserContext';
import './appGallery.css';
import 'antd/dist/reset.css'
import AppLoader from '../../flex/flexComponent/AppLoader';
import { TokenService } from '../../helpers/StorageServices';


export default function AppGallery() {
    const [appList, setAppList] = useState(null);
    const [show, setShow] = useState(false);
    const [errorShow, seterrorShow] = useState("Your email or password is incorrect! Please try again.");
    const [loderStatus, setLoderStatus] = useState(null);
    const cookieObj = new Cookies();
    const { dispatch, user } = useContext(UserContext);

    const getApps = async () => {
        ApiService.setHeader();

        const response = await ApiService.get('appCenter');
        console.log(response);
        if (response.data.isSuccess) {
            setAppList(response.data.documents);
            setLoderStatus("SUCCESS");
        }
    }



    const getIcon = (name, color) => {
        switch (name) {
            case 'Accounting':
                return <BsBank2 style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Custom App':
                return <MdOutlineDashboardCustomize style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Employee':
                return <BsPersonFill style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Inventory':
                return <BsBuilding style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Manufacturing':
                return <MdPrecisionManufacturing style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'POS':
                return <MdPointOfSale style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Purchase':
                return <BsBagCheckFill style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Sales':
                return <BsGraphUp style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'RFQ':
                return <AiOutlineFileText style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Sync':
                return <MdOutlineSyncAlt style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'PMCLite':
                return <TbManualGearbox style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'PCTSecure':
                return <MdSecurity style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Settings':
                return <BsFillGearFill style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Project':
                return <GrTasks style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Connect':
                return <MdOutlineSyncAlt style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            case 'Nesting':
                return <GrOptimize style={{ color: `${color}`, fontSize: '3rem', marginTop: '10px' }} />
            default:
                return <MdAppRegistration style={{ color: `${color ? color : "#D1F2EB"}`, fontSize: '3rem', marginTop: '10px' }} />
        }
    }


    useEffect(() => {
        setLoderStatus("RUNNING");
        getApps();

    }, [])

    if (loderStatus === "RUNNING") {
        return (
            <AppLoader />
        )
    }

    return (
        <div className="appGallery">
            <Container fluid>
                <Row className="justify-content-md-center justify-content-center">
                    <Col className="appBoxes" xs={12} sm={12} md={11} lg={11} xl={10}>
                        {
                            appList && appList.map((app, idx) => {
                                return <Link key={idx} to={app.docType ? `/${app?.link}?navcenterid=${app.navCenterLink}&doctype=${app.docType}` : app?.link} className="link">
                                    <div className="appBox" style={{ backgroundColor: `${app.backgroundColor ? app.backgroundColor : "#D1F2EB"}`, }}>
                                        <div className="appBoxLogo">
                                            {getIcon(app.iconName, app.color)}
                                        </div>
                                        <div className="appBoxName" style={{ color: app?.color || "black" }}>{app.abbreviation}</div>
                                    </div>
                                </Link>
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
