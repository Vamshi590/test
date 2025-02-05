import React, { useState } from 'react';
import Modal from '../../common/Modal';

interface ExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExperienceFormData) => void;
  initialData?: ExperienceFormData;
  isEditing?: boolean;
}

export interface ExperienceFormData {
  title: string;
  company: string;
  date: string;
  description: string;
  img?: string | File;
  notifyFollowers?: boolean;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<ExperienceFormData>(
    initialData || {
      title: '',
      company: '',
      date: '',
      description: '',
      img: '',
      notifyFollowers: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${isEditing ? 'Edit' : 'Add'} Experience`}>
      <form onSubmit={handleSubmit} className="space-y-3">
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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-fillc  focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-fillc  focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <div className="flex items-start space-x-2">
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={(e) => {
          const endDate = formData.date.split(' - ')[1] || 'Present';
          setFormData(prev => ({
            ...prev,
            date: `${new Date(e.target.value).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            })} - ${endDate}`
          }));
              }}
              className="mt-1 p-2 flex-1 rounded-md border border-gray-300 shadow-sm focus:border-fillc focus:outline-none"
            />
            <span className="text-gray-500 pt-2">to</span>
            <div className="flex-1">
              <input
          type="date"
          id="endDate"
          name="endDate"
          onChange={(e) => {
            const startDate = formData.date.split(' - ')[0];
            const endDate = e.target.value ? new Date(e.target.value).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            }) : 'Present';
            setFormData(prev => ({
              ...prev,
              date: `${startDate} - ${endDate}`
            }));
          }}
          className="mt-1 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-fillc focus:outline-none"
              />
              <label className="flex items-center mt-1">
          <input
            type="checkbox"
            onChange={(e) => {
              const startDate = formData.date.split(' - ')[0];
              setFormData(prev => ({
                ...prev,
                date: `${startDate} - ${e.target.checked ? 'Present' : ''}`
              }));
            }}
            className="mr-2"
          />
          <span className="text-sm text-gray-600">Currently working here</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-fillc  focus:outline-none"
          />
        </div>
        <div>
            <label htmlFor="img" className="block text-sm font-medium text-gray-700">
            Company Logo
            </label>
            <div className="mt-1 flex items-center space-x-4">
            <div className="w-20 h-20 border-2 border-gray-300 rounded-lg overflow-hidden relative">
              {formData.img ? (
              <>
                <img
                src={typeof formData.img === 'string' ? formData.img : URL.createObjectURL(formData.img)}
                alt="Company logo preview"
                className="w-full h-full object-cover"
                />
                <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, img: '' }))}
                className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                >
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                </button>
              </>
              ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
                </svg>
              </div>
              )}
            </div>
            <div className="flex-1">
              <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                setFormData((prev) => ({ ...prev, img: file }));
                }
              }}
              className="hidden"
              />
              <label
              htmlFor="img"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
              Choose Image
              </label>
            </div>
          </div>
        </div>
        

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-maincl bg-gray-100 border border-gray-300 rounded-3xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-maincl border border-transparent rounded-3xl hover:bg-fillc"
          >
            {isEditing ? 'Save Changes' : 'Add Experience'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ExperienceForm;
