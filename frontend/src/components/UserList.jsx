import React from 'react';
const UserList = ({ users, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Full Name</th>
                        <th className="px-6 py-3">Email Address</th>
                        <th className="px-6 py-3">Mobile</th>
                        <th className="px-6 py-3">Gender</th>
                        <th className="px-6 py-3">City</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-600">
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-8 text-gray-400">No active system users matching credentials found.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{user.id}</td>
                                <td className="px-6 py-4">{user.full_name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.mobile_number}</td>
                                <td className="px-6 py-4">{user.gender}</td>
                                <td className="px-6 py-4">{user.city}</td>
                                <td className="px-6 py-4 space-x-3">
                                    <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-900 font-semibold">Edit</button>
                                    <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;