import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const ProfileImageInput = () => {
  const name = 'image';

  return (
    <div className="mb-2">

      <Label htmlFor={name} className='capitalize'>Image</Label>

      <Input
        id={name}
        name={name}
        type="file"
        accept=".jpg,.jpeg,.png"
        className='max-w-xs'
        required
      />

    </div>
  )

}

export default ProfileImageInput;