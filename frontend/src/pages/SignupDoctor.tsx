import doctor from "../assets/doctorWithPhone.svg";
import whiteLogo from "../assets/white logo.svg";
import mask from "../assets/Mask group.svg";
import ellipse from "../assets/Ellipse.svg";
import circle from "../assets/circle.svg";
import { useState } from "react";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import axios from "axios";
import DropDownWithSearch from "@/components/DropDownWithSearch";
import CountrySelector from "@/components/CountrySelector";
import StateCitySelector from "@/components/StateCitySelector";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Country } from "country-state-city";
import { doctorSpecialisations } from "@/doctorSpecialisations";
import { studentPrograms } from "@/studentPrograms";

function SignupDoctor() {
  const location = useLocation();
  const navigate = useNavigate();

  const localData = localStorage.getItem("Id");

  const id =   localData || location.state  ;


  const userid = parseInt(id);



  console.log(userid);


  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string | null
  >("Specialization");

  function handleSpecializationSelect(option: string) {
    setSelectedSpecialization(option);
  }

  //county and state and city

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [doctorCountry, setDoctorCountry] = useState("");

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    const country = Country.getCountryByCode(countryCode);
    const countryName = country?.name || "";
    console.log(countryName);
    setDoctorCountry(countryName);
  };

  const handleStateCitySelect = (city: string, state: string) => {
    setSelectedCity(city);
    setSelectedState(state);
  };

  const DoctorLocation = `${selectedCity},${selectedState}`;

  //zod schema

  const doctorDetailsSchema = z.object({
    hospitalname: z.string().min(4, { message: "Enter valid Hospital Name" }),
    selectedSpecialization: z
      .string()
      .min(4, { message: "Enter valid Specialization" }),
    doctorCountry: z.string().min(3, { message: "Enter valid Country" }),
    DoctorLocation: z.string().min(3, { message: " Enter valid City" }),
  });

  //details

  const [doctorDetails, setDoctorDetails] = useState("")

  //Handling Gender

  const [selectedProgram, setSelectedProgram] = useState<string>("");




  //handling input changes

  function handleChange(e: any) {
    setDoctorDetails(e);
  }

  function handleProgramSelect(option: string) {
    setSelectedProgram(option);
  }

  //Button click send details to backend

  const finalData = {
    hospitalname : doctorDetails,
    doctorCountry,
    DoctorLocation,
    selectedSpecialization,
  };

  //BACKEND Call

  async function handleClick(e: any) {
    e.preventDefault();

    const result = doctorDetailsSchema.safeParse(finalData);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast.error(`${firstError.path[0]}: ${firstError.message}`);
      return;
    }

    const loadingToast = toast.loading("Loading");

    try {
      const response = await axios.post(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/signup/doctor`, {
        country: doctorCountry,
        city: DoctorLocation,
        organisation_name: doctorDetails,
        department: selectedSpecialization,
        degree : selectedProgram,
        userid,
      });

      console.log(response);

      toast.dismiss(loadingToast);

      toast.success("User Created Successfully");

      navigate("/feed", { state: userid });
    } catch (error: any) {
      toast.dismiss(loadingToast);

      if (error.response?.status === 401) {
        toast.error("Please sign in again");
        navigate("/signup");
        return;
      }

      if (error.response) {
        toast.error(`Error: ${error.response.data}`);
      } else if (error.request) {
        toast.error("No response from the server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }

    console.log(doctorDetails);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Card Container */}
      <div className="relative flex flex-wrap w-[90%] xl:w-[80%] bg-white shadow-2xl rounded-3xl h-[95vh] overflow-hidden">
        {/* Left Section */}
        <div className="hidden lg:flex w-1/2 bg-main flex-col justify-center items-center relative text-white p-10 overflow-hidden">
          {/* Logo */}
          <div className="absolute top-10 left-14 z-10">
            <img src={whiteLogo} alt="Logo" className="w-40 lg:w-56" />
          </div>

          <div className="absolute top-0 right-0">
            <img src={mask} alt="" />
          </div>

          <div className="absolute top-28 left-14">
            <p className="font-mainfont text-xl lg:text-2xl font-medium text-white">
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
          <div className="hidden 2xl:flex flex-row absolute top-[355px] left-[470px] bg-white text-gray-600 px-4 py-2 rounded-b-3xl rounded-tl-3xl shadow-lg xl:w-[140px] z-10">
            <p className="text-xs font-medium">
              Hello, It's nice connecting with you
            </p>
          </div>

          <div className="hidden xl:flex flex-col absolute bottom-40 left-[300px] bg-white text-gray-600 px-4 py-2 rounded-t-3xl rounded-br-3xl shadow-lg w-[190px] z-10">
            <p className="text-xs font-medium">
              Hey, It's great connecting with you too.
            </p>
            <p className="text-xs text-gray-500">Lorem Ipsum dummy text.</p>
          </div>

          {/* Doctor Image */}
          <div>
            <img
              src={doctor}
              alt="Doctor"
              className="object-contain w-[400px] xl:w-[450px] h-auto absolute -bottom-8 left-[-55px] z-10"
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
        <div className="w-full lg:w-1/2 bg-white">
          <div className="flex items-center justify-center h-[95vh] overflow-auto no-scrollbar">
            <div className="bg-white flex-col rounded-lg p-6 lg:p-12 w-full max-w-[600px]">
              {/* Show logo on mobile */}
              <div className="lg:hidden flex justify-center mb-6">
                <img src={whiteLogo} alt="Logo" className="w-40" />
              </div>

              <div>
                <h1 className="text-center text-2xl sm:text-3xl font-semibold">Fill in your details</h1>
              </div>

              <div className="mt-4 sm:mt-6">
                <p className="text-center text-sm sm:text-base font-semibold">
                  Join a network of experts commited to advancing healthcare together
                </p>
              </div>

              <div className="space-y-4 mt-6">
                <DropDownWithSearch
                  place="Hospital / Institute Name"
                  onSelect={handleChange}
                  dropDownOptions={["vamshidhar", "sriprada"]}
                />

                <DropDownWithSearch
                  place="Specialization"
                  onSelect={handleSpecializationSelect}
                  dropDownOptions={doctorSpecialisations}
                />

                <DropDownWithSearch
                  place="Highest Degree (ex: MBBS)"
                  onSelect={handleProgramSelect}
                  dropDownOptions={studentPrograms}
                />

                <CountrySelector onCountrySelect={handleCountrySelect} />

                <StateCitySelector
                  selectedCountry={selectedCountry}
                  onStateCitySelect={handleStateCitySelect}
                />
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Skip
                </Link>
                <button 
                  onClick={handleClick}
                  className="bg-main text-white px-8 py-2 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupDoctor;
