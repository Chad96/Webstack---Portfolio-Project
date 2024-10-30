// src/api/userService.js

// Example API call with token in header
export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data;
};
