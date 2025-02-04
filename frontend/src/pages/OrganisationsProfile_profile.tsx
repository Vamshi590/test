import InputWithPlaceAndButton from "../components/InputWithPlaceAndButton";
import MainHead from "../components/MainHead";
import HeadAndSub from "../components/HeadAndSub";
import Button from "../components/Button";
import detailsprofile from "../assets/details-profile.svg";
import { useState } from "react";
import DropWithPlace from "../components/DropWithPlace";
import InputWithPlace from "../components/InputWithPlace";
import { useNavigate } from "react-router-dom";
function OrganisationsProfile_profile() {
  const [departments, setDepartments] = useState([]);

  const [departmentsText, setDepartmentsText] = useState("");

  const navigate = useNavigate()

  function handleClick(){
    navigate('/organisation/organisation-verify')
  }

  function handleInterestsChange(e: any) {
    setDepartmentsText(e.target.value);
  }

  const departmentText = departmentsText;

  function handleInterests() {
    //@ts-ignore
    setDepartments([...departments, departmentText]);
    setDepartmentsText("");
  }

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="bg-white flex-col rounded-lg p-8 max-w-md w-full  h-screen">
        <MainHead />
        <img
          src={detailsprofile}
          alt="details nav bar"
          className="w-full h-auto mt-10"
        />

        <div className="mt-8">
          <HeadAndSub
            head="Add Your Proffesional Background"
            sub="Share your expertise, connect with peers and opportunities in the medical field "
          />
        </div>

        <div className="mt-6">
          <div className="mb-3">
            <label htmlFor="interests" className="px-1 text-base font-semibold">
              Key Departments
            </label>
          </div>
          <div
            className={
              departments.length > 0
                ? "border border-main rounded-2xl"
                : "border border-b-main rounded-2xl transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            }
          >
            {departments.length > 0 ? (
              <div className="flex flex-wrap gap-2 px-2 pt-2">
                {departments?.map((skill, index): any => (
                  <span
                    key={index}
                    className="px-3 py-1 text-black border border-second rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={departments.length > 0 ? "mt-3" : ""}>
              <InputWithPlaceAndButton
                type="text"
                place="Enter your Interests"
                value={departmentText}
                onChange={handleInterestsChange}
                onClick={handleInterests}
              />
            </div>
          </div>
        </div>

        <DropWithPlace place="No of Employees" />

        <DropWithPlace place="Founding Year" />

        <InputWithPlace place="Registered Address" />

        <div className="flex-col mt-6 justify-between">
          <Button onClick = {handleClick} label="Next" bgColor="bg-main" textColor="text-white" />
        </div>
      </div>
    </div>
  );
}

export default OrganisationsProfile_profile;
