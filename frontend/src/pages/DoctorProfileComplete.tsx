import MainHead from "../components/MainHead";
import SubHeading from "../components/SubHeading";
import tickLogo from "../assets/tickLogo.svg";
import Button from "../components/Button";
import doctorProfileCompleteLogo from "../assets/doctorProfileCompleteLogo.svg";
import { useNavigate } from "react-router-dom";

function DoctorProfileComplete() {

  const navigate = useNavigate()

  function handleClick(){
    navigate('/')
  }


  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="bg-white flex-col rounded-lg p-8 max-w-md w-full  h-screen">
        <div className="flex flex-col items-center">
          <MainHead />

          <SubHeading content="Profile Complete! you're now ready to dive into Docsile Medical community" />

          <div className="flex justify-center mb-2">
            <div className="flex flex-col justify-center items-center">
              <img
                src={tickLogo}
                className="flex justify-center items-center w-1/2 h-1/2"
                alt="done logo"
              />
              <p className="font-bold text-lg pt-2">Profile Done !</p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={doctorProfileCompleteLogo}
              alt="student profile complete logo"
            />
          </div>
          <div className="mt-6">
            <Button onClick = {handleClick} label="Explore" bgColor="bg-main" textColor="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfileComplete;
