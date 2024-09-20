'use client'
import { LuShare2 } from "react-icons/lu";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  TwitterIcon,
  TwitterShareButton,
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'react-share';

export default function ShareButton({ propertyId, name }: { propertyId: string, name: string }) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/properties/${propertyId}}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon' className="p-2">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" sideOffset={10} className="flex items-center gap-x-2 justify-center w-full">
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon scale={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon scale={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={shareLink} title={name}>
          <EmailIcon scale={32} round />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  )
}
