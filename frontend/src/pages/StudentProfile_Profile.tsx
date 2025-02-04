import Button from "../components/Button";
import MainHead from "../components/MainHead";
import SubHeading from "../components/SubHeading";
import detailsprofile from "../assets/details-profile.svg";
import HeadAndSub from "../components/HeadAndSub";
import InputWithPlace from "../components/InputWithPlace";
import DropWithPlace from "../components/DropWithPlace";
import { useNavigate } from "react-router-dom";

function StudentProfile_Profile() {

  const navigate = useNavigate()

  function handleClick(){
    navigate('/student/student-profile-2')
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
       
        <div className="pt-4">
          <HeadAndSub
            head="Add your Professional background"
            sub="Share your expertise, Specialization, and your medical identity"
          />
        </div>

        <InputWithPlace type="text" place="College / University Name" />

        <InputWithPlace type="text" place="Degree" />
        <InputWithPlace type="text" place="Specialization" />

        <div className="grid grid-cols-4 gap-2 flex-col items-center justify-center mt-4">
          <div className="col-span-2">
            <DropWithPlace place="Start Year" />
          </div>
          <div className="col-span-2">
            <DropWithPlace place="End Year" />
          </div>
        </div>

        <div></div>

        <div className="flex-col mt-6 justify-between">
          <Button onClick = {handleClick} label="Next" bgColor="bg-main" textColor="text-white" />
        </div>
      </div>
    </div>
  );
}

export default StudentProfile_Profile;
