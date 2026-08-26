import { User } from '@/constants/types';

export const fetchAllUsers = async(): Promise<User[]> => {
    const apiKey = process.env.REQRES_API_KEY;

    if (!apiKey) {
        throw new Error('Server configuration error: REQRES_API_KEY is missing.');
    }

    const headers = { 'x-api-key': apiKey, 'Content-Type': 'application/json' };
    
    const [resPage1, resPage2] = await Promise.all([
        fetch('https://reqres.in/api/users?page=1', { method: 'GET', headers, next: { revalidate: 60 } }),
        fetch('https://reqres.in/api/users?page=2', { method: 'GET', headers, next: { revalidate: 60 } })
    ]);

    if (!resPage1.ok || !resPage2.ok) {
        throw new Error('Failed to fetch user data from external API');
    }

    const data1 = await resPage1.json();
    const data2 = await resPage2.json();

    return [...data1.data, ...data2.data];
}