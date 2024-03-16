import React from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function JobCard({jobs}){
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
                   

                 </Card.Body>
               </Card>
            ))}
            
        </Container>
    )
}


export default JobCard