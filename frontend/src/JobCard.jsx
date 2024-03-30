import React, {useState, useEffect, useCallback, useContext} from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UserContext from "./userContext";
import JoblyApi from "../../api";
import axios from 'axios';

function JobCard({jobs}){

  const {user} = useContext(UserContext)
  const userObj = JSON.parse(user)
  const [applied, setApplied] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([])

  function findJobId(jobId) {
    const job = jobs.find(job => job.id === jobId);
    return job ? job.id : null
  }

  useEffect(() => {
    // Retrieve applied jobs from localStorage when component mounts
    const storedAppliedJobs = localStorage.getItem("appliedJobs");
    if (storedAppliedJobs) {
      setAppliedJobs(JSON.parse(storedAppliedJobs));
    }
  }, []);

  const handleClick = async (id) => {
    let jobId = findJobId(id)
    try {
      const applytoJobs = await JoblyApi.applyJob(userObj.username, jobId)
      console.log(applytoJobs)
      setAppliedJobs((jobs) => [...jobs, jobId])
      setApplied({ [id]: true });
      localStorage.setItem("appliedJobs", JSON.stringify([...appliedJobs, jobId]));
    } catch(err){
      console.error("Error applying for job:", error)
    }    
  }

  useEffect(() => {
    console.log(appliedJobs);
  }, [appliedJobs]);

    return (
        
        <Container className="jobCardContainer" fluid>
            
            {jobs.map(job => (
                 <Card className="jobCard" >                 
                 <Card.Body>
                   
                   <Card.Title className="cardTitle">
                    
                    <b>{job.title}</b>
                    
                    </Card.Title>
                   <Card.Text>
                    
                    Salary: {job.salary}
                    <br></br>
                    Equity: {job.equity}
                    
                   </Card.Text>

                   <button onClick={() => handleClick(job.id)}
                   variant={applied[job.id] ? 'success' : 'primary'}
                   >
                  {appliedJobs.find((appliedJobId)=> appliedJobId === job.id) ? 'Applied' : 'Apply!'}                   
                   </button>


                 </Card.Body>
               </Card>
            ))}
            
        </Container>
    )
}


export default JobCard