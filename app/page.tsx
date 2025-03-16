'use client';

import { useState, useEffect } from 'react';

interface FormData {
  name: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
}

const initialFormData: FormData = {
  name: '',
  dob: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
};

const BasicDetails = ({ formData, errors, handleChange }: { formData: FormData; errors: Partial<FormData>; handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Details</h3>
    <input className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
    <input className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300" type="date" name="dob" value={formData.dob} onChange={handleChange} />
    {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
    <select className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300" name="gender" value={formData.gender} onChange={handleChange}>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
  </div>
);

const ContactDetails = ({ formData, errors, handleChange }: { formData: FormData; errors: Partial<FormData>; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h3>
    <input className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    <input className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
    <input className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
  </div>
);

const Summary = ({ formData }: { formData: FormData }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-gray-800">Summary</h3>
    <p className="mb-2"><strong>Name:</strong> {formData.name}</p>
    <p className="mb-2"><strong>Date of Birth:</strong> {formData.dob}</p>
    <p className="mb-2"><strong>Gender:</strong> {formData.gender}</p>
    <p className="mb-2"><strong>Email:</strong> {formData.email}</p>
    <p className="mb-2"><strong>Phone:</strong> {formData.phone}</p>
    <p className="mb-2"><strong>Address:</strong> {formData.address}</p>
  </div>
);

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const validateStep = (): boolean => {
    let newErrors: Partial<FormData> = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.dob) newErrors.dob = 'Date of Birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    } else if (step === 2) {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Valid email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.address) newErrors.address = 'Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => validateStep() && setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = () => validateStep() && alert('Form Submitted Successfully!');

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-2xl border mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Step {step} of 3</h2>
      {step === 1 && <BasicDetails formData={formData} errors={errors} handleChange={handleChange} />}
      {step === 2 && <ContactDetails formData={formData} errors={errors} handleChange={handleChange} />}
      {step === 3 && <Summary formData={formData} />}
      <div className="flex justify-between mt-6">
        {step > 1 && <button className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600" onClick={handleBack}>Back</button>}
        {step < 3 && <button className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600" onClick={handleNext}>Next</button>}
        {step === 3 && <button className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600" onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
}
