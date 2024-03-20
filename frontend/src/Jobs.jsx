import React, {useState, useEffect, useCallback, useContext} from "react";
import axios from 'axios'
import JoblyApi from "../../api";
import JobCard from "./JobCard";
import UserContext from "./userContext";


function Jobs(){
    const [jobs, setJobs] = useState([])

    const {userToken, username} = useContext(UserContext)

    const [searchTerm, setSearchTerm] = useState('');
    //   const [searchResults, setSearchResults] = useState('');
    
      const handleChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);   
      };
    
      const handleSubmit = useCallback( async e => {
        e.preventDefault();
        try {            
            // setCompanies(searchTerm);
            let res = await JoblyApi.getJobs(searchTerm)
            setJobs(res)
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
      }, [searchTerm])

      useEffect(() => {
        async function fetchJobs() {
            try {
                const jobsList = await JoblyApi.getJobs();
                setJobs(jobsList);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }
        fetchJobs();
    }, []);

    return (
        <>
        <div >
            <form className="form-container" onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Enter search term"
                value={searchTerm}
                onChange={handleChange}
                />
                <button>Submit</button>
            </form>
            </div>
            <div className="jobCard-container">
                
            <JobCard jobs={jobs} />
            </div>
            </>
        )
}

export default Jobs