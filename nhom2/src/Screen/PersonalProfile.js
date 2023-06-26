import { useEffect, useState } from "react";
import DefaultTemplate from "../Template/DefaultTemplate";
import "../style/stylingSon.css";
import { Col, Form, Image, Row } from "react-bootstrap";
export default function PersonalProfile() {
  const [currUser, setCurrUser] = useState("");
  const [currUserId, setCurrUserId] = useState(3);
  const [role, setRole] = useState(0);
  const [isEditable, setIsEditable] = useState(currUser.Name);
  const 
  useEffect(() => {
    // setCurrUserId(3); // Update the currUserId value using the setter function
    console.log(currUserId);
    fetch(`http://localhost:9990/user/${currUserId}`)
      .then((res) => res.json())
      .then((result) => {
        setCurrUser(result);
        
      });
  }, currUserId); // Include currUserId as a dependency in the useEffect dependency array
  useEffect(() => {
    // setCurrUserId(3); // Update the currUserId value using the setter function

    fetch(`http://localhost:9990/Role/${currUser.RoleId}`)
      .then((res) => res.json())
      .then((result) => {
        setRole(result);
      });
  }, currUser.RoleId);
  const edit = () =>{
    var input = document.getElementsByClassName("UserInfoInput");
    console.log(input.length)
    for(var i = 0; i < input.length; i++){
      input[i].readOnly = false;
      console.log(input[i].readOnly);
    }

    // input.forEach(element => {
    //   element.style.border = element.style.border == "none" ? "black 1px solid" : "none"
    // });
    
  }
  return (
    <DefaultTemplate>
      <Row className="col-12 personalInfo">
        <Col className="Avatar col-lg-4 col-sm-12">
          {(() => {
            if (currUser.imgPath != null && currUser.img != "") {
              return <Image src={currUser.imgPath} />;
            } else {
              return (
                <Image
                  src={process.env.PUBLIC_URL + "asset/img/tempAvatar.jpg"}
                />
              );
            }
          })()}
          <div className="Quote">
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing el"</p>
          </div>
          <div className="EditProfileButton" onClick={()=>edit()}>
            <button>Edit Profile</button>
          </div>
        </Col>
        <Col className="UserInfo col-lg-8 col-sm-12">
          <div className="col-lg-10 UserInfoWrapper">
            <Form>
              <div className="InputField">
                <h3>UserName:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                <input className="UserInfoInput"
                  type="text"
                  value={currUser.Name}
                  style={{ marginLeft: "61px" }}
                  // readOnly={isEditable}
                />
              </div>
              <div className="InputField">
                <h3>Email:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                <input className="UserInfoInput"
                  type="text"
                  value={currUser.email}
                  style={{ marginLeft: "120px" }}
          
                />
              </div>
              {currUser.Info && (
                <div>
                  <div className="InputField">
                    <h3>Address:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <input className="UserInfoInput"
                      type="text"
                      value={currUser.Info.address}
                      style={{ marginLeft: "91px" }}
                      readOnly
                    />
                  </div>
                  <div className="InputField">
                    <h3>Phone Number:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <input className="UserInfoInput"
                      type="text" 
                      value={currUser.Info.phone}
                      style={{ marginLeft: "-2px" }}
                      readOnly
                    />
                  </div>
                  <div className="InputField Introduction">
                    <h3>Introduction:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <textarea readOnly value={currUser.Info.Introduction} />
                  </div>
                </div>
              )}
              <div className="InputField">
                <h3>Online Cv:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                <input className="UserInfoInput"
                  type="text"
                  value={currUser.OnlineCv}
                  style={{ marginLeft: "70px", color: "#1098dc" }}
                  readOnly
                />
              </div>
              <div className="InputField">
                <h3>Role:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                <p>{role.RoleText}</p>
              </div>
              <div className="EditProfileButton" style={{display:"none"}}>
                <button>Save</button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </DefaultTemplate>
  );
}
