// mark as client component
"use client";

// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  // extracting data from usesession as session
  const { data: session } = useSession();
  const handleSignIn = async () => {
    try {
      // Menetapkan prompt ke 'select_account' saat memanggil signIn
      await signIn("google", { prompt: "select_account" });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // checking if sessions exists
  //   if (session) {
  //     //logged in code
  //   } else {
  //     alert("login dl");
  //   }
  return (
    <>
      <p>Not Signed In</p>
      <button onClick={handleSignIn}>Sign in with google</button>
    </>
  );
}
