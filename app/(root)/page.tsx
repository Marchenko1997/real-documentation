import Header from "@/components/Header"
import Notifications from "@/components/Notifications"
import { SignedIn, UserButton } from "@clerk/nextjs"; 
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";



const Home = async () => {
  const clerkUser = await currentUser();
    if (!clerkUser) redirect("/sign-in");
    


    return (
        <main className="home-container">
            <Header className="sticky left-0 top-0">
                <div className="flex items-center gap-2 lg:gap-4">
                    <Notifications />
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </div>
            </Header>
   </main>
    )
}

export default Home