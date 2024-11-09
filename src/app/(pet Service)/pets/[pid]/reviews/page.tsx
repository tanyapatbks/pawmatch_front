import { notFound } from 'next/navigation';
import PageBar from "@/components/PageBar";
import getReviews from '@/libs/reviewService/getReviews';

export default async function PetReviewPage({ params }: { params: { pid: string } }) {
  const { reviews } = await getReviews(params.pid);

  if (!reviews) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-[64px] text-rose-950">
      <PageBar name="Reviews" />
      <div className="px-[64px] flex flex-col space-y-[40px]">
        {/* แสดงรายการ reviews */}
        {reviews.map((review) => (
          <div key={review.id} className="border border-rose-200 rounded-[24px] p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[24px] font-semibold">Review from: {review.userName}</h2>
              <span className="text-gray-500">{review.createdAt}</span>
            </div>
            <p className="text-[16px]">{review.content}</p>
          </div>
        ))}

        {/* ข้อความแจ้งว่าต้อง match ก่อนถึงจะรีวิวได้ */}
        <div className="text-center p-4 bg-gray-100 rounded-[24px]">
          <p>You need to match with this pet before you can write a review.</p>
        </div>
      </div>
    </div>
  );
}