// import { SignUp } from "@clerk/nextjs";
// import { currentUser, EmailAddress} from "@clerk/nextjs/server";


// export default async function Home() {
//   const user = await currentUser();

//   if(!user) {
//     return <SignUp appearance={{ elements:{
//       rootBox: "mx-auto pt-12",
//       formButtonPrimary: {
//         backgroundColor: "#5755eb",
//       },
//     },

//     }} />
//   }
//     return( <main className="flex flex-col pt-12 items-center justify-center gap-12">
//       <p className="text-center">👋 Hello {user .emailAddresses[0].emailAddress}</p>
  
//     </main>
 
    
//     );
// }

import { SignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const Home: React.FC = async () => {
  const user = await currentUser();

  if (!user) {
    // Display SignUp component if the user is not signed in
    return (
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto pt-12",
            formButtonPrimary: {
              backgroundColor: "#5755eb",
            },
          },
        }}
      />
    );
  }

  // Display interactive options after signing in
  return (
    <main className="flex flex-col pt-12 items-center justify-center gap-12 min-h-screen bg-gray-100">
      <p className="text-center text-lg font-semibold">
        👋 Hello, {user.emailAddresses[0]?.emailAddress || "User"}
      </p>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-xl font-bold">Choose an Option:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/system-management">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              System Management
            </button>
          </Link>
          <Link href="/games">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
              Games
            </button>
            </Link>
            <Link href="/tic-tac-toe">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
             Amazing Game
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;


