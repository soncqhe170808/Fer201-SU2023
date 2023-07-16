import { Col, Container, Row } from "react-bootstrap";
import Header from "../Component/Header";
import Login from "../Component/Auth";

export default function LoginScreen(){
    return(
        <Container fluid>
            <Header/>
            <Row>
                <Col>
                    <Login/>
                </Col>
            </Row>
        </Container>
    );

}