import doctor from "../assets/doctorWithPhone.svg";
import whiteLogo from "../assets/white logo.svg";
import mask from "../assets/Mask group.svg";
import ellipse from "../assets/Ellipse.svg";
import circle from "../assets/circle.svg";
import googleIcon from "../assets/googleicon.svg";
import appleIcon from "../assets/appleicon.svg";
import logo from "../assets/landing/logo.svg";
import { useState } from "react";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGooglePopup } from "@/firebase";

function SignUp2() {
  //input values
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //agree terms check
  const [isChecked, setIsChecked] = useState(false);

  function checkHandler() {
    setIsChecked((e) => !e);
    console.log(isChecked);
  }

  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state?.id || 2;

  let category = "";
  if (id === 1) {
    category = "organisation";
  } else if (id === 2) {
    category = "doctor";
  } else if (id === 3) {
    category = "student";
  }

  //schema for signup

  const signupSchema = z.object({
    fullname: z.string().min(3, "min 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),

    category: z.enum(["doctor", "student", "organisation"], {
      errorMap: () => ({ message: "Invalid category" }),
    }),
  });

  const finalData = {
    fullname,
    email,
    password,
    category,
  };

  async function handleSignUp(e: any) {
    e.preventDefault();

    const result = signupSchema.safeParse(finalData);
    if (!result.success) {
      const firstError = result.error.errors[0]; // Only the first error
      toast.error(`${firstError.path[0]}: ${firstError.message}`);
      return;
    }

    const accountcreate = toast.loading("creating account");

    try {
      //sending post request to backend
      const response = await axios.post(
        `https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/auth/signup`,
        {
          email: finalData.email,
          password: finalData.password,
          category: finalData.category,
          fullname: finalData.fullname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      if (response) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);

          toast.dismiss(accountcreate);

          toast.success("Signup successful!");

          const userid = response.data.user.id;

          localStorage.setItem("Id", userid);

          if (id === 1) {
            navigate(`/signup/organisation/${userid}`, { state: userid });
          } else if (id === 2) {
            navigate(`/signup/doctor/${userid}`, { state: userid });
          } else if (id == 3) {
            navigate(`/signup/student/${userid}`, { state: userid });
          }
        } catch (e: any) {
          toast.error(e.message || "something went wrong");
        }
      }

 
    } catch (error: any) {
      toast.dismiss(accountcreate);
      if (error.response) {
        toast.error(`Error: ${error.response.data}`);
      } else if (error.request) {
        toast.error("No response from the server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  }


  async function handleGoogleSignup(e: any) {
    e.preventDefault();
    
    const loadingToast = toast.loading("Signing up with Google...");
    
    try {
      const response = await signInWithGooglePopup();
      console.log(response);
      
      if (!response.user?.email) {
        toast.dismiss(loadingToast);
        toast.error("Could not get email from Google account");
        return;
      }

      const axiosResponse = await axios.post(
        `https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/auth/signup`,
        {
          email: response.user.email,
          category: category,
          password: response.user.uid,
        },
        {
          withCredentials: true,
        }
      );

      console.log(axiosResponse);

      const userid = axiosResponse.data.user.id;
      localStorage.setItem("Id", userid);
      const token = await response.user.getIdToken();
      localStorage.setItem("token", token);

      toast.dismiss(loadingToast);
      toast.success("Signup successful!");

      // Navigate based on category
      switch (id) {
        case 1:
          navigate(`/signup/organisation/${userid}`, { state: userid });
          break;
        case 2:
          navigate(`/signup/doctor/${userid}`, { state: userid });
          break;
        case 3:
          navigate(`/signup/student/${userid}`, { state: userid });
          break;
        default:
          toast.error("Invalid user category");
      }

    } catch (error: any) {
      toast.dismiss(loadingToast);
      
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Sign-in popup was closed. Please try again.");
        return;
      }

      if (error.code === 'auth/cancelled-popup-request') {
        toast.error("Another popup is already open");
        return;
      }

      if (error.response) {
        // Backend server error response
        toast.error(`Signup failed: ${error.response.data}`);
      } else if (error.request) {
        // No response from server
        toast.error("Could not connect to server. Please try again later.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred. Please try again.");
      }
      
      console.error("Signup error:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card Container */}
      <div className="relative flex flex-wrap w-[80%] bg-white shadow-2xl rounded-3xl h-[95vh] overflow-hidden">
        {/* Left Section */}
        <div className="hidden lg:flex w-1/2 bg-main flex-col justify-center items-center relative text-white p-10 overflow-hidden">
          {/* Logo */}
          <div className="absolute top-10 left-14 z-10">
            <img src={whiteLogo} alt="Logo" className="w-56" />
          </div>

          <div className="absolute top-0 right-0">
            <img src={mask} alt="" />
          </div>

          <div className="absolute top-28 left-14">
            <p className="font-mainfont text-2xl font-medium text-white">
              Empowering the medical community
            </p>
          </div>

          <div className="absolute top-20 -left-4">
            <img src={circle} alt="" className="w-1/2 rotate-90" />
          </div>

          <div className="absolute top-[345px] left-[450px]">
            <img src={circle} alt="" className="w-1/2 -rotate-45" />
          </div>

          {/* Chat Bubbles */}
          <div className=" hidden xl:flex flex-row absolute top-[355px] left-[470px] bg-white text-gray-600 px-4 py-2 rounded-b-3xl rounded-tl-3xl shadow-lg xl:w-[140px] z-10">
            <p className="text-xs font-medium">
              Hello, It's nice connecting with you
            </p>
          </div>

          <div className=" hidden xl:flex flex-col absolute bottom-40 left-[300px] bg-white text-gray-600 px-4 py-2 rounded-t-3xl rounded-br-3xl shadow-lg w-[190px] z-10">
            <p className="text-xs font-medium">
              Hey, It’s great connecting with you too.
            </p>
            <p className="text-xs text-gray-500">Lorem Ipsum dummy text.</p>
          </div>

          {/* Doctor Image */}
          <div>
            <img
              src={doctor}
              alt="Doctor"
              className="object-contain  w-[400px] xl:w-[450px] h-auto absolute -bottom-8 left-[-55px] z-10"
            />
          </div>

          <div className="absolute -bottom-28 -left-20">
            <img src={ellipse} alt="" />
          </div>

          <div className="absolute -bottom-4 right-8">
            <img src={circle} alt="" />
          </div>
        </div>

        <Toaster />

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-white my-auto">
          {/* Logo for smaller screens */}

          {/* Sign In Header */}
          <div className="flex flex-col justify-center rounded-2xl items-center">
            <div className="text-center w-full">
              <h2 className=" hidden lg:flex items-center justify-center text-2xl lg:text-3xl font-medium text-gray-800">
                Create Docsile account
              </h2>

              <div className=" flex lg:hidden w-full items-center justify-center">
                <img src={logo} alt="" />
              </div>

              <p className="text-gray-500 text-xs mb-6 mt-4">
                It's nice to see you here, Ready to connect?
              </p>
            </div>

            <div className=" flex flex-col space-y-4 w-full mt-6 items-center justify-center">
              <input
                type="text"
                className="bg-btnClr px-4 py-2 rounded-xl w-96"
                placeholder="Full Name"
                value={fullname}
                onChange={(e: any) => {
                  setFullname(e.target.value);
                }}
              />
              <input
                type="text"
                className="bg-btnClr  px-4 py-2 rounded-xl w-96"
                placeholder="Email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                type="text"
                className="bg-btnClr px-4 py-2 rounded-xl w-96"
                placeholder="Password"
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center justify-between text-sm w-96 mt-6">
              <label className="flex items-center">
                <input
                  onChange={checkHandler}
                  checked={isChecked}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-xs text-gray-600">
                  I agree to Docsile's Terms of Service and Privacy Policy.
                </span>
              </label>
            </div>

            <div
              onClick={handleSignUp}
              className="bg-main rounded-full px-3 py-3 w-96 text-center mt-6 cursor-pointer"
            >
              <p className="text-white text-sm">Sign up</p>
            </div>

            <div className="flex items-center mt-8 mb-4">
              <div className="w-32 h-px bg-gradient-to-l from-gray-300 to-white"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="w-32 h-px bg-gradient-to-r from-gray-300 to-white"></div>
            </div>

            <div className="flex space-x-16">
              <button
                onClick={handleGoogleSignup}
                type="button"
                className="w-10 h-10 flex justify-center items-center rounded-full"
              >
                <img src={googleIcon} alt="Google" className="w-10 h-10" />
              </button>
              <button
                type="button"
                className="w-10 h-10 flex justify-center items-center rounded-full"
              >
                <img src={appleIcon} alt="Apple" className="w-10 h-10" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-8">
              Already have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp2;
