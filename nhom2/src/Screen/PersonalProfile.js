import { useEffect, useState } from "react";
import DefaultTemplate from "../Template/DefaultTemplate";
import "../style/stylingSon.css";
import { Col, Image, Row } from "react-bootstrap";
export default function PersonalProfile() {
  const [currUser, setCurrUser] = useState("");
  const [currUserId, setCurrUserId] = useState(3);

  useEffect(() => {
    // setCurrUserId(3); // Update the currUserId value using the setter function
    console.log(currUserId);
    fetch(`http://localhost:9990/user/${currUserId}`)
      .then((res) => res.json())
      .then((result) => {
        setCurrUser(result);
      });
  }, currUserId); // Include currUserId as a dependency in the useEffect dependency array

  return (
    <DefaultTemplate>
      <Row className="col-12 personalInfo">
        <Col className="Avatar col-6">
          <Image src={currUser.imgPath} className="img-fluid img" />
        </Col>
      </Row>
    </DefaultTemplate>
  );
}
