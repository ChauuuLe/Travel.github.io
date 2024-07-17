import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/users/current', {
                    headers: { 'x-access-token': token }
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">User Profile</div>
                        <div className="card-body">
                            <h5 className="card-title">Username: {user.username}</h5>
                            <p className="card-text">Email: {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
