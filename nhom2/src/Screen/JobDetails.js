import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultTemplate from '../Template/DefaultTemplate';
import '../style/JobDetails.css';

const JobDetails = ({ jobs }) => {
  const { jobId } = useParams();

  const selectedJob = jobs.find((job) => job.id === Number(jobId));

  if (!selectedJob) {
    return <div>Job not found.</div>;
  }

  return (
    <DefaultTemplate>
      <div className="container" >
        <div className="row">
          <div className="col-lg-6 col-md-12" >
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
            </div>
          </div>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default JobDetails;
