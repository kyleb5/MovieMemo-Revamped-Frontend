import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CreateUserData {
  email: string;
  username: string;
  uid: string;
}

interface CreateUserResponse {
  success: boolean;
  message?: string;
  user?: any;
}

export async function createUser(userData: CreateUserData): Promise<CreateUserResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/create/`, {
      email: userData.email,
      username: userData.username,
      uid: userData.uid,
    });

    return {
      success: true,
      user: response.data,
    };
  } catch (error: any) {
    console.error('Error creating user:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to create user',
    };
  }
}

export async function getUserByUsername(username: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/username/${username}/`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching user by username:', error);
    return null;
  }
}

export async function getUserByUid(uid: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${uid}/`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching user by username:', error);
    return null;
  }
}

export async function userUsernameExists(username: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/check/username/${username}/`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching user by username:', error);
    return null;
  }
}

// Better function specifically for checking if user exists
export async function userExists(uid: string): Promise<boolean> {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/check/${uid}/`);
    return !!response.data.exists;
  } catch (error: any) {
    console.error('Error checking if user exists:', error);
    return false;
  }
}

export async function changeUsername(uid: string, newUsername: string) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${uid}/change_username/`,
      { new_username: newUsername },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      message: response.data.message || 'Username changed successfully.',
      user: response.data.user,
      remaining: response.data.remaining || null,
    };
  } catch (error: any) {
    // Handle Django error responses
    if (error.response?.data) {
      return {
        success: false,
        error: error.response.data.message || error.response.data.error || 'Failed to change username.',
        remaining: error.response.data.remaining || null,
      };
    }
    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
      return {
        success: false,
        error: 'Unable to connect to the server. Please check your internet connection.',
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred while changing your username.',
    };
  }
}

// Update user's profile picture
export async function updateUserProfilePicture(username: string, file: File) {
  try {
    // Basic file validation
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'Invalid file type. Please upload an image file.'
      };
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit (matching Django validation)
      return {
        success: false,
        error: 'File size too large. Maximum size is 10MB.'
      };
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('profile_picture', file);

    // Upload to Django backend
    const response = await axios.put(`${API_BASE_URL}/users/${username}/profile-picture/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return {
      success: true,
      message: response.data.message || 'Profile picture updated successfully',
      user: response.data.user,
      profilePictureUrl: response.data.user?.profile_picture
    };

  } catch (error: any) {
    console.error('Error updating profile picture:', error);
    
    // Handle specific error responses from Django
    if (error.response?.data) {
      return {
        success: false,
        error: error.response.data.message || error.response.data.error || 'Failed to update profile picture'
      };
    }

    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
      return {
        success: false,
        error: 'Unable to connect to the server. Please check your internet connection.'
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred while updating your profile picture.'
    };
  }
}

// Get user profile picture URL (with fallback)
export function getUserProfilePicture(user: any): string {
  if (user?.profile_picture) {
    return user.profile_picture;
  }
  return 'https://cdn.kyleb.dev/pfp/defaultpfp.png';
}

