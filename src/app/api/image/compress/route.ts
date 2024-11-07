// src/app/api/image/compress/route.ts
import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 5 * 224 * 224; 

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return new NextResponse(JSON.stringify({ error: 'No image file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!file.type.startsWith('image/')) {
      return new NextResponse(JSON.stringify({ 
        error: `Invalid file type: ${file.type}. Only images are allowed.` 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (file.size > MAX_FILE_SIZE) {
      return new NextResponse(JSON.stringify({ 
        error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum allowed size is ${MAX_FILE_SIZE / 1024 / 1024}MB` 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': file.type,
        'Content-Length': buffer.length.toString(),
      }
    });

  } catch (error) {
    console.error('Image processing error:', error);
    return new NextResponse(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to process image',
      details: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}