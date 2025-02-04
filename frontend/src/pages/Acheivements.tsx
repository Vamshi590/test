import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { BACKEND_URL } from "@/config";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const CustomInput: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="my-4">
    <label className="block text-md   font-semibold mb-1">{label}</label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full  py-2 border-b placeholder:text-sm border-b-main focus:outline-none "
    />
  </div>
);

function Acheivements() {
  const [formData, setFormData] = useState({
    awardName: "",
    issuingOrganization: "",
    issueDate: "",
    description: "",
  });

  const { id } = useParams(); // Get user ID from URL params

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleCancel(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/profile/${id}`);
  }

  //backend

  async function handleSubmit() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/add-certificate/${id}`,
        {
          awardName: formData.awardName,
          issuingOrganisation: formData.issuingOrganization,
          issueDate: formData.issueDate,
          descreption: formData.description,
        }
      );

      console.log(response);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg p-2 max-w-sm w-full shadow-md space-y-4 relative h-screen">
        <div className={`transition-transform duration-500 ease-in-out `}>
          <>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex flex-row justify-between items-center w-full p-2">
                <MdOutlineClose
                  onClick={handleCancel}
                  className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700 mb-3"
                />
                <h2 className="text-xl font-semibold mb-4">Add Achievements</h2>

                <div className="flex justify-end items-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 px-3 py-1 rounded-full text-white cursor-pointer hover:bg-blue-600 transition duration-300"
                  >
                    <p>Add</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Inputs */}

            <div className="flex flex-col justify-center  p-2 w-full">
              <CustomInput
                label="Award Name"
                name="awardName"
                placeholder="Ex: Dr. B. C. Roy National Award"
                value={formData.awardName}
                onChange={handleChange}
              />
              <CustomInput
                label="Awarded By"
                name="issuingOrganization"
                placeholder="Ex: National Medical Commision"
                value={formData.issuingOrganization}
                onChange={handleChange}
              />
              <CustomInput
                label="Awarded On"
                name="issueDate"
                type="date"
                placeholder="Ex: 2024-01-01"
                value={formData.issueDate}
                onChange={handleChange}
              />
            </div>

            <div className="mb-8 mt-4 border-b border-b-main">
              <label className="block text-base px-2 font-semibold mb1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="A brief description of what the award entails or its relevance"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-2 py-2 placeholder:text-sm rounded-2xl focus:outline-none "
                rows={3}
              ></textarea>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default Acheivements;
