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