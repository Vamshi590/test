import Button from "../components/Button";
import MainHead from "../components/MainHead";
import SubHeading from "../components/SubHeading";
import detailsverification from "../assets/details-verification.svg";
import HeadAndSub from "../components/HeadAndSub";
import UploadFile from "../components/UploadFile";
import { useNavigate } from "react-router-dom";
function StudentProfile_verify() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/student/student-interests");
  }
  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="bg-white flex-col rounded-lg p-8 max-w-md w-full  h-screen">
        <MainHead />
        <SubHeading content="Complete your profile to unlock the full potential of our platform" />
        <div className="pt-3">
          <img
            src={detailsverification}
            alt="details nav bar"
            className="w-full h-auto"
          />
        </div>

        <div className="mt-8">
          <HeadAndSub head="Verify Your Student ID" sub="" />
        </div>

        <div className="mt-10">
          <UploadFile label="Upload College/University ID" />
        </div>

        <div className="mt-14">
          <p className="text-xs">
            * By clicking 'Verify' you agree that provided Id is yours and is
            original, if any discrepancy you are responsible for actions taken
            by Docsile team
          </p>
        </div>
        <div className="flex-col mt-4 justify-between">
          <Button
            onClick={handleClick}
            label="Verify"
            bgColor="bg-main"
            textColor="text-white"
          />
        </div>
      </div>
    </div>
  );
}

export default StudentProfile_verify;
