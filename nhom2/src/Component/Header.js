import { Col, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../style/stylingSon.css";
import "../style/main.css"
export default function Header() {
 
  // const checkLoggedIn = (e) =>{
  //   currUser = sessionStorage.getItem("currUser");
  //   if(currUser.role !== 1){
  //     alert("this functionality is not accessible");
  //     window.location.href = "/";
  //   }else{
  //     alert("welcome admin");
  //   }
  // }
  return (
    
    <Row className="Header">
       <div className="row mock">
      </div>
      {/* <Col className="col-6 left">
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
            </Col> */}
      <nav class="navbar navbar-expand-xl fixed-top">
        <div class="container">
          <a class="navbar-brand" href="/"><img className="w-100" src={process.env.PUBLIC_URL + 'asset/img/icon/company-logo.svg'} alt=""/></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-card-item">
                {/* <a class="nav-link  active" href="index.html">Home</a> */}
                <NavLink to="/" className={({ isActive })=>(isActive?"Active-nav":"InActive-nav")}>Home Page</NavLink>
              </li>
              <li class="nav-card-item">
                <a class="nav-link" href="aboutus.html">About</a>
              </li>
              <li class="nav-card-item">
                <a class="nav-link" href="contact.html">Contact</a>
              </li>
              <li class="nav-card-item">
                <a class="nav-link" href="blog.html">Blog</a>
              </li>         
            </ul>
            <ul class="right navbar-nav ms-auto">
              <li class="nav-card-item-right">
              <NavLink to="/PersonalProfile" className={({ isActive })=>(isActive?"Active-nav":"InActive-nav")}>Personal Profile</NavLink>
              </li>
              <li class="nav-card-item-right create-account">
                {/* <a class="nav-link" href="#">Create account</a> */}
                <Link to={'/register'} className="nav-link">Create account</Link>
              </li>       
            </ul>
          </div>
        </div>
      </nav>
 
      
    
      
    </Row>
  );
}
