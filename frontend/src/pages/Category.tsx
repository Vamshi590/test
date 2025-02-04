// components
import doctor from "../assets/doctorWithPhone.svg";
import whiteLogo from "../assets/white logo.svg";
import mask from "../assets/Mask group.svg";
import ellipse from "../assets/Ellipse.svg";
import circle from "../assets/circle.svg";

import CategoryCard from "../components/CategoryCard";

//logos

import organisationLogo from "../assets/organisationlogo.svg";
import doctorLogo from "../assets/doctorLogo.svg";
import studentLogo from "../assets/studentLogo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { BACKEND_URL } from "../config";
import { getCategoryId } from "@/functions";

function Category() {
  //hooks

  const navigate = useNavigate();

  async function handleCategory(category: string) {
    const googleEmail = localStorage.getItem("googleEmail");
    const googlePassword = localStorage.getItem("googlePassword");

    if (googleEmail && googlePassword) {
      try {
        const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
          email: googleEmail,
          password: googlePassword,
          category: category,
        });
        const userId = response.data.id;
        // Clear temporary Google data
        localStorage.removeItem("googleEmail");
        localStorage.removeItem("googlePassword");
        // Navigate to appropriate signup form
        navigate(`/signup/${category}/${userId}`, { state: userId });
      } catch (e) {
        toast.error("Failed to create account");
        console.error(e);
      }
    } else {
      // Handle regular navigation to signup
      localStorage.setItem("category", category);
      navigate(`/signup2`, { state: { id: getCategoryId(category) } });
    }
  }

  // handling category clicks

  function handleOrganisation() {
    handleCategory("organisation");
  }

  function handleDoctor() {
    handleCategory("doctor");
  }

  function handleStudent() {
    handleCategory("student");
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

          <div className="absolute top-[345px] right-[50px]">
            <img src={circle} alt="" className="w-1/2 -rotate-45" />
          </div>

          {/* Chat Bubbles */}
          <div className=" hidden xl:flex flex-row absolute top-[355px] right-[40px] bg-white text-gray-600 px-4 py-2 rounded-b-3xl rounded-tl-3xl shadow-lg xl:w-[150px] z-10">
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
        <div className="w-full flex  lg:w-1/2 bg-white ">
          <div className="bg-white flex flex-col items-center  rounded-lg p-8  w-full ">
            <div className="flex justify-center mb-8">
              <div className="flex-col">
                <p className=" text-center  text-3xl p-2">
                  What describes you BEST?
                </p>
                <p className="text-sm text-gray-500 px-2">
                  Select your role to be a part of vibrant medical network
                </p>
              </div>
            </div>

            <CategoryCard
              title="Doctor"
              subtitle="Medical Professionals and practitioners"
              icon={doctorLogo}
              onClick={handleDoctor}
            />
            <CategoryCard
              title="Medical Student"
              subtitle="Future Healthcare Leaders and Innovaters"
              icon={studentLogo}
              onClick={handleStudent}
            />
            <CategoryCard
              title="Organisation"
              subtitle="Hospitals, Colleges, Societies and Medical companies"
              icon={organisationLogo}
              onClick={handleOrganisation}
            />

            <p className="text-sm text-gray-600 mt-8">
              Already have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
