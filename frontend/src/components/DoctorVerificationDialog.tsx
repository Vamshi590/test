import React, { useState } from 'react';

interface DoctorVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { registrationNumber: string, council: string }) => void;
}

export function DoctorVerificationDialog({ isOpen, onClose, onSubmit }: DoctorVerificationDialogProps) {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [council, setCouncil] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const councils = [
    "Medical Council of India",
    "Karnataka Medical Council",
    "Maharashtra Medical Council",
    "Delhi Medical Council",
    // Add more councils as needed
  ];

  const filteredCouncils = councils.filter(c => 
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registrationNumber && council) {
      onSubmit({ registrationNumber, council });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 z-50 w-96">
        <h2 className="text-xl font-semibold mb-4">Doctor Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Registration Number</label>
            <input 
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Medical Council</label>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Search councils..."
            />
            {searchTerm && (
              <div className="absolute w-full bg-white border rounded-b mt-1 max-h-48 overflow-y-auto z-10">
                {filteredCouncils.map((c) => (
                  <div
                    key={c}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCouncil(c);
                      setSearchTerm(c);
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-main text-white py-2 rounded-full hover:bg-opacity-90"
          >
            Submit for Verification
          </button>
        </form>
      </div>
    </div>
  );
} 