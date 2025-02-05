import React, { useEffect, useState } from 'react';
import Modal from '../../common/Modal';

interface MembershipFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MembershipFormData) => void;
  initialData?: MembershipFormData;
  isEditing?: boolean;
}

export interface MembershipFormData {
  name: string;
  category: string;
  image: File | null;
  imagePreview?: string;
  notifyFollowers: boolean;
}

const MembershipForm: React.FC<MembershipFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<MembershipFormData>({
    name: initialData?.name || '',
    category: initialData?.category || '',
    image: null,
    notifyFollowers: initialData?.notifyFollowers || false
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const medicalCategories = [
    "Ophthalmology",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Gastroenterology",
    "Pulmonology",
    "Endocrinology",
    "Oncology",
    "Nephrology"
  ];
  const medicalSocieties = [
    "Indian Medical Association", 
    "Medical Council of India",
    "Indian Dental Association",
    "Association of Physicians of India",
    "Cardiological Society of India",
    "Indian Academy of Pediatrics",
    "Indian Orthopaedic Association",
  ];


  const filteredSocieties = medicalSocieties.filter(society =>
    society.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setFormData(prev => ({
  //       ...prev,
  //       image: file,
  //       imagePreview: URL.createObjectURL(file)
  //     }));
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  useEffect(() => {
    return () => {
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);
  

 
  return (
    <Modal isOpen={isOpen} onClose={onClose}  title={`${isEditing ? 'Edit' : 'Add'} Membership`}>
      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4">
          <div className="flex items-center bg-yellow-100 opacity-80 p-1 justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Notify followers</label>
              <p className="text-xs text-gray-500">Turn on to let your followers know about this award</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="notifyFollowers"
                className="sr-only peer"
                checked={formData.notifyFollowers}
                onChange={(e) => setFormData(prev => ({ ...prev, notifyFollowers: e.target.checked }))}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maincl"></div>
            </label>
          </div>
        </div>
            {/* Organization Name with Suggestions */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1 pt-2">
                Organization Name
              </label>
              <input
                type="text"
                value={searchTerm}
                placeholder='Search Society'
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {showSuggestions && searchTerm && (
                <div className="absolute z-10 w-full mt-1 text-gray-800 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredSocieties.map((society, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      onClick={() => {
                        setSearchTerm(society);
                        setFormData(prev => ({ ...prev, name: society }));
                        setShowSuggestions(false);
                      }}
                    >
                      {society}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full rounded-md border border-gray-300 text-gray-800 px-3 py-2"
              >
                <option value="">Select Category</option>
                {medicalCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
       

            <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Organization Logo
            </label>
            <div className="mt-1 flex items-center space-x-4">
            <div className="flex-shrink-0 relative">
              {formData.image ? (
              <>
                <img
                src={formData.imagePreview || URL.createObjectURL(formData.image)}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-md"
                />
                <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white hover:bg-gray-600"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </button>
              </>
              ) : (
              <div className="h-20 w-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              )}
            </div>
            <div className="flex-grow">
              <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                setFormData(prev => ({ 
                  ...prev, 
                  image: file,
                  imagePreview: URL.createObjectURL(file)
                }));
                }
              }}
              className="hidden"
              />
              <label
              htmlFor="image"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
              Upload Logo
              </label>
            </div>
            </div>
          </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-1 rounded-3xl border text-maincl bg-gray-100 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-1 bg-maincl text-white rounded-3xl hover:bg-fillc"
                disabled={!formData.name || !formData.category || !formData.image}
              >
                Save
              </button>
            </div>
          </form>
    </Modal>
  );
};

export default MembershipForm;