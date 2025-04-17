// src/app/(api)/example/route.ts
import { NextResponse } from 'next/server';
import { processExampleData } from '@/lib/services/exampleService';
import type { ExampleData } from '@/lib/types/exampleTypes';

/**
 * Example API Route (GET handler).
 * Acts as a thin controller, delegating logic to the service layer.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('input') || 'default input';

    console.log(`API Route /api/example received GET request with input: ${input}`);

    // Delegate the core logic to the service function
    const result: ExampleData = await processExampleData(input);

    // Return the result from the service
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/example GET handler:', error);
    // It's good practice to avoid leaking internal error details
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 },
    );
  }
}

/**
 * Example API Route (POST handler).
 */
export async function POST(request: Request) {
  try {
    // Assuming the request body is JSON with an 'input' field
    const body = await request.json();
    const input = body.input || 'default POST input';

    console.log(`API Route /api/example received POST request with input: ${input}`);

    // Delegate the core logic to the service function
    const result: ExampleData = await processExampleData(input);

    // Return the result from the service
    return NextResponse.json(result, { status: 201 }); // 201 Created for POST success
  } catch (error) {
    console.error('Error in /api/example POST handler:', error);
    // Handle potential JSON parsing errors or other issues
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 },
    );
  }
}