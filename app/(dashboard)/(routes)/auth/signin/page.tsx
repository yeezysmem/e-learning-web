"use client";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import login from "@/public/login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Define the type for the providers state
type Provider = {
  id: string;
  name: string;
  type: string;
  // Add any other properties you expect from the provider object
};

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res); // Set the providers state
    };

    fetchProviders();
  }, []);

  const handleEmailSignIn = async () => {
    if (email) {
      setIsLoading(true);
      await signIn("email", { email });
      setIsLoading(false);
    }
  };

  const handleProviderSignIn = async (providerId: string) => {
    setIsLoading(true);
    await signIn(providerId);
    setIsLoading(false);
  };

  return (
    <div className="h-screen bg-gray-200">
      <div className="absolute left-0 top-0 w-[85%] h-full">
        <Image
          src={login}
          alt="Sign In"
          layout="fill"
          objectFit="cover"
          className="h-full"
        />
      </div>
      <div className="absolute right-0 top-0 w-[40%] h-full flex flex-col justify-center items-center bg-black p-10 max-w-lg">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4 flex justify-center">
            Sign In
          </h1>
          <p className="text-sm text-gray-100 mb-4">
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
        <Button className="w-full mb-4" onClick={handleEmailSignIn} disabled={isLoading}>
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
