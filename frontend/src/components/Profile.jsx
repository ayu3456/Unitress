import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';

const isResume = true;

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    // Handling the case when user data is not loaded yet
    if (!user) {
        return <div>Loading...</div>; // You can replace this with a spinner or other loading indicator
    }

    // Checking if user profile data is available
    const profile = user.profile || {};
    
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={profile?.profilePhoto || 'defaultProfilePhoto.jpg'} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName || "No Name Provided"}</h1>
                            <p>{profile?.bio || "No bio available"}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email || "No Email"}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber || "No Phone Number"}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            Array.isArray(profile?.skills) && profile.skills.length > 0
                                ? profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                                : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    { 
                        isResume ? (
                            <a 
                                target='blank' 
                                href={profile?.resume ? profile.resume.replace(".pdf", ".jpg") : "#"} 
                                className='text-blue-500 w-full hover:underline cursor-pointer'>
                                {profile?.resumeOriginalName || "No Resume Available"}
                            </a>
                        ) : (
                            <span>NA</span>
                        )
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;



