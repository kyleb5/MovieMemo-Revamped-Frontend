'use client';

import { useState } from 'react';
import { updateUserProfilePicture, getUserProfilePicture } from "@/hooks/userData";
import { useAuth } from "@/hooks/useAuth";
import Image from 'next/image';

interface ProfilePictureSectionProps {
  dbUser: any;
  onUserUpdate: (user: any) => void;
}

export default function ProfilePictureSection({ dbUser, onUserUpdate }: ProfilePictureSectionProps) {
  const { user, setPublicUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !dbUser?.username) return;

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const result = await updateUserProfilePicture(dbUser.username, file);

      if (result.success) {
        setUploadSuccess(result.message || 'Profile picture updated successfully!');
        // Update the local user data for this page
        if (result.user) {
          onUserUpdate(result.user);
          setPublicUser(result.user); // Update global context so Navbar refreshes
        }
        // Clear success message after 3 seconds
        setTimeout(() => setUploadSuccess(''), 3000);
      } else {
        setUploadError(result.error || 'Failed to update profile picture');
      }
    } catch (error) {
      setUploadError('An unexpected error occurred. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getProfilePicture = () => {
    // Use database user's profile picture if available
    if (dbUser) {
      return getUserProfilePicture(dbUser);
    }
    // Fallback to Firebase user photo
    if (user?.photoURL) {
      return user.photoURL;
    }
    // Final fallback
    return 'https://cdn.kyleb.dev/pfp/defaultpfp.png';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Profile Picture
      </h2>
      
      <div className="flex items-start space-x-6">
        {/* Current Profile Picture */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={getProfilePicture()}
              alt="Profile picture"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Controls */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Change Profile Picture
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Upload a new profile picture. Recommended size: 400x400px. Max file size: 10MB.
              Images will be automatically converted to WebP format for optimal performance.
            </p>
          </div>

          {/* Success Message */}
          {uploadSuccess && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg">
              {uploadSuccess}
            </div>
          )}

          {/* Error Message */}
          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
              {uploadError}
            </div>
          )}

          {/* File Input */}
          <div className="flex items-center space-x-4">
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="sr-only"
              />
              <span className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {isUploading ? 'Uploading...' : 'Choose Image'}
              </span>
            </label>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              JPG, PNG, GIF, WebP, HEIC up to 10MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
