import HomePageView from "@/components/HomePageView/HomePageView"
import UnauthorizedPageView from "@/components/UnauthorizedPageView/UnauthorizedPageView"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { matchUserInitials } from '@/utils/common'
import { User } from '@/constants/types'

interface HomePageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Home = async ({ searchParams }: HomePageProps) => {
    const session = await auth()

    if (!session?.user) {
        return <UnauthorizedPageView />
    }

    const params = await searchParams
    const currentPage = params?.page ? parseInt(params.page as string, 10) : 1
    const apiKey = process.env.REQRES_API_KEY

    if (!apiKey) {
        throw new Error('Server configuration error: REQRES_API_KEY is missing.')
    }

    const res = await fetch(`https://reqres.in/api/users?page=${currentPage}`, {
        method: 'GET',
        headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
        next: { revalidate: 60 }
    })

    if (!res.ok) {
        throw new Error(`Failed to fetch from external API: ${res.statusText}`)
    }

    const data = await res.json()

    const filteredUserList = data.data.filter((user: User) => 
        matchUserInitials(user.first_name, user.last_name, "G", "W")
    );

    return (
        <>
            <HomePageView 
                userList={filteredUserList}
                currentPage={data.page}
                totalPages={data.total_pages}
            />
        </>
    )
}

export default Home