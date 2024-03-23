import React, {useState, useEffect, useCallback, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios'
import JoblyApi from "../../api";
import JobCard from "./JobCard";
import UserContext from "./userContext";


function Company() {
    const {user} = useContext(UserContext)
    const navigate = useNavigate();
    let { id } = useParams()
    const [company, setCompany] = useState({})
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        if (!user) {
          navigate("/"); 
        }
      }, [user, navigate]);
      

    useEffect(() => {
        async function fetchCompany() {
            try {      
                let res = await JoblyApi.getCompany(id)
                // setCompany(res)
                setJobs(res.jobs)
                } catch(err) {
                    console.error("Error fetching company:", err)
                }
        }
        fetchCompany()
    }, [])

    return (
        <>
        <h3>{company.name}</h3>
        <h4>{company.description}</h4>
        <JobCard jobs={jobs} />
        </>  
        
    )
}

export default Company