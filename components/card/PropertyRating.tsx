import { FaStar } from 'react-icons/fa';
export default function PropertyRating({ propertyId, inPage }: { propertyId: string, inPage: boolean }) {
  /* const rating = randomRating();
  const reviewCount = randomReviewCount(); */
  const rating = 4.7;
  const reviewCount = 893;
  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-xs'}`;
  const countText = reviewCount > 1 ? 'reviews' : 'review';
  const countValue = `(${reviewCount}) ${inPage ? countText : ''}`
  return (
    <span className={className}>
      <FaStar className='w-3 h-3' />
      {rating} {countValue}
    </span>
  )
}

const randomRating: () => number = () => Number((Math.random() + 4).toFixed(1));

const randomReviewCount: () => number = () => Math.floor(Math.random() * 1000) + 1;
