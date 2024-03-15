import React from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Route, Routes, Navigate} from "react-router-dom"

function CompanyCard({companies}){
    return (
        <Container className="compCardContainer" fluid>
            
            {companies.map(company => (
                 <Card className="companyCard" >                 
                 <Card.Body>
                   
                   <Card.Title className="cardTitle">
                    <a href={`/companies/${company.handle}`}>
                    {company.name}
                    </a>
                    </Card.Title>
                   <Card.Text>
                    <a href={`/companies/${company.handle}`} className="nav-link">
                    {company.description}
                    </a>
                   </Card.Text>
                   

                 </Card.Body>
               </Card>
            ))}
            
        </Container>
    )
}

export default CompanyCard