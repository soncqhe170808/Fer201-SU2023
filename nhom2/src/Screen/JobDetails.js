import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefaultTemplate from '../Template/DefaultTemplate';
import '../style/JobDetails.css';

const JobDetails = ({ jobs }) => {
  const { jobId } = useParams();
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem('currUser'));

  const selectedJob = jobs.find((job) => job.id === Number(jobId));

  if (!selectedJob) {
    return <div>Job not found.</div>;
  }

  const handleApply = () => {
    if (currentUser == null) {
      // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate('/login');
    } else {
      // Người dùng đã đăng nhập, thực hiện logic ứng tuyển tại đây
      // ...
      // Lưu dữ liệu hoặc thực hiện các tác vụ khác
      // ...
      setApplied(true);
    }
  };

  return (
    <DefaultTemplate>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="job-details-image">
              <img src={selectedJob.image} alt="Job" className="job-image" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="job-details-description">
              <h2>{selectedJob.JobName}</h2>
              <p>{selectedJob.JobDescription}</p>
              <p>Recruitment Goal: {selectedJob.RecuitmentGoal}</p>
              <p>Posted on: {selectedJob.PostDate}</p>
              <p>End Date: {selectedJob.EndDate}</p>

              {applied ? (
                <p>You have already applied for this job.</p>
              ) : (
                <button onClick={handleApply}>Apply</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default JobDetails;
