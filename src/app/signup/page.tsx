"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const SignUp = async (e:any) => {
    try {
      e.preventDefault()
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("response", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setBtnDisabled(false);
    }
  }, [user]);
console.log(btnDisabled);
  return (
    <div className="h-screen flex flex-col items-center justify-center  ">
      <div className=" bg-zinc-800 p-8 rounded-md">
        <h1 className=" text-6xl font-bold flex justify-center">
          {loading ? "LOADING" : "signup"}
        </h1>
        <div>
          <form className=" flex flex-col items-center  gap-8 m-12 text-black">
            <input
              className="px-2 py-2 rounded-md text-zinc-900"
              type="text"
              name="username"
              id=""
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
              placeholder="Enter Your Name"
            />
            <input
              className="px-2 py-2 rounded-md text-black"
              type="text"
              name="email"
              id=""
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              placeholder="Enter Your Email"
            />
            <input
              className="px-2 py-2 rounded-md text-black"
              type="password"
              name="password"
              id=""
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              placeholder="Enter Your Password"
            />

            <button
              type="submit"
              disabled={btnDisabled}
              onClick={SignUp}
              className=" bg-zinc-900 w-24 text-white  py-2 rounded-md "
            >
             {btnDisabled?"fill all field": "Sign Up"}
            </button>
          </form>
          <Link href={"/login"}>Login Page</Link>
        </div>
      </div>
    </div>
  );
}

export default page;
