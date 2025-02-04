import doctor from "../assets/doctorWithPhone.svg";
import whiteLogo from "../assets/white logo.svg";
import mask from "../assets/Mask group.svg";
import ellipse from "../assets/Ellipse.svg";
import circle from "../assets/circle.svg";
import googleIcon from "../assets/googleicon.svg";
import appleIcon from "../assets/appleicon.svg";
import logo from "../assets/landing/logo.svg"

function LoginPage() {
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
          <div className=" hidden xl:flex absolute top-[355px] left-[470px] bg-white text-gray-600 px-4 py-2 rounded-b-3xl rounded-tl-3xl shadow-lg xl:w-[140px] z-10">
            <p className="text-xs font-medium">
              Hello, It's nice connecting with you
            </p>
          </div>

          <div className="absolute bottom-40 left-[300px] bg-white text-gray-600 px-4 py-2 rounded-t-3xl rounded-br-3xl shadow-lg w-[190px] z-10">
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

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-white lg:p-10 my-auto">
          {/* Logo for smaller screens */}
        

          {/* Sign In Header */}
          <div className="flex flex-col justify-center rounded-2xl items-center">
            <div className="text-center w-full">
              <h2 className=" hidden lg:flex items-center justify-center text-2xl lg:text-3xl font-medium text-gray-800">
                Welcome Back!
              </h2>

              <div className=" flex lg:hidden w-full items-center justify-center">
                <img src={logo} alt="" />
              </div>

              
             
              <p className="text-gray-500 text-xs mb-6 mt-4">
                It's nice to see you again, Ready to connect?
              </p>
            </div>

            <div className=" flex flex-col space-y-4 w-full mt-6 items-center justify-center">
              <input
                type="text"
                className="bg-btnClr px-4 py-2 rounded-xl w-80"
                placeholder="Email"
              />

              <input
                type="text"
                className="bg-btnClr px-4 py-2 rounded-xl w-80"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between text-sm w-80 mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="bg-main rounded-full px-3 py-3 w-80 text-center mt-6">
              <p className="text-white text-sm">Sign In</p>
            </div>

            <div className="flex items-center my-8">
              <div className="w-32 h-px bg-gradient-to-l from-gray-300 to-white"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="w-32 h-px bg-gradient-to-r from-gray-300 to-white"></div>
            </div>

            <div className="flex space-x-16">
              <button
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
              Don’t have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
  

export default LoginPage;
