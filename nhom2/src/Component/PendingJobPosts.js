import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

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
  displayList.map((a)=>{
    console.log(a.id);
  })
  return (
    <Row>
      {displayList.map((pj) => (
        <div
          className="col-lg-8 pendingJobItem"
        >
            <h5>{pj.jobName}</h5>
        </div>
      ))}
    </Row>
  );
}
