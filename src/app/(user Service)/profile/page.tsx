// src/app/(user Service)/profile/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
  // เพิ่ม fields อื่นๆ ตามที่ต้องการ
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // fetch ข้อมูล profile จาก API
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          // ถ้าไม่มีสิทธิ์เข้าถึง redirect ไปหน้า login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [router]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Name</h2>
          <p>{profile.name}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Email</h2>
          <p>{profile.email}</p>
        </div>
        {/* เพิ่มข้อมูลอื่นๆ ที่ต้องการแสดง */}
      </div>
    </div>
  );
}