"use server";
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { useRouter } from 'next/router';
import axios from 'axios';
import SendButton from './components/sendButton';
import { getServerSession } from 'next-auth';
import { toast } from 'react-hot-toast';
import { db } from '@/lib/db';


export default async function ChangeRole() {

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const userRole = session?.user?.role;
  const {data: sessionData} = useSession()
  const newRole = "teacher"

  const userData = await db.user.findFirst({
    where: {
      id: userId,
    },
  
  })



  return (
    <div>
      <h1>Change User Role</h1>
      <SendButton userId={userId} newRole={newRole}/>
      <p>userId : {userId}</p>
      {/* <p>newRole : {role}</p> */}
      <p>Role : {userData?.role}</p>
      <p>UserRole: {userRole}</p>
    </div>
  );
}
