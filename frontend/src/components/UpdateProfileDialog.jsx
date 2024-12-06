import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  // Log the entire user object to check its structure
  console.log("User object:", user);

  const [input, setInput] = useState({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      // Check if skills exists and handle it safely
      skills: user?.profile?.skills?.join(', ') || "",  // Joining skills as a comma-separated string
      file: user?.profile?.resume || ""
  });

  // Debug: log the profile skills specifically
  console.log("Profile Skills:", user?.profile?.skills);

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {
      const file = e.target.files?.[0];
      setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
        formData.append("file", input.file);
    }
    try {
        setLoading(true);
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });

        // Log the entire response to check its structure
        console.log("API Response:", res.data);

        if (res.data.success) {
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    } finally {
        setLoading(false);
    }
    setOpen(false);
}


  return (
      <Dialog open={open}>
          <DialogContent className="sm:max-w-[425px] bg-white text-black" onInteractOutside={() => setOpen(false)}>
              <DialogHeader>
                  <DialogTitle>Update Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={submitHandler}>
                  <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor="fullName" className="text-right">Name</Label>
                          <Input
                              id="fullName"
                              name="fullName"
                              type="text"
                              value={input.fullName}
                              onChange={changeEventHandler}
                              className="col-span-3"
                          />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor="email" className="text-right">Email</Label>
                          <Input
                              id="email"
                              name="email"
                              type="email"
                              value={input.email}
                              onChange={changeEventHandler}
                              className="col-span-3"
                          />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor="phoneNumber" className="text-right">Number</Label>
                          <Input
                              id="phoneNumber"
                              name="phoneNumber"
                              type="tel"
                              value={input.phoneNumber}
                              onChange={changeEventHandler}
                              className="col-span-3"
                          />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor="bio" className="text-right">Bio</Label>
                          <Input
                              id="bio"
                              name="bio"
                              value={input.bio}
                              onChange={changeEventHandler}
                              className="col-span-3"
                          />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor="skills" className="text-right">Skills</Label>
                          <Input
                              id="skills"
                              name="skills"
                              value={input.skills}
                              onChange={changeEventHandler}
                              className="col-span-3"
                              placeholder="Enter skills separated by commas"
                          />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor="file" className="text-right">Resume</Label>
                          <Input
                              id="file"
                              name="file"
                              type="file"
                              accept="application/pdf"
                              onChange={fileChangeHandler}
                              className="col-span-3"
                          />
                      </div>
                  </div>
                  <DialogFooter>
                      {
                          loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                      }
                  </DialogFooter>
              </form>
          </DialogContent>
      </Dialog>
  )
}

export default UpdateProfileDialog
