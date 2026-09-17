"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import login from "@/public/login.jpg";
import { FaGoogle, FaGithub } from "react-icons/fa"; // Встановіть react-icons якщо ще немає, або використайте стандартні SVG

export default function SignInPage() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleProviderSignIn = async (providerId: string) => {
    try {
      setLoadingProvider(providerId);
      await signIn(providerId, { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col md:flex-row">
      {/* Image section */}
      <div className="hidden md:block md:w-[60%] h-full relative">
        <Image
          src={login}
          alt="Sign In"
          fill
          priority
          sizes="(max-width: 768px) 0vw, 60vw"
          className="object-cover h-full"
        />
      </div>

      {/* Form section */}
      <div className="w-full md:w-[40%] h-full flex flex-col justify-center items-center bg-black p-10 max-w-lg mx-auto">
        <div className="w-full text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400">
            This is your gateway to access a personalized experience tailored
            just for you.
          </p>
        </div>

        <div className="w-full flex flex-col gap-y-3">
          {/* Google Sign In */}
          <Button
            className="flex items-center justify-center gap-x-3 w-full py-6 bg-white text-black hover:bg-gray-200 transition-colors duration-200 font-medium rounded-lg"
            onClick={() => handleProviderSignIn("google")}
            disabled={!!loadingProvider}
          >
            {loadingProvider === "google" ? (
              <div className="flex items-center gap-x-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Connecting to Google...</span>
              </div>
            ) : (
              <>
                <FaGoogle className="w-5 h-5 text-red-500" />
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          {/* GitHub Sign In */}
          <Button
            className="flex items-center justify-center gap-x-3 w-full py-6 bg-gray-900 text-white hover:bg-gray-800 border border-gray-800 transition-colors duration-200 font-medium rounded-lg"
            onClick={() => handleProviderSignIn("github")}
            disabled={!!loadingProvider}
          >
            {loadingProvider === "github" ? (
              <div className="flex items-center gap-x-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connecting to GitHub...</span>
              </div>
            ) : (
              <>
                <FaGithub className="w-5 h-5" />
                <span>Continue with GitHub</span>
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
