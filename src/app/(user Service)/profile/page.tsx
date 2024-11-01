'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LogOut, Edit, User, Mail, Key, Phone, MessageCircle, Badge, UserCircle } from 'lucide-react';

function ProfileField({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg flex items-start space-x-3">
      <Icon className="w-5 h-5 text-rose-500 mt-1" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900 break-all">{value || '-'}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!session) {
    router.push('/auth/login');
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: '/auth/login' });
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with AppName and Logout */}
      <div className="bg-rose-500">
        <div className="container mx-auto px-4 py-2 flex justify-end">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50"
          >
            <LogOut size={20} />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-rose-500 px-6 py-4">
            <h1 className="text-xl font-bold text-white">Profile Information</h1>
          </div>
          <div className="px-6 py-8 text-center border-b border-gray-100">
            <div className="w-24 h-24 bg-rose-100 rounded-full mx-auto flex items-center justify-center mb-4">
              {session.user?.profileImage ? (
                <img 
                  src={session.user.profileImage} 
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-rose-500">
                  {session.user?.displayName?.[0]?.toUpperCase() || session.user?.email?.[0].toUpperCase()}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {session.user?.displayName || session.user?.email}
            </h2>
          </div>

          {/* Profile Fields */}
          <div className="p-6 space-y-4">
            <ProfileField 
              icon={Key} 
              label="User ID" 
              value={session.user?.userId || ''}
            />
            <ProfileField 
              icon={Mail} 
              label="Email Address" 
              value={session.user?.email || ''}
            />
            <ProfileField 
              icon={User} 
              label="Name" 
              value={session.user?.name || ''}
            />
            <ProfileField 
              icon={User} 
              label="Surname" 
              value={session.user?.surname || ''}
            />
            <ProfileField 
              icon={Badge} 
              label="Display Name" 
              value={session.user?.displayName || ''}
            />
            <ProfileField 
              icon={Phone} 
              label="Telephone Number" 
              value={session.user?.telephoneNumber || ''}
            />
            <ProfileField 
              icon={MessageCircle} 
              label="Line ID" 
              value={session.user?.lineId || ''}
            />
          </div>
          <div className="px-6 pb-6">
            <button
              onClick={() => router.push('/profile/edit')}
              className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 py-3 px-4 rounded-lg hover:bg-rose-100 transition duration-200"
            >
              <Edit size={20} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}