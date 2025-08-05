import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// Types
interface Movie {
  id: number;
  imdb_id: string;
  added_at: string;
}

interface User {
  uid: string;
  username: string;
  created_at: string;
  profile_picture: string;
}

interface Playlist {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  user: User;
  movies: Movie[];
  movie_count: number;
}

interface CreatePlaylistData {
  name: string;
  description?: string;
}

// Create a new playlist for a user
export async function createPlaylist(userUid: string, playlistData: CreatePlaylistData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/playlists/create/${userUid}/`, playlistData, {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication token if needed
        // 'Authorization': `Bearer ${token}`,
      }
    });

    return {
      success: true,
      playlist: response.data,
      message: 'Playlist created successfully'
    };
  } catch (error: any) {
    console.error('Error creating playlist:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to create playlist',
      playlist: null
    };
  }
}

// Get all playlists for a specific user
export async function getUserPlaylists(userUid: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/playlists/user/${userUid}/`, {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication token if needed
        // 'Authorization': `Bearer ${token}`,
      }
    });

    // Handle the actual API response structure
    const responseData = response.data;
    let playlists = [];
    
    if (responseData && responseData.playlists && Array.isArray(responseData.playlists)) {
      playlists = responseData.playlists;
    } else if (Array.isArray(responseData)) {
      // Fallback if API returns array directly
      playlists = responseData;
    }

    return {
      success: true,
      playlists: playlists,
      totalPlaylists: responseData.count || playlists.length
    };
  } catch (error: any) {
    console.error('Error fetching user playlists:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch user playlists',
      playlists: []
    };
  }
}

// Get all playlists (public view)
export async function getAllPlaylists() {
  try {
    const response = await axios.get(`${API_BASE_URL}/playlists/all/`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return {
      success: true,
      playlists: response.data,
      totalPlaylists: response.data.length
    };
  } catch (error: any) {
    console.error('Error fetching all playlists:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch playlists',
      playlists: []
    };
  }
}

// Get a specific playlist by ID
export async function getPlaylist(playlistId: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/playlists/${playlistId}/`, {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication token if needed
        // 'Authorization': `Bearer ${token}`,
      }
    });

    return {
      success: true,
      playlist: response.data
    };
  } catch (error: any) {
    console.error('Error fetching playlist:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch playlist',
      playlist: null
    };
  }
}

// Update a playlist
export async function updatePlaylist(playlistId: number, updateData: Partial<CreatePlaylistData>) {
  try {
    const response = await axios.put(`${API_BASE_URL}/playlists/${playlistId}/update/`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication token if needed
        // 'Authorization': `Bearer ${token}`,
      }
    });

    return {
      success: true,
      playlist: response.data,
      message: 'Playlist updated successfully'
    };
  } catch (error: any) {
    console.error('Error updating playlist:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to update playlist',
      playlist: null
    };
  }
}

// Delete a playlist
export async function deletePlaylist(playlistId: number) {
  try {
    await axios.delete(`${API_BASE_URL}/playlists/${playlistId}/delete/`, {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication token if needed
        // 'Authorization': `Bearer ${token}`,
      }
    });

    return {
      success: true,
      message: 'Playlist deleted successfully'
    };
  } catch (error: any) {
    console.error('Error deleting playlist:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to delete playlist'
    };
  }
}

// Add a movie to a playlist
export async function addMovieToPlaylist(playlistId: number, imdbId: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/playlists/${playlistId}/add-movie/`, 
      { imdb_id: imdbId }, 
      {
        headers: {
          'Content-Type': 'application/json',
          // Add authentication token if needed
          // 'Authorization': `Bearer ${token}`,
        }
      }
    );

    return {
      success: true,
      playlist: response.data,
      message: 'Movie added to playlist successfully'
    };
  } catch (error: any) {
    console.error('Error adding movie to playlist:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to add movie to playlist'
    };
  }
}

// Remove a movie from a playlist
export async function removeMovieFromPlaylist(playlistId: number, imdbId: string) {
  try {
    await axios.delete(`${API_BASE_URL}/playlists/${playlistId}/remove-movie/${imdbId}/`, {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication token if needed
        // 'Authorization': `Bearer ${token}`,
      }
    });

    return {
      success: true,
      message: 'Movie removed from playlist successfully'
    };
  } catch (error: any) {
    console.error('Error removing movie from playlist:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to remove movie from playlist'
    };
  }
}
