import { Container, Row } from "react-bootstrap";
import DefaultTemplate from "../Template/DefaultTemplate";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGear,
  faUser,
  faCalendarCheck,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
export default function ApplicationList() {
  const { JobId } = useParams();
  // const JobId = 3;
  const [JobName, setJobName] = useState("");
  const [ApplicationList, setApplicationList] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [FieldOfExpertiseList, setFieldOfExpertiseList] = useState([]);
  const [filter, setFilter] = useState(0);
  const [aaa, setaaa] = useState([]);
  const [searchNEmail, SetSearchEmail] = useState("");

  // const [AppAndUser, setAppAndUser]
  const displayList = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/Application/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Filter data here
        const filteredData = data.filter(
          (a) => a.JobId == JobId && a.Status == 0
        );

        // Map and create the displayList
        const displayList = filteredData.map((a) => {
          const matchingUser = UserList.find((u) => u.id == a.UserId);
          return {
            id: a.id,
            UserId: matchingUser.id,
            imgPath: matchingUser.imgPath,
            UserName: matchingUser.Name,
            fieldOfExpertise: matchingUser.fieldOfExpertise,
            email: matchingUser.email,
            Experience: matchingUser.Experience,
            ApplyDate: a.ApplyDate,
          };
        });


        setaaa(displayList);
      } catch (error) {
      }
    };

    fetchData();
  }, [JobId, UserList]);
  useEffect(() => {
    fetch("http://localhost:9999/JobPost/" + JobId)
      .then((resp) => resp.json())
      .then((response) => {
        setJobName(response.JobName);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/FieldOfExpertise")
      .then((resp) => resp.json())
      .then((response) => {
        setFieldOfExpertiseList(response);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((resp) => resp.json())
      .then((response) => {
        setUserList(response);
      });
  }, []);

  const filterByExpertise = (e) => {
    setFilter(e);
  };

  // if (UserList != null && UserList.length > 0) {
  //   ApplicationList.map((a) => {
  //     const matchingUser = UserList.find((u) => u.id == a.UserId);
  //     const displayItem = {
  //       id: a.id,
  //       UserId: matchingUser.id,
  //       imgPath: matchingUser.imgPath,
  //       UserName: matchingUser.Name,
  //       fieldOfExpertise: matchingUser.fieldOfExpertise,
  //       email: matchingUser.email,
  //       Experience: matchingUser.Experience,
  //       ApplyDate: a.ApplyDate,
  //     };
  //     displayList.push(displayItem);
  //   });
  // }
  const sortApplication = (e) => {
    const newlist = [...aaa];
    if (e === "id") {
      newlist.sort((a, b) => a.id - b.id);
    } else if (e === "yoe") {
      console.log("aaaaaaaaaaaaaaaaaa");
      newlist.sort((a, b) => b.Experience - a.Experience);
    } else if (e === "oldest") {
      newlist.sort((a, b) => (a.ApplyDate > b.ApplyDate ? 1 : -1));
    } else {
      newlist.sort((a, b) => (a.ApplyDate > b.ApplyDate ? -1 : 1));
    }
    setaaa(newlist);
  };
  const HandleSearch = (e) => {
    SetSearchEmail(e);
  };
  // useEffect(() => {
    const finalList = aaa.filter((j) => {
      console.log(searchNEmail);
      if (filter == 0) {
        return 1 == 1 && j.email.includes(searchNEmail);
      } else {
        return j.fieldOfExpertise == filter;
      }
    });
  //   setaaa(finalList);
  // }, [searchNEmail, filter]);
  console.log(aaa.length);
  if (aaa.length > 0) {
    return (
      <DefaultTemplate>
        <Container>
          <Row>
            <h4>
              Applications for:{" "}
              <p style={{ color: "#63ac28", display: "inline-block" }}>
                {JobName}
              </p>
            </h4>
          </Row>
          <Row>
            <div className="searchBar">
              <form>
                <input
                  onChange={(e) => HandleSearch(e.target.value)}
                  placeholder="   Search Application By Email"
                />
                <button type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
              <div className="filterByExpertise">
                {FieldOfExpertiseList.map((f) => (
                  <span
                    key={f.id}
                    onClick={(e) => filterByExpertise(f.id)}
                    className="field"
                  >
                    <a>{f.FieldOfExpertise}</a>
                    <span> | </span>
                  </span>
                ))}
                <span onClick={(e) => filterByExpertise(0)} className="field">
                  <a>All</a>
                </span>
              </div>
              <div className="sortApplication">
                <h6 style={{ display: "inline-block" }}>
                  Sort By:{"\u00A0"}
                  {"\u00A0"}
                </h6>
                <select
                  name="sortType"
                  style={{ width: "110px", marginTop: "10px" }}
                  onChange={(e) => sortApplication(e.target.value)}
                >
                  <option value={"id"}>Default</option>
                  <option value={"yoe"}>Years Of Experience</option>
                  <option value={"oldest"}>Oldest</option>
                  <option value={"newest"}>Most Recent</option>
                </select>
              </div>
            </div>
          </Row>
          <Row>
            {finalList.map((a) => {
              return (
                <Link
                  className="proceedLink"
                  to={"/ProceedApplication/" + a.id}
                >
                  <div key={a.id} className="Applications col-lg-7 col-sm-12">
                    <img className="ApplicantImg" src={a.imgPath} />
                    <div className="applicantInfo">
                      <h6>
                        <FontAwesomeIcon icon={faUser} />
                        {"\u00A0"}
                        {a.UserName}
                      </h6>
                      {FieldOfExpertiseList.map((e) => {
                        if (e.id == a.fieldOfExpertise) {
                          return (
                            <h6>
                              <FontAwesomeIcon icon={faGear} />
                              {"\u00A0"}
                              {e.FieldOfExpertise}
                            </h6>
                          );
                        }
                      })}
                      <h6>
                        <FontAwesomeIcon icon={faEnvelope} />
                        {"\u00A0"}
                        {a.email}
                      </h6>
                      <h6>
                        <FontAwesomeIcon icon={faCalendarCheck} />
                        {"\u00A0"}
                        {a.ApplyDate}
                      </h6>
                      <h6>{a.Experience} of Experience</h6>
                    </div>
                  </div>
                </Link>
              );
            })}
          </Row>
        </Container>
      </DefaultTemplate>
    );
  }
}
