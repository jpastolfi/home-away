'use client'
import { SignOutButton } from "@clerk/nextjs"
import { useToast } from "@/hooks/use-toast"

export default function SignOutLink() {
  const { toast } = useToast();
  const handleLogOut = () => {
    toast({ description: 'You have been signed out.' });
  }
  return <SignOutButton redirectUrl="/">
    <button className="w-full text-left" onClick={handleLogOut}>
      Log Out
    </button>
  </SignOutButton>
}
