import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Jobdata.css';
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultTemplate from '../Template/DefaultTemplate';

const JobData = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [checkedState, setCheckedState] = useState([]);


  const sortJobsByNewest = () => {
    const sortedJobs = [...jobs].sort((a, b) => {
      const dateA = new Date(a.PostDate);
      const dateB = new Date(b.PostDate);
      return dateB - dateA;
    });
    setJobs(sortedJobs);
  };

  const sortJobsByOldest = () => {
    const sortedJobs = [...jobs].sort((a, b) => {
      const dateA = new Date(a.PostDate);
      const dateB = new Date(b.PostDate);
      return dateA - dateB;
    });
    setJobs(sortedJobs);
  };

  useEffect(() => {
    if (!isFetched) {
      fetch('http://localhost:9999/JobPost')
        .then((response) => response.json())
        .then((data) => {
          setJobs(data);
          setIsFetched(true);
        })
        .catch((error) => console.log(error));
    }
  }, [isFetched]);

  const toggleJobDescription = (jobId) => {
    setExpandedJobId(jobId === expandedJobId ? null : jobId);
  };

  const handleFilterChecked = (event, jobId) => {
    if (checkedState.includes(jobId)) {
      setCheckedState(checkedState.filter((id) => id !== jobId));
    } else {
      setCheckedState([...checkedState, jobId]);
    }
  };

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    if (checkedState.length === 0) {
      return (
        job.JobName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.PostDate.includes(searchKeyword)
      );
    } else {
      return (
        checkedState.includes(job.id) &&
        (job.JobName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.PostDate.includes(searchKeyword))
      );
    }
  });

  return (
    <DefaultTemplate>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Jobs List</h2>
          </div>
          <div className="col-12">
            <div className="sort-buttons">
              <button className="btn btn-primary" onClick={sortJobsByNewest}>
                New
              </button>
              <button className="btn btn-primary" onClick={sortJobsByOldest}>
                Old
              </button>
            </div>
          </div>

          <div className="col-9" style={{margin:"0 auto"}}>
          <div className="col-12 text-center mt-3 mb-5">
            <input
              type="text"
              placeholder="Search by name or date"
              value={searchKeyword}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
            <div className="job-data row">
              {filteredJobs.map((job) => (
                <div key={job.id} className="job-card col-8">
                  <div className="row">
                    <div className="col-4">
                      <Link to={`/JobDetails/${job.id}`}>
                        <img src={job.image} alt="Job" className="job-image" />
                      </Link>
                    </div>
                    <div className="col-8">
                      <Link to={`/JobDetails/${job.id}`}>
                        <h2>{job.JobName}</h2>
                      </Link>
                      <p
                        className={`job-description ${expandedJobId === job.id ? 'expanded' : ''
                          }`}
                        onClick={() => toggleJobDescription(job.id)}
                      >
                        {expandedJobId === job.id
                          ? job.JobDescription
                          : job.JobDescription.substring(0, 100) + '...'}
                      </p>
                      <p>Recruitment Goal: {job.RecuitmentGoal}</p>
                      <p>Posted on: {job.PostDate}</p>
                      <p>End Date: {job.EndDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="col-3">
            <div className="search-by-name">
              <div>
                <h4>Search By Name</h4>
                {jobs.map((job) => (
                  <div key={job.id}>
                    <input
                      type="checkbox"
                      checked={checkedState.includes(job.id)}
                      onChange={(e) => handleFilterChecked(e, job.id)}
                    />
                    <span>{job.JobName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>


    </DefaultTemplate>
  );
};

export default JobData;
