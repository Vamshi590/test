import React, { useState } from 'react';

interface StudentVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organisationName: string;
  onSubmit: (data: { idCard: File, startYear: string, endYear: string }) => void;
}

export function StudentVerificationDialog({ isOpen, onClose, organisationName, onSubmit }: StudentVerificationDialogProps) {
  const [idCard, setIdCard] = useState<File | null>(null);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idCard && startYear && endYear) {
      onSubmit({ idCard, startYear, endYear });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 z-50 w-96">
        <h2 className="text-xl font-semibold mb-4">Student Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Organization</label>
            <input 
              type="text" 
              value={organisationName} 
              disabled 
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">ID Card</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setIdCard(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Year</label>
              <input 
                type="number" 
                min="2000" 
                max="2024"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Year</label>
              <input 
                type="number"
                min="2000"
                max="2030"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
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