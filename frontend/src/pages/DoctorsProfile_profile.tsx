import MainHead from "../components/MainHead";
import HeadAndSub from "../components/HeadAndSub";
import InputWithPlace from "../components/InputWithPlace";
import DropWithPlace from "../components/DropWithPlace";
import Button from "../components/Button";
import doctordetailsprofile from "../assets/doctor-details-profile.svg";
import InputWithPlaceAndButton from "../components/InputWithPlaceAndButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorsProfile_profile() {
  const [consultations, setConsultations] = useState([]);

  const [consultationsText, setConsultationsText] = useState("");

  const navigate = useNavigate();

  function handleClick(){
    navigate('/doctor/doctor-education')
  }

  function handleInterestsChange(e: any) {
    setConsultationsText(e.target.value);
  }

  const consultationText = consultationsText;

  function handleInterests() {
    //@ts-ignore
    setConsultations([...consultations, consultationText]);
    setConsultationsText("");
  }
  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="bg-white flex-col rounded-lg p-8 max-w-md w-full  h-screen">
        <MainHead />
        <img
          src={doctordetailsprofile}
          alt="details nav bar"
          className="w-full h-auto mt-10"
        />

        <div className="mt-8">
          <HeadAndSub
            head="Add your Professional background"
            sub="Share your expertise, Specialization, and your medical identity"
          />
        </div>

        <InputWithPlace type="text" place="Hospital / Clinic Name" />

        <InputWithPlace type="text" place="Register ID/ Medical license" />

        <DropWithPlace place="Years of experience" />

        <DropWithPlace place="Specialization" />

        <div className="mt-4">
          <div
            className={
              consultations.length > 0
                ? "border border-main rounded-2xl"
                : "border border-b-main rounded-2xl transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            }
          >
            {consultations.length > 0 ? (
              <div className="flex flex-wrap gap-2 px-2 pt-2">
                {consultations?.map((skill, index): any => (
                  <span
                    key={index}
                    className="px-3 py-1 text-black border border-second rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={consultations.length > 0 ? "mt-5" : ""}>
              <InputWithPlaceAndButton
                type="text"
                place="Enter Consultaions Offered"
                value={consultationText}
                onChange={handleInterestsChange}
                onClick={handleInterests}
              />
            </div>
          </div>
        </div>

        <div className="flex-col mt-6 justify-between">
          <Button onClick = {handleClick} label="Next" bgColor="bg-main" textColor="text-white" />
        </div>
      </div>
    </div>
  );
}

export default DoctorsProfile_profile;
