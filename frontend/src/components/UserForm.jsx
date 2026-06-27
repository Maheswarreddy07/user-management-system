import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        mobile_number: '',
        gender: '',
        city: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ full_name: '', email: '', mobile_number: '', gender: '', city: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const { full_name, email, mobile_number, gender, city } = formData;
        if (!full_name || !email || !mobile_number || !gender || !city) {
            setError('All fields are strictly mandatory.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please provide a valid email format.');
            return;
        }
        if (!/^\d{10}$/.test(mobile_number)) {
            setError('Mobile number must be exactly 10 digits.');
            return;
        }

        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
                {initialData ? 'Edit User Details' : 'Register New User'}
            </h3>
            {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
                    <input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" maxLength="10" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
                {initialData && (
                    <button type="button" onClick={onCancel} className="px-4 py-2 border bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        Cancel
                    </button>
                )}
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    {initialData ? 'Update User' : 'Save System Registration'}
                </button>
            </div>
        </form>
    );
};

export default UserForm;