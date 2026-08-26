'use server'
import { auth } from '@/app/api/auth/[...nextauth]/route';

export const fetchUserEmail = async(id: number): Promise<string> => {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }
    
    const apiKey = process.env.REQRES_API_KEY;
    if (!apiKey) {
        throw new Error('Server configuration error: REQRES_API_KEY is missing.');
    }

    const headers = { 'x-api-key': apiKey, 'Content-Type': 'application/json' };
    const res = await fetch(`https://reqres.in/api/users/${id}`, { method: 'GET', headers });

    if (!res.ok) {
        throw new Error('Failed to fetch individual user details.');
    }

    const data = await res.json();
    return data.data.email;
}