import React, { useRef } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Buttons";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate()
    //@ts-ignore
  const usernameRef = useRef<HTMLInputElement>();
  //@ts-ignore
  const passwordRef = useRef<HTMLInputElement>();
  async function signUp() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
    });

    navigate("/signin")
    alert("You have signed Up");
  }
  return (
    <div className="w-full min-h-screen  flex justify-center items-center">
      <div className="w-[300px] p-8 bg-slate-400 rounded-lg shadow-md">
        <Input reference={usernameRef} placeholder="UserName" />
        <Input reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center items-center">
          <Button onClick={signUp} variant="primary" text="Sign Up" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
