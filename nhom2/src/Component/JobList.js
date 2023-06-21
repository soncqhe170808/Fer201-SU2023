import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "../style/stylingSon.css";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  faInfoCircle,
  faBuilding,
  faUser,
  faClock,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Joblist() {
  const [JobList, setJobList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9990/JobPost")
      .then((res) => res.json())
      .then((result) => {
        setJobList(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:9990/user")
      .then((res) => res.json())
      .then((result) => {
        setCompanyList(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:9990/Category")
      .then((res) => res.json())
      .then((result) => {
        setCategory(result);
      });
  }, []);
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Row className="JobList">
      <Row className="JobListHeader">
        <h3>Các Jobs mới</h3>
        <Link to="#">Xem tất cả</Link>
      </Row>
      <Row className="JobLisCarousel">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          infinite={true}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          {JobList.map((j) => (
            <div className="JobCard" key={j.JobId}>
              <div className="JobCardBox">
                <div className="JobCardLeft col-4">
                  <img
                    className="img-fluid img-responsive"
                    src={companyList
                      .map((c) => (j.UserId == c.id ? c.imgPath : ""))
                      .join("")}
                  />
                </div>
                <div className="JobCardRight col-7">
                  <h5>{j.JobName}</h5>
                  <p>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    &nbsp;&nbsp;{j.JobDescription}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faBuilding} />
                    &nbsp;&nbsp;
                    {companyList.map((c) => {
                      if (j.UserId == c.id) {
                        return c.Name;
                      }
                    })}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faUser} />
                    &nbsp;&nbsp;Còn tuyển {j.RecuitmentGoal} ứng viên
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faClock} />
                    &nbsp;&nbsp; {j.PostDate} - {j.EndDate}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCode} />
                    &nbsp;&nbsp;
                    {Category.map((cate) => {
                      if (cate.Cid == j.Cid) {
                        return cate.name;
                      }
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Row>
    </Row>
  );
}
