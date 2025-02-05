import React, { useState } from 'react';
import Modal from '../../common/Modal';

interface EducationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EducationFormData) => void;
  initialData?: EducationFormData;
  isEditing?: boolean;
}

export interface EducationFormData {
  institution: string;
  degree: string;
  year: string;
  logo: string | File;
  notifyFollowers: boolean;
}

const EducationForm: React.FC<EducationFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<EducationFormData>(
    initialData || {
      institution: '',
      degree: '',
      year: '',
      logo: '',
      notifyFollowers: false,
    }
    
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${isEditing ? 'Edit' : 'Add'} Education`}>
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
        <div>
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
            Institution
          </label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-fillc focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-fillc focus:outline-none"
          />
        </div>

        
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year 
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              id="startYear"
              name="startYear"
              value={formData.year.split(' - ')[0] || ''}
              onChange={(e) => {
                const [, endDate] = formData.year.split(' - ');
                const newYear = `${e.target.value}${endDate ? ' - ' + endDate : ''}`;
                setFormData(prev => ({ ...prev, year: newYear }));
              }}
              className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-fillc focus:outline-none"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              id="endYear"
              name="endYear"
              value={formData.year.split(' - ')[1] || ''}
              onChange={(e) => {
                const [startDate] = formData.year.split(' - ');
                const newYear = `${startDate}${e.target.value ? ' - ' + e.target.value : ''}`;
                setFormData(prev => ({ ...prev, year: newYear }));
              }}
              className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-fillc focus:outline-none"
            />
          </div>
        </div>

       
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
            Institution Logo
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="flex-shrink-0 relative">
              {formData.logo ? (
          <>
            <img
              src={typeof formData.logo === 'string' ? formData.logo : URL.createObjectURL(formData.logo)}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, logo: '' }))}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 focus:outline-none"
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
          id="logo"
          name="logo"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFormData(prev => ({ ...prev, logo: file }));
            }
          }}
          className="hidden"
              />
              <label
          htmlFor="logo"
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
          Upload Logo
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-maincl bg-white border border-gray-300 rounded-3xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-maincl border border-transparent rounded-3xl hover:bg-fillc"
          >
            {isEditing ? 'Save Changes' : 'Add Education'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EducationForm;
