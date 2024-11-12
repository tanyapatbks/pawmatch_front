import { notFound } from 'next/navigation';
import PageBar from "@/components/PageBar";
import Link from 'next/link';
import { MdEdit, MdDelete, MdSend } from "react-icons/md";
import getReviews from '@/libs/reviewService/getReviews';
import createReview from '@/libs/reviewService/createReview';
import deleteReview from '@/libs/reviewService/deleteReview';

interface Review {
  reviewId: string;
  petId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export default async function PetMatchReviewPage({ 
  params 
}: { 
  params: { uid: string; pid: string } 
}) {
  const { reviews } = await getReviews(params.pid, params.uid);

  if (!reviews) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-[64px] text-rose-950">
      <PageBar name="Review" />
      <div className="px-[64px] flex flex-col space-y-[40px]">
        {/* Reviews List */}
        {reviews.map((review: Review) => (
          <div key={review.reviewId} className="border border-rose-200 rounded-[24px] p-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-4">
                <h2 className="text-[24px] font-semibold">Review from: {review.userName}</h2>
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/matchdetail/${params.uid}/${params.pid}/reviews/edit/${review.reviewId}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <MdEdit size={20} />
                  </Link>
                  <form>
                    <button
                      formAction={async () => {
                        'use server';
                        await deleteReview(review.reviewId, params.pid, params.uid);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <MdDelete size={20} />
                    </button>
                  </form>
                </div>
              </div>
              <span className="text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-[16px]">{review.content}</p>
          </div>
        ))}

        {/* Review Form */}
        <form 
          action={async (formData: FormData) => {
            'use server';
            const content = formData.get('content') as string;
            await createReview(params.pid, content, params.uid);
          }} 
          className="border border-rose-200 rounded-[24px] p-6"
        >
          <h2 className="text-[24px] font-semibold mb-2">Your Review</h2>
          <textarea
            name="content"
            className="w-full h-[120px] p-2 border border-rose-200 rounded-[12px] mb-4 resize-none"
            placeholder="Tell others what you think"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-[12px]"
            >
              Submit Review <MdSend size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}