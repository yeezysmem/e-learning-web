import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
  } from "next"
  import { getProviders, signIn } from "next-auth/react"
  import { getServerSession } from "next-auth/next"
  import { authOptions } from "./authOptions"
  
  export default function SignIn({
    providers,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
      <div>
        <div>
          <h1>Sign Insss</h1>
        </div>
        {/* {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name} 
            </button>
          </div>
        ))} */}
      </div>
    )
  }
  
  export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)
  
    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
      return { redirect: { destination: "/search" } }
    }
  
    const providers = await getProviders()
  
    return {
      props: { providers: providers ?? [] },
    }
  }