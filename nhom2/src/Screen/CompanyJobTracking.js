import { Col, Row } from "react-bootstrap";
import CompanyJobList from "../Component/CompanyJobList";
import DefaultTemplate from "../Template/DefaultTemplate";

export default function CompanyJobTracking() {
  return (
    <DefaultTemplate>
      <Row>
        <Col className="CurrentJob" lg={10} style={{ margin: "30px auto"}}>
          <h4>Company's Job</h4>
          <CompanyJobList />
        </Col>
      </Row>
    </DefaultTemplate>
  );
}
