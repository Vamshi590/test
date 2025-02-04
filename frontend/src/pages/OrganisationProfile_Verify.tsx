import MainHead from "../components/MainHead";
import HeadAndSub from "../components/HeadAndSub";
import Button from "../components/Button";
import detailsverification from "../assets/details-verification.svg";
import InputWithPlace from "../components/InputWithPlace";
import UploadFile from "../components/UploadFile";
import { useNavigate } from "react-router-dom";

function OrganisationProfile_Verify() {

  const navigate = useNavigate()

  function handleClick(){
    navigate('/organisation/organisation-interests')
  }


  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
        <div className="bg-white flex-col rounded-lg p-8 max-w-md w-full  h-screen">
          <MainHead />
          <img
            src={detailsverification}
            alt="details nav bar"
            className="w-full h-auto mt-10"
          />

          <div className="mt-8">
            <HeadAndSub
              head="Verify Your Organisation"
              sub="Confirm your identity to access exclusive resources and opportunities tailored for Organisations"
            />
          </div>

          <InputWithPlace place = "Registered ID/ Medical License"/>

          <InputWithPlace place = "Accreditation certificate No"/>

          <InputWithPlace place = "Website URL" />

          <UploadFile label = "Accreditation Certificate" />
       

          <div className="flex-col mt-6 justify-between">
            <Button onClick = {handleClick} label="Next" bgColor="bg-main" textColor="text-white" />
          </div>
        </div>
      </div>
  )
}

export default OrganisationProfile_Verify;