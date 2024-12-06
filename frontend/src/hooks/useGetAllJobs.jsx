import axios from "axios";
import React, { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch jobs from API
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          // You can dispatch an action to handle failure here, if needed
          console.error("Failed to fetch jobs: ", res.data.message);
        }
      } catch (error) {
        // Logging error to the console
        console.error("Error fetching jobs: ", error);
        // Optionally, dispatch an error state to Redux or show a UI notification
      }
    };

    // Fetch jobs on component mount
    fetchAllJobs();
  }, [dispatch]); // Adding dispatch in dependency array ensures the effect is properly cleaned up

  // No return value, as it's only used for side-effects
};

export default useGetAllJobs;

