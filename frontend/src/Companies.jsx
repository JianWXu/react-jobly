import React, {useState, useEffect, useCallback, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import JoblyApi from "../../api";
import Company from "./Company";
import CompanyCard from "./CompanyCard";
import UserContext from "./userContext";

function Companies(){
    const [companies, setCompanies] = useState([])
    const {user} = useContext(UserContext)
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    

    useEffect(() => {
        if (!user) {
          navigate("/"); 
        }
      }, [user, navigate]);


      const handleChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);   
      };
    
      const handleSubmit = useCallback( async e => {
        e.preventDefault();
        try {            
            // setCompanies(searchTerm);
            let res = await JoblyApi.getCompanies(searchTerm)
            setCompanies(res)
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
      }, [searchTerm])

      useEffect(() => {
        async function fetchCompanies() {
            try {
                const companiesList = await JoblyApi.getCompanies();
                setCompanies(companiesList);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        }
        fetchCompanies();
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
        <div className="companyCard-container">
            
        <CompanyCard companies={companies} />
        </div>
        </>
    )
}

export default Companies
