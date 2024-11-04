import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import userRegister from '@/app/libs/userRegister';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const displayName = formData.get('displayName') as string;
    const telephoneNumber = formData.get('telephoneNumber') as string;
    const lineId = formData.get('lineId') as string;
    const profileImage = formData.get('profileImage') as File;
    if (!email || !password || !name || !surname || !displayName) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    let processedImageBuffer: Buffer | undefined;

    if (profileImage) {
      const MAX_SIZE = 5 * 224 * 224; 
      if (profileImage.size > MAX_SIZE) {
        return new NextResponse(
          JSON.stringify({ 
            error: `Image size exceeds ${MAX_SIZE /224 / 224}MB limit` 
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      const arrayBuffer = await profileImage.arrayBuffer();
      processedImageBuffer = Buffer.from(arrayBuffer);
    }

    const result = await userRegister({
      email,
      password,
      name,
      surname,
      displayName,
      telephoneNumber,
      lineId,
      profileImage: processedImageBuffer,
    });

    return new NextResponse(
      JSON.stringify(result),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Registration API Error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to register' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}