"use client";
import Image from "next/image";
import colorsystem from "../../../public/colorsystem.svg";
import { useSession, signIn, signOut } from "next-auth/react";
import CardComponent from "../_components/card";
const RoutePages = () => {
  return (
    <div className="bg-[#222222]">
      <div className="container">
       <div className=" p-10">
          <h1 className="text-4xl text-white">Color System</h1>
        <p className="text-[#A09A9A]">
          Welcome to Learnify your personalized guide to the world of knowledge
          and skills. Open doors to endless learning in an innovative
          environment where every step towards mastery is supported by
          state-of-the-art teaching methods. Customized programs, wise mentors
          and engaging content - welcome to a unique educational experience with
          Learnify, where growing your skills is our first priority
        </p>
        </div>

        <div className="flex justify-center p-10">
          <Image src={colorsystem} width={1000} height={500} alt="colorsystem" />
        </div>
        <div className="flex justify-center">
          <button onClick={() => signIn('user', {callbackUrl:'/search'})} className="text-sidebarLink">
            Sign in
          </button>
        </div>
        <div>
          <button onClick={() => signOut()} className="text-sidebarLink">Sign OUT </button>
        </div>

        <div className="flex justify-center">
        <CardComponent title="title" price="200" img={colorsystem} type="type" />
        </div>
      </div>
    </div>
  );
};

export default RoutePages;
