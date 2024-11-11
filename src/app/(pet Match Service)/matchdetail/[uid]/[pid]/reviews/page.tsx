import { notFound } from 'next/navigation';
import PageBar from "@/components/PageBar";
import Link from 'next/link';
import { MdEdit, MdDelete, MdSend } from "react-icons/md";
import getReviews from '@/libs/reviewService/getReviews';
import createReview from '@/libs/reviewService/createReview';
import deleteReview from '@/libs/reviewService/deleteReview';

export default async function PetMatchReviewPage({ 
  params 
}: { 
  params: { uid: string; pid: string; } 
}) {
  const { reviews, isMatched, canReview } = await getReviews(params.pid);

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
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-[24px] font-semibold">Review from: {review.userName}</h2>
                {/* แสดงปุ่มแก้ไข/ลบเฉพาะ review ของตัวเอง */}
                {review.isOwner && (
                  <div className="flex gap-2">
                    <Link 
                      href={`/matchdetail/${params.uid}/${params.pid}/reviews/edit/${review.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <MdEdit size={20} />
                    </Link>
                    <form action={async () => {
                      'use server';
                      await deleteReview(review.id, params.pid);
                    }}>
                      <button
                        type="submit"
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <MdDelete size={20} />
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <span className="text-gray-500">{review.createdAt}</span>
            </div>
            <p className="text-[16px]">{review.content}</p>
          </div>
        ))}

        {/* แสดงฟอร์มเขียนรีวิวเมื่อยังไม่เคยรีวิว */}
        {canReview && (
          <form action={async (formData: FormData) => {
            'use server';
            const content = formData.get('content') as string;
            await createReview(params.pid, content);
          }} className="border border-rose-200 rounded-[24px] p-6">
            <h2 className="text-[24px] font-semibold mb-2">Your Review</h2>
            <textarea
              name="content"
              className="w-full h-[120px] p-2 border border-rose-200 rounded-[12px] mb-4"
              placeholder="Tell others what you think"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-[12px]"
              >
                Submit Review <MdSend />
              </button>
            </div>
          </form>
        )}

        {/* แสดงข้อความถ้าเคยรีวิวแล้ว */}
        {isMatched && !canReview && (
          <div className="text-center p-4 bg-gray-100 rounded-[24px]">
            <p>You have already reviewed this pet.</p>
          </div>
        )}
      </div>
    </div>
  );
}