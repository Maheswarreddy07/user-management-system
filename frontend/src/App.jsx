import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';

const API_URL = 'http://localhost:5000/users';

const App = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });

    const displayAlert = (message, type = 'success') => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: '', type: '' }), 4000);
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}?search=${searchTerm}`);
            setUsers(response.data);
        } catch (error) {
            displayAlert('Failed loading users data pool.', 'error');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [searchTerm]);

    const handleCreateOrUpdate = async (formData) => {
        try {
            if (editingUser) {
                await axios.put(`${API_URL}/${editingUser.id}`, formData);
                displayAlert('User details successfully modified!');
                setEditingUser(null);
            } else {
                await axios.post(API_URL, formData);
                displayAlert('New application user safely stored.');
            }
            fetchUsers();
        } catch (error) {
            displayAlert(error.response?.data?.message || 'Transaction submission exception.', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you absolutely certain you want to purge this record entry?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                displayAlert('User safely wiped from tracking index.');
                fetchUsers();
            } catch (error) {
                displayAlert('Error removing user reference file.', 'error');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">User Management Matrix (CRUD)</h2>

                {alert.message && (
                    <div className={`mb-4 p-4 rounded-md shadow text-sm font-medium ${alert.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                        {alert.message}
                    </div>
                )}

                <UserForm
                    onSubmit={handleCreateOrUpdate}
                    initialData={editingUser}
                    onCancel={() => setEditingUser(null)}
                />

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <UserList users={users} onEdit={(user) => setEditingUser(user)} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default App;