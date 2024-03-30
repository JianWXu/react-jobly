import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

let BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token = localStorage.getItem("joblyToken");

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    console.log("headers", headers);
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of all companies. */

  static async getCompanies(searchTerm) {
    if (searchTerm) {
      let res = await this.request(`companies`, { name: searchTerm });
      return res.companies;
    }
    let response = await this.request(`companies/`);
    return response.companies;
  }

  static async getJobs(searchTerm) {
    if (searchTerm) {
      let res = await this.request(`jobs`, { title: searchTerm });
      return res.jobs;
    }
    let response = await this.request(`jobs/`);
    return response.jobs;
  }

  static async makeUser(info) {
    let { username, password, firstName, lastName, email } = info;
    try {
      let res = await this.request(
        `auth/register`,
        { username, password, firstName, lastName, email },
        "post"
      );

      return res;
    } catch (err) {
      console.error("Error registering user:", err);
      throw err;
    }
  }

  static async verifyUser(info) {
    let { username, password } = info;
    try {
      let res = await this.request(
        `auth/token`,
        { username, password },
        "post"
      );
      console.log(res.token);
      JoblyApi.token = res.token;
      localStorage.setItem("joblyToken", res.token);
      return res.token;
    } catch (err) {
      console.error("Error logging in:", err);
      throw err;
    }
  }

  static async getUser(info) {
    try {
      let res = await this.request(`users/${info}`);
      return res;
    } catch (err) {
      console.error("Error finding user", err);
      throw err;
    }
  }

  static async patchUser(username, data) {
    try {
      let res = await this.request(`users/${username}`, data, "patch");
      return res;
    } catch (err) {
      console.error("Error updating user", err);
      throw err;
    }
  }

  static async applyJob(username, jobId) {
    try {
      let res = await this.request(
        `users/${username}/jobs/${jobId}`,
        "",
        "post"
      );
      console.log("Response:", res);
      return res;
    } catch (err) {
      console.error("Error applying for job", err);
      throw err;
    }
  }
}

export default JoblyApi;
