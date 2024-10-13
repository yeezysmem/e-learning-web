// app/auth/signin/page.js
"use client";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import Image from "next/image";
import login from "@/public/login.jpg";

export default function SignInPage() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  return (
    <div className="h-screen relative">
      <div className="absolute left-0 top-0 w-1/2 h-full">
        <Image
          src={login}
          alt="Sign In"
          layout="fill"
          objectFit="cover"
          className="h-full"
        />
      </div>
      <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col justify-center items-center bg-black p-10">
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Sign In</h1>
          <p className="text-sm text-gray-200 mb-4">
            This is your gateway to access a personalized experience tailored just for you.
          </p>
        </div>
        <Input className="mb-2 w-full" placeholder="First Name" />
        <Input className="mb-2 w-full" placeholder="Last Name" />
        <Input className="mb-4 w-full" placeholder="Email" />
        <div className="mb-4 w-full">
          <h2 className="text-white mb-2">You are:</h2>
          <div className="flex gap-4">
            <Button className="w-1/2">Student</Button>
            <Button className="w-1/2">Teacher</Button>
          </div>
        </div>
        <Button className="w-full mb-4">Sign In</Button>
        <p className="flex justify-center text-white text-sm mb-4">Or</p>
        {providers && Object.values(providers).map((provider) => (
          <div key={provider.name} className="w-full mb-2">
            <Button
              className="flex items-center justify-center w-full"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
              <Github className="h-4 w-4 ml-2" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
