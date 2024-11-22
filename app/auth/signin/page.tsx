"use client";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import login from "@/public/login.jpg";

type Provider = {
  id: string;
  name: string;
  type: string;
};

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleEmailSignIn = async () => {
    if (email) {
      setIsLoading(true);
      setError(null);
      try {
        const result = await signIn("email", { email, redirect: false });
        if (result?.error) {
          throw new Error(result.error);
        }
      } catch (err) {
        setError("Failed to sign in with email. Please try another method.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please enter a valid email.");
    }
  };

  const handleProviderSignIn = async (providerId: string) => {
    setIsLoading(true);
    await signIn(providerId);
    setIsLoading(false);
  };

  return (
    <div className="h-screen bg-black flex flex-col md:flex-row">
      {/* Image section hidden on small screens */}
      <div className="hidden md:block md:w-[60%] h-full relative">
        <Image
          src={login}
          alt="Sign In"
          layout="fill"
          objectFit="cover"
          className="h-full"
        />
      </div>

      {/* Form section */}
      <div className="w-full md:w-[40%] h-full flex flex-col justify-center items-center bg-black p-10 max-w-lg mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            Sign In
          </h1>
          <p className="text-sm text-gray-100 mb-4 text-center">
            This is your gateway to access a personalized experience tailored
            just for you.
          </p>
        </div>
        <Input
          className="mb-4 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <Button
          className="w-full mb-4"
          onClick={handleEmailSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                />
              </svg>
              Signing In...
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
        <p className="flex justify-center text-white text-sm mb-4">Or</p>
        {providers &&
          Object.values(providers)
            .filter((provider) => provider.name !== "Email")
            .map((provider) => (
              <div key={provider.name} className="w-full mb-2">
                <Button
                  className="flex items-center justify-center w-full"
                  onClick={() => handleProviderSignIn(provider.id)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                        />
                      </svg>
                      Signing In...
                    </div>
                  ) : (
                    `Sign in with ${provider.name}`
                  )}
                </Button>
              </div>
            ))}
      </div>
    </div>
  );
}
