import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Await, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [currUser, setCurrUser] = useState({});
  const [UserList, setUserList] = useState([]);
  const email = useRef(null);
  const password = useRef(null);
  useEffect(() => {
    // setCurrUserId(3); // Update the currUserId value using the setter function
    fetch(`http://localhost:9999/user`)
      .then((res) => res.json())
      .then((result) => {
        setUserList(result);
      });
  }, []);
  const HandleLogin = (e) => {
    e.preventDefault();
    let found = false;
    UserList.map((u) => {
      if (
        u.email === email.current.value &&
        u.password === password.current.value
      ) {
        found = true;
        sessionStorage.setItem("currUser", JSON.stringify(u));
        console.log(JSON.parse(sessionStorage.getItem("currUser")).Name);
      }
    });
    if (found == true) {
      toast.success("Login Succcessfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error("Incorrect username and password");
    }
  };
  return (
    <Row>
      <ToastContainer />
      <Col lg={5} style={{ padding: "0" }}>
        <img
          style={{ width: "100%", height: "655px", opacity: "0.5" }}
          src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/351134511_142774508812224_2488140573410464167_n.jpg?_nc_cat=103&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=l1EXzMI2MSEAX_ncXyL&_nc_ht=scontent.fhan15-2.fna&oh=00_AfBxwK1OI6tRWupW6czSD_VUOGMt0qKiJxkRAboxTbGpbw&oe=64B8923D"
        />
      </Col>
      <Col lg={7}>
        <div
          className="col-lg-9"
          style={{
            margin: "0 auto",
            backgroundColor: "#f4f4eb",
            height: "500px",
            marginTop: "100px",
            borderRadius: "15px",
            boxShadow: "10px 10px #b3b3b1",
            padding: "70px"
          }}
        >
          <form className="Auth-form">
            <ToastContainer />
            <div>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary">
                  <Link to={"/register"} className="nav-link">
                    Create account
                  </Link>
                </span>
              </div>
              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  ref={email}
                />
              </div>
              <div className="form-group mt-3">

                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  ref={password}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                style={{backgroundColor: "#92d35e", border: "none"}}
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => HandleLogin(e)}
                >
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      </Col>
      {/* <div>
      <form className="Auth-form">
        <ToastContainer />
        <div>
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary">
              <Link to={"/register"} className="nav-link">
                Create account
              </Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              ref={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              ref={password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => HandleLogin(e)}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> 
         </div>
      </form>
    </div> */}
    </Row>
  );
}
