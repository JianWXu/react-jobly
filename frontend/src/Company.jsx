import React, {useState, useEffect, useCallback} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import JoblyApi from "../../api";
import JobCard from "./JobCard";



function Company() {
    let { id } = useParams()
    const [company, setCompany] = useState({})
    const [jobs, setJobs] = useState([]);
      

    useEffect(() => {
        async function fetchCompany() {
            try {      
                let res = await JoblyApi.getCompany(id)
                console.log(res)
                // setCompany(res)
                setJobs(res.jobs)
                console.log(jobs)
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