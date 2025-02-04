import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import MainHead from "../components/MainHead";
function VerifyOTP() {

  const location = useLocation()
  const navigate = useNavigate()

  const id = location.state.id;

  function handleVerifyAndNext(){
    if(id === 1){
      navigate('/signup/organisation')
    }else if( id === 2){
      navigate('/signup/doctor')
    }else if (id == 3){
      navigate('/signup/student')
    }
  }
  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="bg-white flex-col rounded-lg p-8 max-w-md w-full  h-screen">
        <MainHead />

        <div className="flex flex-col items-center justify-center mt-12">
          <p className="font-semibold text-lg">Verify Your Email Address</p>

          <p>We've sent a verification OTP to your Email Address</p>

          <div className="max-w-md w-full border rounded-2xl p-2 mt-3 border-main shadow-md">
            <p className="text-center">Vamshiseelam59@gmail.com</p>
          </div>
          <p className="text-center text-lg mt-8 p-4">Please enter the OTP</p>
        </div>

        <div className="flex flex-col w-full px-3">
          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            <div className="w-14 h-14 ">
              <input
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-main"
                type="text"
              />
            </div>
            <div className="w-14 h-14 ">
              <input
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-main"
                type="text"
              />
            </div>
            <div className="w-14 h-14 ">
              <input
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-main"
                type="text"
              />
            </div>
            <div className="w-14 h-14 ">
              <input
                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-main"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button>
              <p className="text-blue-800 font-medium mb-14">
                Resend Verification Mail
              </p>
            </button>
          </div>
        </div>

        <Button
          label="Verify and Next"
          bgColor="bg-main"
          textColor="text-white"
          onClick = {handleVerifyAndNext}
        />
      </div>
    </div>
  );
}

export default VerifyOTP;
