import React, { useEffect, useState } from 'react';
import Modal from '../../common/Modal';

interface AwardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AwardFormData) => void;
  initialData?: AwardFormData;
  isEditing?: boolean;
}

export interface AwardFormData {
  title: string;
  organization: string;
  year: string;
  description: string;
  credentialLink?: string;
}
const emptyFormData: AwardFormData = {

  title: '',

  organization: '',

  year: '',

  description: '',

  credentialLink: ''

};
const AwardForm: React.FC<AwardFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<AwardFormData>(emptyFormData);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen && !isMounted) {
      if (isEditing && initialData) {
        setFormData(initialData);
      } else {
        setFormData(emptyFormData);
      }
      setIsMounted(true);
    }
    if (!isOpen) {
      setIsMounted(false);
    }
  }, [isOpen, isEditing, initialData, isMounted]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  //backend
  

  return (
    <Modal isOpen={isOpen}  onClose={onClose} title={`${isEditing ? 'Edit' : 'Add'} Award and Achievements`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Award Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full text-gray-800 rounded-xl border-gray-300 shadow-sm  focus:ring-maincl focus:ring-1 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full text-gray-800 rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 text-gray-800 rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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
            className="mt-1 block w-full text-gray-800 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="credentialLink" className="block text-sm font-medium text-gray-700">
            Credential Link (Optional)
          </label>
          <input
            type="url"
            id="credentialLink"
            name="credentialLink"
            value={formData.credentialLink}
            onChange={handleChange}
            className="mt-1 block w-full p-2 text-gray-800  rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-3xl  text-maincl bg-gray-100 border border-gray-400  hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-3xl  text-white bg-maincl border border-transparent  hover:bg-fillc"
          >
            {isEditing ? 'Save Changes' : 'Add Award'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AwardForm;
