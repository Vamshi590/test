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

function Experience() {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    startDate: "",
    endDate: "",
    location: "",
    currentlyWorking: false,
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

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
        `${BACKEND_URL}/add-professional-experience/${id}`,
        {
          title: formData.title,
          organisation: formData.organization,
          startDate: formData.startDate,
          endDate : formData.endDate,
          location: formData.location,
        }
      );

      console.log(response);
      navigate(`/profile/${id}`);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="bg-slate-100 flex items-center justify-center  overflow-auto no-scrollbar">
      <div className="bg-white rounded-lg p-2 max-w-sm w-full shadow-md space-y-4 relative h-screen overflow-auto no-scrollbar">
        <div className={`transition-transform duration-500 ease-in-out `}>
          <>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex flex-row justify-between items-center w-full p-2">
                <MdOutlineClose
                  onClick={handleCancel}
                  className="text-2xl text-gray-500 cursor-pointer hover:text-gray-700 mb-3"
                />
                <h2 className="text-xl font-semibold mb-4">Add Experience</h2>

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
                label="Title"
                name="title"
                placeholder="Ex: Surgeon"
                value={formData.title}
                onChange={handleChange}
              />
              <CustomInput
                label="Organisation"
                name="organization"
                placeholder="Ex: Gandhi Hospital"
                value={formData.organization}
                onChange={handleChange}
              />

              <div className="flex flex-col items-center space-y-4 p-4">
                {/* Date Inputs */}
                <div className="flex space-x-4 items-center">
                  {/* Start Date */}
                  <div className="flex flex-col border-b border-b-main">
                    <label className="text-sm font-semibold mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange2}
                      required
                      className=" rounded-lg px-4 py-2 focus:outline-none "
                    />
                  </div>

                  {/* End Date */}
                  <div className="flex flex-col border-b border-b-main">
                    <label className="text-sm font-semibold mb-1">
                      {formData.currentlyWorking
                        ? "End Date or Present"
                        : "End Date"}
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      placeholder={formData.currentlyWorking ? "Present" : ""}
                      className=" rounded-lg px-4 py-2 focus:outline-none "
                    />
                  </div>
                </div>
              </div>
              {/* Checkbox */}
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentlyWorking: e.target.checked,
                      endDate: e.target.checked ? "" : prev.endDate,
                    }))
                  }
                  className="w-4 h-4"
                />
                <label
                  htmlFor="currentlyWorking"
                  className="text-sm font-semibold"
                >
                  Currently working here
                </label>
              </div>
              <div className="mt-4">
                <CustomInput
                  label="Location"
                  name="location"
                  placeholder="Ex: Gandhi Hospital"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default Experience;
