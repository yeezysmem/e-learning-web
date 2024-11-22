import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignInButton = ({provider}) => {
    return (<Button onClick={() => signIn(provider.id)}>Sign in with GitHub</Button>);
}
 
export default SignInButton;