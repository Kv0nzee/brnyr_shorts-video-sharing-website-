import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import useAuthStore from '../store/authStore';
import Image from 'next/image';

const Sidebar = ({ tags} : any ) => {
  const [ showSidebar, setShowSidebar ] = useState(true);
  const { fetchAllUsers, allUsers, userProfile } : any = useAuthStore();
  const mainUser : any = useRef([]);
  const SugAccounts : any = useRef([]);
  
  
  useEffect(() => {
    fetchAllUsers();
    const fetchUser = () => {
      mainUser.current = allUsers.filter((user : any) =>{
        return user._id === userProfile._id;
      });
    
      SugAccounts.current =allUsers.filter((user : any) =>{
        return user._id !== userProfile._id;
      });
    }
    if(userProfile){
      fetchUser();
    } 
  }, [fetchAllUsers, userProfile, allUsers]);




  return (
    <div>
      <div className="block m-2 mt-3 ml-4 text-xl xl:hidden"
           onClick={() => setShowSidebar((prev) => !prev)}
      >
        { showSidebar  ? <ImCancelCircle  className="mx-auto"/> : <AiOutlineMenu className="mx-auto"/>}
      </div>
      { (showSidebar && mainUser.current) && (
        <div className="flex flex-col justify-start w-20 p-3 mb-10 border-r-2 border-gray-100 xl:w-400 xl:border-0 ">
          <div className='border-gray-200 xl:border-b-2 xl:pb-4'>
          <p className='hidden mx-3 font-semibold text-gray-500 xl:block'>
            Profile
          </p>
         { mainUser.current[0] && <Link href={`/profile/${mainUser.current[0]._id}`} key={mainUser.current[0]._id}>
            <div className='flex gap-3 p-2 font-semibold transition-all rounded cursor-pointer hover:bg-gray-500 '>
              <div className='w-8 h-8'>
                <Image
                  width={62}
                  height={62}
                  className='rounded-full '
                  src={mainUser.current[0]?.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>

              <div className='hidden xl:block'>
                <p className='flex items-center gap-1 font-bold lowercase text-md text-primary'>
                  {mainUser.current[0].userName.replace(/\s+/g, '')}{' '}
                </p>
              </div>
            </div>
          </Link>}
          </div>
          <SuggestedAccounts SugAccounts={SugAccounts.current}/>
          <Discover tags={tags} />
        </div>
      )}
    </div>
  )
}

export default Sidebar