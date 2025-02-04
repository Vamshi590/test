import InputWithPlace from "../components/InputWithPlace";
import DropWithPlace from "../components/DropWithPlace";
import MainHead from "../components/MainHead";
import HeadAndSub from "../components/HeadAndSub";
import Button from "../components/Button";
import doctordetailseducation from "../assets/doctor-details-education.svg"
import { useNavigate } from "react-router-dom";

function DoctorsProfile_education() {

  const navigate = useNavigate()

  function handleClick(){
    navigate('/doctor/doctor-interests')
  }


  return (
<div className="bg-slate-100 flex items-center justify-center h-screen">
        <div className="bg-white flex-col rounded-lg p-8 max-w-md w-full  h-screen">
          <MainHead />
          <img
            src={doctordetailseducation}
            alt="details nav bar"
            className="w-full h-auto mt-10"
          />

          <div className="mt-8">
            <HeadAndSub
              head="Add your Education"
              sub="Highlight your recent academic journey to showcase your commitment to excellence in medical science"
            />
          </div>

          <InputWithPlace type="text" place="College / University Name" />


          <DropWithPlace place="Degree" />

          <DropWithPlace place="Year of Graduation" />

        

          <div className="flex-col mt-6 justify-between">
            <Button onClick = {handleClick} label="Next" bgColor="bg-main" textColor="text-white" />
          </div>
        </div>
      </div>  )
}

export default DoctorsProfile_education