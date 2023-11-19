"use client";

interface ReviewContentsProps {
  reviewType: string;
  results: Object;
}

const ReviewContents: React.FC<ReviewContentsProps> = ({
  reviewType,
  results,
}) => {
  return <div>{reviewType}</div>;
};

export default ReviewContents;
