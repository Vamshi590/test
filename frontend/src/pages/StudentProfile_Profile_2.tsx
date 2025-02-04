import Button from "../components/Button";
import MainHead from "../components/MainHead";
import SubHeading from "../components/SubHeading";
import detailsprofile from "../assets/details-profile.svg";
import HeadAndSub from "../components/HeadAndSub";
import InputWithPlace from "../components/InputWithPlace";
import { useNavigate } from "react-router-dom";
function StudentProfile_Profile_2() {

  const navigate = useNavigate()

  function handleClick(){
    navigate('/student/student-verify')
  }


  return (

<div className="bg-slate-100 flex items-center justify-center h-screen">
        <div className="bg-white flex-col rounded-lg p-8 max-w-md w-full  h-screen">
          <MainHead />
          <SubHeading content="Complete your profile to unlock the full potential of our platform" />
          <div className="pt-3">
             <img
            src={detailsprofile}
            alt="details nav bar"
            className="w-full h-auto"
          />
          </div>
         
          <div className="pt-5">
             <HeadAndSub head = "Add your most recent work experience" sub = "Detail your hands-on experience to demonstrate your growing expertise in the medical field" />
          </div>
         

          <InputWithPlace type="text" place="Most recent Job title" />

          <InputWithPlace type="text" place="Most recent Organisation" />


          <div></div>

          <div className="flex-col mt-6 justify-between">
            <Button onClick = {handleClick} label="Next" bgColor="bg-main" textColor="text-white" />
          </div>
        </div>
      </div>)
}

export default StudentProfile_Profile_2