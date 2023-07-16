import { Col, Row } from "react-bootstrap";
import CompanyJobList from "../Component/CompanyJobList";
import DefaultTemplate from "../Template/DefaultTemplate";
import { Link } from "react-router-dom";

export default function CompanyJobTracking() {
  return (
    <DefaultTemplate>
      <Row>
        <Col className="CurrentJob" lg={10} style={{ margin: "30px auto" }}>
          <Row style={{ display: "flex" }}>
            <h4 className="col-lg-6">Company's Job</h4>
            <div className="col-lg-6" style={{
                  textAlign: "right",
                  
                }}>
              <Link
                style={{
                  textAlign: "right",
                  textDecoration: "none",
                  color: "white",
                  padding: "10px 15px",
                  backgroundColor: "#92d35e",
                  borderRadius: "10px"
                }}
                to={"/AddJobScreen"}
              >
                Add Job
              </Link>
            </div>
          </Row>
          <CompanyJobList />
        </Col>
      </Row>
    </DefaultTemplate>
  );
}
