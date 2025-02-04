import Button from "../components/Button";
import MainHead from "../components/MainHead";
import detailsSkills from "../assets/details-skills.svg";
import HeadAndSub from "../components/HeadAndSub";
import { useState } from "react";
import InputWithPlaceAndButton from "../components/InputWithPlaceAndButton";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";


function StudentProfile_Interests() {
  const [topSkills, setTopSkills] = useState([]);
  // const [customTags, setCustomTags] = useState(['Botany', 'Hypermetropia']);
  // const [certifications, setCertifications] = useState([{ organization: '', credentialId: '' }]);
  const [interests, setInterests] = useState([]);

  const [inputText, setInputText] = useState("");

  const [interestsText, setInterestsText] = useState("");

  const navigate = useNavigate()

  function handleChange(e: any) {
    setInputText(e.target.value);
  }

  const text = inputText;

  function handleInterestsChange(e: any) {
    setInterestsText(e.target.value);
  }

  const interestText = interestsText;

  function handleClick() {
    //@ts-ignore
    setTopSkills([...topSkills, text]);

    setInputText("");

    console.log(topSkills);
  }

  function handleInterests() {
    //@ts-ignore
    setInterests([...interests, interestText]);
    setInterestsText("");
  }

  function handleNextClick(){
    navigate('/student/student-profile-complete')
  }

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="bg-white flex-col rounded-lg p-8 max-w-md w-full  h-screen">
        <MainHead />
        <SubHeading content="Complete your profile to unlock the full potential of our platform" />

        <img
          src={detailsSkills}
          alt="details nav bar"
          className="w-full h-auto pt-3"
        />
        <div className="my-8">
          <HeadAndSub
            head="Tell us about your Skills and Interests"
            sub="share your interests and skills to tailor your experience and connect with opportunities"
          />
        </div>
        {/* addSkills */}
        <div className="flex-col justify-start boder-main w-full">
          <div
            className={
              topSkills.length > 0
                ? "border border-main rounded-2xl"
                : "border border-b-main rounded-2xl transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            }
          >
            {topSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2 px-2 pt-2">
                {topSkills?.map((skill, index): any => (
                  <span
                    key={index}
                    className="px-3 py-1 border border-second text-black rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={topSkills.length > 0 ? "mt-3" : ""}>
              <InputWithPlaceAndButton
                type="text"
                place="Enter your skills"
                value={inputText}
                onChange={handleChange}
                onClick={handleClick}
              />
            </div>
          </div>
        </div>

        {/* add interests */}

        <div className="mt-4">
          <div
            className={
              interests.length > 0
                ? "border border-main rounded-2xl"
                : "border border-b-main rounded-2xl transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            }
          >
            {interests.length > 0 ? (
              <div className="flex flex-wrap gap-2 px-2 pt-2">
                {interests?.map((skill, index): any => (
                  <span
                    key={index}
                    className="px-3 py-1 text-black border border-second rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={interests.length > 0 ? "mt-3" : ""}>
              <InputWithPlaceAndButton
                type="text"
                place="Enter your Interests"
                value={interestText}
                onChange={handleInterestsChange}
                onClick={handleInterests}
              />
            </div>
          </div>
        </div>

        
      <div className="flex-col mt-8 justify-between">
        <Button onClick = {handleNextClick} label="Next" bgColor="bg-main" textColor="text-white" />
      </div>
      </div>

    </div>
  );
}

export default StudentProfile_Interests;
