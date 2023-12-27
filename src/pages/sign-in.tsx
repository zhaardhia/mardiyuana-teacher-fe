import { useRouter } from "next/router";
import React, { useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msgError, setMsgError] = useState<string>();
  return (
    <div className="flex md:flex-row flex-col items-center justify-center bg-login-color h-screen lg:gap-36 md:gap-20 ">
      <div className="lg:w-[448px] md:w-[320px] w-[15rem] p-10 items-center justify-center flex">
        <img className="w-[300px]" src="/LogoMY.png" />
      </div>
      <div className="flex items-center md:w-auto w-full">
        <div className="2xl:px-16 lg:px-12 px-5 lg:w-[448px] md:w-[400px] w-[90%] bg-white h-[30rem] rounded-lg bg-login-card border-0 flex flex-col justify-center items-center gap-10 md:mx-0 mx-auto">
          <div className="text-3xl font-semibold text-white">Student Login</div>
          <div className="flex flex-col gap-4 w-[100%]">
            <input
              className="h-10 w-full rounded-xl p-2 text-slate-800"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              className="h-10 w-full rounded-xl p-2 text-slate-800"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="text-xl bg-login-button rounded-lg px-6 py-2"
            // onClick={() => submitUser()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
