import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";


const ProfileImageInput = () => {

  const name = 'image';

  const { toast } = useToast();

  const checkFileSize = (e: any) => {
    const file = e.target.files[0]; // Get the first selected file
    const MAX_FILE_SIZE = 1024 * 1024;
    if (file && file.size > MAX_FILE_SIZE) {
      toast({
        description: 'File size cannot exceed 1MB',
        variant: 'destructive'
      });
      e.target.value = ''; // Reset the input field
    }
  }

  return (
    <div className="mb-2">

      <Label htmlFor={name} className='capitalize'>Profile Image</Label>

      <Input
        id={name}
        name={name}
        type="file"
        accept=".jpg,.jpeg,.png"
        className='max-w-xs'
        onChange={checkFileSize}
        required
      />

    </div>
  )

}

export default ProfileImageInput;