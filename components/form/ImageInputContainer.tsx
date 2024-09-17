'use client'
import { actionFunction } from "@/utils/types"
import { useState } from "react"
import { LuUser2 } from "react-icons/lu"
import Image from "next/image"
import { Button } from "../ui/button"
import FormContainer from "./FormContainer"
import ImageInput from "./ImageInput"
import SubmitButton from "./Buttons"


type ImageInputContainerProps = {
  image: string,
  name: string,
  action: actionFunction,
  text: string,
  children?: React.ReactNode
}

export default function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const userIcon = <LuUser2 className='w-24 h-24 bg-primary rounded text-white' mb-4 />
  return <div>
    {
      image ? <Image src={image} alt={name} width={100} height={100} className="object-cover mb-4 w-24 h-24" /> : userIcon
    }
    <Button variant='outline' size='sm' onClick={() => setUpdateFormVisible((prev) => !prev)}>
      {text}
    </Button>
    {isUpdateFormVisible && <div className="max-w-lg mt-4">
      <FormContainer action={action}>
        <ImageInput />
        <SubmitButton size="sm" />
      </FormContainer>
    </div>}
  </div>
}