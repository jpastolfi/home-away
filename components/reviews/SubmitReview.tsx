'use client'

import { useState } from "react"
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import SubmitButton from "../form/Buttons";

export default function SubmitReview({ propertyId }: { propertyId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  return (
    <div className="mt-8">
      <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
        Leave a review
      </Button>
      {
        isReviewFormVisible && <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="propertyId" value={propertyId} />
            <RatingInput name="rating" />
            <TextAreaInput name="comment" labelText="Your thoughts on this property" defaultValue="Amazing place" />
            <SubmitButton text="submit" className="mt-4" />
          </FormContainer>
        </Card>
      }
    </div>
  )
}
