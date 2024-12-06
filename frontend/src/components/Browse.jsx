import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    // Fetching all jobs using the custom hook
    useGetAllJobs()
    
    const { allJobs } = useSelector(store => store.job);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        return () => {
            // Reset the searched query when component unmounts
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    // Handling the case when no jobs are available
    if (!allJobs || allJobs.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="max-w-7xl mx-auto my-10">
                    <h1 className="font-bold text-xl my-10">No jobs available</h1>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl my-10">Search Results ({allJobs.length})</h1>
                <div className="grid grid-cols-3 gap-4">
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse;
