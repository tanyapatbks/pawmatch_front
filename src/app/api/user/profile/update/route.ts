import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { authClient } from '../../../../libs/grpc/auth-client';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const updateData = {
      userId: session.user.userId,
      name: formData.get('name') as string || '',
      surname: formData.get('surname') as string || '',
      displayName: formData.get('displayName') as string || '',
      telephoneNumber: formData.get('telephoneNumber') as string || '',
      lineId: formData.get('lineId') as string || '',
    };
    if (!updateData.name || !updateData.surname || !updateData.displayName) {
      return new NextResponse(
        JSON.stringify({ error: 'Name, surname and display name are required' }),
        { status: 400 }
      );
    }
    const updatedProfile = await authClient.updateProfile(updateData);

    return new NextResponse(
      JSON.stringify(updatedProfile),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Update profile error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to update profile' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}