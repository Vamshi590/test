import axios from "axios";
import React, { useEffect, useState } from "react";

interface VerificationItem {
  name: string;
  idNo: string;
  collegeName: string;
  graduatingYear: string;
  id: string;
  idlink: string;
}



const Verifying: React.FC = () => {

  const id = localStorage.getItem("Id");

  const [data, setData] = useState<VerificationItem[]>([]);

  useEffect(() => {
    getVerificationItems();
  }, []);

  async function getVerificationItems() {
    const response = await axios.get(
      `https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/students/${id}`
    );

    console.log(response.data);
    setData(response.data.students || []);
  }

  const handleAccept = async (id: string) => {
    console.log("Accepted:", id);
    const response = await axios.post(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/student/accept/${id}`,{
     
        id: id,
        status: "Accepted"
      
    })

    console.log(response.data);
  };

  const handleReject = async (id: string) => {
    console.log("Rejected:", id);
    const response = await axios.post(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/student/reject/${id}`,{
     
      id: id,
      status: "Accepted"
    
  })
  console.log(response.data);
};

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 font-fontsm">
      {/* Navigation Tabs */}
      <div className="flex space-x-8 mb-8 border-b border-gray-200">
        <button className="text-gray-500 hover:text-gray-700 pb-4">
          Verify Organization
        </button>
        <button className="text-gray-500 hover:text-gray-700 pb-4">
          Verify Doctor
        </button>
        <button className="text-blue-500 border-b-2 border-blue-500 pb-4">
          Verify Student
        </button>
      </div>

      {/* Verification List */}
      <div className="space-y-6">
        {data.map((item) => (
          <div key={item.id} className="border-b border-gray-200 pb-6">
            <div className="flex justify-evenly gap-8 ">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <div className="text-gray-500 text-sm mb-1">Name</div>
                  <div className="text-gray-900">{item.name}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">College name</div>
                  <div className="text-gray-900">{item.collegeName}</div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4">
                <div>
                  <div className="text-gray-500 text-sm mb-1">
                    Student identification number
                  </div>
                  <div className="text-gray-900">{item.idNo}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">
                    Graduation year
                  </div>
                  <div className="text-gray-900">{item.graduatingYear}</div>
                </div>
              </div>

              <div className="w-[200px] h-[100px] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={item.idlink}
                  alt="Student ID"
                  className="w-full text-gray-600 text-sm h-full object-cover"
                />
              </div>

              {/* Right Column */}

              <div className=" flex items-center">
                <div className="flex  space-x-3 ">
                  <button
                    onClick={() => handleAccept(item.id)}
                    className="px-6 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-600 text-sm hover:bg-green-100 transition-colors"
                  >
                    Accept ✓
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="px-6 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm hover:bg-red-100 transition-colors"
                  >
                    Reject ✗
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Verifying;
