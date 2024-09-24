import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/home/EmptyList";
import Title from "@/components/properties/Title";
import ReviewCard from "@/components/reviews/ReviewCard";
import { deleteReviewAction, fetchPropertyReviewsByUser } from "@/utils/actions"

export default async function ReviewsPage() {
  const reviews = await fetchPropertyReviewsByUser();
  if (reviews.length < 1) return <EmptyList />
  return <>
    <Title text="Your reviews" />
    <section className="grid md:grid-cols-2 gap-8 mt-4">
      {reviews.map((review) => {
        const { comment, rating } = review;
        const { name, image } = review.property;
        const reviewInfo = {
          comment, rating, name, image
        }
        return <ReviewCard key={review.id} reviewInfo={reviewInfo}>
          <DeleteReview reviewId={review.id} />
        </ReviewCard>
      })}
    </section>
  </>
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });
  return <FormContainer action={deleteReview}>
    <IconButton actionType="delete" />
  </FormContainer>
}