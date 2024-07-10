import React, { useEffect, useState } from 'react';
import './userProfile.css';
import countryCodes from '../../assets/countrycode/countrycode.json';
import nationalities from '../../assets/nationalities/nationalities.json';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        name: 'Híp Châu',
        displayName: '',
        email: 'tobaohip05@gmail.com',
        phoneNumber: '',
        countryCode: '+84',
        dateOfBirth: '',
        month: '',
        day: '',
        year: '',
        nationality: '',
        gender: '',
        address: '',
        avatarUrl: ''
    });

    const [editField, setEditField] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setUserData({ ...userData, avatarUrl: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (field) => {
        if (field === 'avatar') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData({ ...userData, avatarUrl: reader.result });
                localStorage.setItem('currentUser', JSON.stringify({ ...userData, avatarUrl: reader.result }));
            };
            if (avatarFile) {
                reader.readAsDataURL(avatarFile);
            }
        } else if (field === 'dateOfBirth') {
            const dateOfBirth = `${userData.year}-${userData.month}-${userData.day}`;
            setUserData({ ...userData, dateOfBirth });
            localStorage.setItem('currentUser', JSON.stringify({ ...userData, dateOfBirth }));
        } else {
            localStorage.setItem('currentUser', JSON.stringify(userData));
        }
        setEditField(null);
    };

    const handleCancel = () => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
        setEditField(null);
    };

    const triggerFileInput = () => {
        document.getElementById('avatarInput').click();
    };

    const renderField = (field, label) => {
        const isEditable = editField === field;
        let fieldContent;

        switch (field) {
            case 'phoneNumber':
                fieldContent = isEditable ? (
                    <div className="phone-input-wrapper">
                        <select
                            name="countryCode"
                            value={userData.countryCode}
                            onChange={handleChange}
                            className="country-code-select"
                        >
                            {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name} ({country.code})
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                            className="phone-input"
                        />
                    </div>
                ) : (
                    <span>{`${userData.countryCode} ${userData.phoneNumber}`}</span>
                );
                break;
            case 'dateOfBirth':
                fieldContent = isEditable ? (
                    <div className="dob-input-wrapper">
                        <select name="month" onChange={handleChange} value={userData.month}>
                            <option value="">Month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        <input
                            type="text"
                            name="day"
                            placeholder="DD"
                            value={userData.day}
                            onChange={handleChange}
                            className="dob-input"
                        />
                        <input
                            type="text"
                            name="year"
                            placeholder="YYYY"
                            value={userData.year}
                            onChange={handleChange}
                            className="dob-input"
                        />
                    </div>
                ) : (
                    <span>{userData.dateOfBirth}</span>
                );
                break;
            case 'gender':
                fieldContent = isEditable ? (
                    <select name={field} value={userData[field]} onChange={handleChange}>
                        <option value="">Select your {label.toLowerCase()}</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                ) : (
                    <span>{userData[field]}</span>
                );
                break;
            case 'nationality':
                fieldContent = isEditable ? (
                    <select name={field} value={userData[field]} onChange={handleChange}>
                        <option value="">Select your {label.toLowerCase()}</option>
                        {nationalities.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span>{userData.nationality}</span>
                );
                break;
            default:
                fieldContent = isEditable ? (
                    <input
                        type="text"
                        name={field}
                        value={userData[field]}
                        onChange={handleChange}
                    />
                ) : (
                    <span>{userData[field]}</span>
                );
                break;
        }

        return (
            <div className="profile-row" key={field}>
                <div className="profile-label">{label}</div>
                <div className="profile-value">
                    {fieldContent}
                </div>
                <div className="profile-edit">
                    {isEditable ? (
                        <>
                            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                            <button className="save-button" onClick={() => handleSave(field)}>Save</button>
                        </>
                    ) : (
                        <button className="edit-button" onClick={() => setEditField(field)}>Edit</button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="user-profile">
            <div className="profile-content">
                <h1>Personal details</h1>
                <p>Update your info and find out how it's used.</p>
                <div className="profile-info">
                    <div className="avatar-section" onClick={triggerFileInput}>
                        <img
                            src={userData.avatarUrl || 'default-avatar.png'}
                            alt="User Avatar"
                            className="avatar"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="avatar-input"
                            id="avatarInput"
                            style={{ display: 'none' }}
                        />
                    </div>
                    {renderField('name', 'Name')}
                    {renderField('displayName', 'Display name')}
                    {renderField('email', 'Email address')}
                    {renderField('phoneNumber', 'Phone number')}
                    {renderField('dateOfBirth', 'Date of birth')}
                    {renderField('nationality', 'Nationality')}
                    {renderField('gender', 'Gender')}
                    {renderField('address', 'Address')}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
