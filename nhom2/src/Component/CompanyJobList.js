import { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CompanyJobList() {
  const [currUser, setCurrUser] = useState({});
  const [JobPostList, setJobPostList] = useState([]);
  const [filteredJobList, setFilteredJobList] = useState([]);
  const [StatusList, setStatusList] = useState([]);
  //   setCurrUser(JSON.parse(sessionStorage.getItem("currUser")));
  useEffect(() => {
    setCurrUser(JSON.parse(sessionStorage.getItem("currUser")));
  }, {});
  useEffect(() => {
    const fetchJobList = async () => {
      const response = await fetch("http://localhost:9999/JobPost");
      const JobListData = await response.json();
      setJobPostList(JobListData);
    };
    fetchJobList();
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/JobStatus")
      .then((resp) => resp.json())
      .then((response) => {
        setStatusList(response);
      });
  }, []);
  useEffect(() => {
    const filteredList = JobPostList.filter((j) => j.UserId == currUser.id);
    setFilteredJobList(filteredList);
  }, [JobPostList, currUser]);
  return (
    <Table>
      <thead>
        <tr>
          <td>
            <h6>Job Name</h6>
          </td>
          <td>
            <h6>Job Description</h6>
          </td>
          <td>
            <h6>Recruitment Goal</h6>
          </td>
          <td>
            <h6>Post Date</h6>
          </td>
          <td>
            <h6>End Date</h6>
          </td>
          <td>
            <h6>Status</h6>
          </td>
        </tr>
      </thead>
      <tbody>
        {filteredJobList.map((j) => {
          if (j.Status == 1) {
            return (
              <tr key={j.id} className="pendingJob">
                <td>
                  <Link to={"/ApplicationList/" + j.id}>{j.JobName}</Link>
                </td>
                <td>{j.JobDescription}</td>
                <td>{j.RecuitmentGoal}</td>
                <td>{j.PostDate}</td>
                <td>{j.EndDate}</td>
                {StatusList.map((s) => {
                  if (s.id == j.Status) {
                    return <td>{s.text}</td>;
                  }
                })}
              </tr>
            );
          } else if (j.Status == 2) {
            return (
              <tr key={j.id} className="RejectedJob">
                <td>
                  <Link to={"/ApplicationList/" + j.id}>{j.JobName}</Link>
                </td>
                <td>{j.JobDescription}</td>
                <td>{j.RecuitmentGoal}</td>
                <td>{j.PostDate}</td>
                <td>{j.EndDate}</td>
                {StatusList.map((s) => {
                  if (s.id == j.Status) {
                    return <td>{s.text}</td>;
                  }
                })}
              </tr>
            );
          } else if (j.Status == 3) {
            return (
              <tr key={j.id} className="ActiveJob">
                <td>
                  <Link to={"/ApplicationList/" + j.id}>{j.JobName}</Link>
                </td>
                <td className="col-lg-5">{j.JobDescription}</td>
                <td className="col-lg-1">{j.RecuitmentGoal}</td>
                <td>{j.PostDate}</td>
                <td>{j.EndDate}</td>
                {StatusList.map((s) => {
                  if (s.id == j.Status) {
                    return <td>{s.text}</td>;
                  }
                })}
              </tr>
            );
          } else if (j.Status == 4) {
            return (
              <tr key={j.id} className="CloseJob">
                <td>
                  <Link to={"/ApplicationList/" + j.id}>{j.JobName}</Link>
                </td>
                <td className="col-lg-5">{j.JobDescription}</td>
                <td className="col-lg-1">{j.RecuitmentGoal}</td>
                <td>{j.PostDate}</td>
                <td>{j.EndDate}</td>
                {StatusList.map((s) => {
                  if (s.id == j.Status) {
                    return <td>{s.text}</td>;
                  }
                })}
              </tr>
            );
          }
        })}
      </tbody>
    </Table>
  );
}
