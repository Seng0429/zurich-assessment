import HomePageView from "@/components/views/HomePageView/HomePageView"
import UnauthorizedPageView from "@/components/views/UnauthorizedPageView/UnauthorizedPageView"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { fetchAllUsers } from "@/services/userServices"
import { matchUserInitials, maskEmail } from "@/services/utils"

const Home = async () => {
    const session = await auth()

    if (!session?.user) {
        return <UnauthorizedPageView />
    }

    const rawUsers = await fetchAllUsers();
    const filteredUsers = rawUsers.filter((user) => matchUserInitials(user.first_name, user.last_name, "G", "W"));
    const securedUsers = filteredUsers.map((user) => ({
        ...user,
        email: maskEmail(user.email)
    }))

    return (
        <>
            <HomePageView 
                userList={securedUsers}
            />
        </>
    )
}

export default Home