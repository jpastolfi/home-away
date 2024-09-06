import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const createProfileAction = async (formData: FormData) => {
  'use server'
  const firstName = formData.get('firstName') as string;
  console.log(firstName);
}

export default function CreateProfilePage() {
  return <section>
    <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
    <div className="border p-8 rounded-md max-w-lg">
      <form action={createProfileAction}>

        <Button type="submit" size='lg'>Create profile</Button>
      </form>
    </div>
  </section>
}
