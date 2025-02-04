import MainHead from "../components/MainHead";
import HeadAndSub from "../components/HeadAndSub";
import Button from "../components/Button";
import detailsverification from "../assets/details-verification.svg";
import InputWithPlaceAndButton from "../components/InputWithPlaceAndButton";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrganisationProfile_interests() {
  const [interests, setInterests] = useState([]);

  const [interestsText, setInterestsText] = useState("");

  const navigate = useNavigate()


  function handleClick(){
    navigate("/organisation/organisation-profile-complete")
  }

  function handleInterestsChange(e: any) {
    setInterestsText(e.target.value);
  }

  const interestText = interestsText;

  function handleInterests() {
    //@ts-ignore
    setInterests([...interests, interestText]);
    setInterestsText("");
  }

  const [socialLinks, setSocialLinks] = useState([
    { platform: "LinkedIn", link: "" },
  ]);

  const handleSocialLinkChange = (index: any, field: any, value: any) => {
    const updatedLinks = [...socialLinks];
    //@ts-ignore
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "LinkedIn", link: "" }]);
  };

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
            head="Tell Us About Your Organisation"
            sub="Showcase your mission, achievements, and services to drive collaboration with others."
          />
        </div>

        <div className="mt-6">
          <div>
            <label htmlFor="interests" className="px-1 text-base font-semibold">
              Area of Interests
            </label>
          </div>
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

        <div className="mt-4 ">
          <label htmlFor="description" className="text-base font-semibold">
            Description
          </label>
        </div>
        <textarea
          name="descriprion"
          id="description"
          className="w-full border p-2 border-main rounded-2xl transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Overview of your Mission, Values and Service"
        ></textarea>

        <div className="mt-4 flex flex-col">
          <label htmlFor="label" className="px-1 text-base font-semibold">
            Social Media Links
          </label>

          <div>
            {socialLinks.map((socialLink, index) => (
              <div key={index} className="mt-2">
                <div className="flex items-center">
                  <select
                    value={socialLink.platform}
                    onChange={(e) =>
                      handleSocialLinkChange(index, "platform", e.target.value)
                    }
                    className="px-3 py-3 bg-transparent   text-sm border border-main rounded-2xl  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    {/* Add more social platform options here */}
                    <option value="Twitter">Twitter</option>
                    <option value="Facebook">Facebook</option>
                  </select>
                  <input
                    type="text"
                    value={socialLink.link}
                    onChange={(e) =>
                      handleSocialLinkChange(index, "link", e.target.value)
                    }
                    placeholder="Paste Your Link Here"
                    className="w-full px-3 py-3 bg-transparent  text-sm border border-main rounded-2xl  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className=" flex justify-end px-2 text-base font-semibold"
          onClick={addSocialLink}
        >
          <button>+Add</button>
        </div>

        <div className="flex-col mt-6 justify-between">
          <Button onClick = {handleClick} label="Next" bgColor="bg-main" textColor="text-white" />
        </div>
      </div>
    </div>
  );
}

export default OrganisationProfile_interests;
