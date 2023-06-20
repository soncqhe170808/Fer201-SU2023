import { Col, Row} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../style/stylingSon.css"
export default function Header(){
    return(
        <Row className='Header'>
            <Col className="col-6 left">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive })=>(isActive?"Active-nav":"InActive-nav")}>Home Page</NavLink>
                    </li>
                </ul>
            </Col>
            <Col className="col-6 right">
                <ul>
                    <li>
                        <NavLink to="/PersonalProfile" className={({ isActive })=>(isActive?"Active-nav":"InActive-nav")}>Personal Profile</NavLink>
                    </li>
                </ul>
            </Col>
        </Row>
    );
}