import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

export default function PendingJobPosts() {
  const [PendingJob, setPendingJob] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const displayList = [];
  useEffect(() => {
    fetch("http://localhost:9999/JobPost")
      .then((response) => response.json())
      .then((res) => {
        setPendingJob(res.filter((j) => j.Status === 1));
      });
    fetch("http://localhost:9999/user")
      .then((response) => response.json())
      .then((res) => {
        setCompanyList(res);
      });
  }, []);

  PendingJob.map((pj) => {
    const matchingCompany = companyList.find((c) => c.id === pj.UserId);

    const mergedInfo = {
      id: pj.id,
      jobName: pj.JobName,
      JobDescription: pj.JobDescription,
      RecruitmentGoal: pj.RecuitmentGoal,
      PostDate: pj.PostDate,
      EndDate: pj.EndDate,
      CompanyName: matchingCompany ? matchingCompany.Name : null,
      CompanyId: matchingCompany ? matchingCompany.id : null,
    };
    displayList.push(mergedInfo);
  });
  displayList.map((a) => {
    console.log(a.id);
  });
  const HanldeUpdate=(job, accepted)=>{
    accepted.preventDefault();
    const UpdatedJobPost = {
      id: job.id,
      JobName: job.jobname,
      JobDescription: job.JobDescription,
      RecruitmentGoal: job.RecuitmentGoal,
      PostDate: job.PostDate,
      EndDate: job.EndDate,
      
    }
  }
  return (
    <Container>
      <Table className="pendingJobsTable">
        <thead>
          <tr>
            <td>Job Name</td>
            <td className="col-lg-4">Job Description</td>
            <td className="col-lg-2">Post By</td>
            <td className="col-lg-1">Recruitment Goal</td>
            <td>Post Date</td>
            <td>End Date</td>
            <td className="col-lg-1">Action</td>
          </tr>
        </thead>
        <tbody>
          {displayList.map((pj) => (
            <tr key={pj.id}>
              <td>{pj.jobName}</td>
              <td className="col-lg-4">{pj.JobDescription}</td>
              <td className="col-lg-2">{pj.CompanyName}</td>
              <td className="col-lg-1">{pj.RecruitmentGoal}</td>
              <td>{pj.PostDate}</td>
              <td>{pj.EndDate}</td>
              <td className="col-lg-1" style={{padding:"10px"}}>
                <Row>
                  <Button onClick={(e)=>HanldeUpdate(pj, false)} className="btn-danger">Reject</Button>
                  <Button onClick={(e)=>HanldeUpdate(pj, true)} className="btn-info">Accept</Button>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
