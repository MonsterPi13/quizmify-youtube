"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

interface Props {
  text: string;
}

const SignInButton: React.FC<Props> = ({ text }) => {
  return <Button onClick={() => signIn("google")}>{text}</Button>;
};

export default SignInButton;
