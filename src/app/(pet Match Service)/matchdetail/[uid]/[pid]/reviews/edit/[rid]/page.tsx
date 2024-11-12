import { notFound, redirect } from 'next/navigation';
import PageBar from "@/components/PageBar";
import { MdSend } from "react-icons/md";
import getReview from '@/libs/reviewService/getReview';
import updateReview from '@/libs/reviewService/updateReview';

export default async function EditReviewPage({ 
  params 
}: { 
  params: { uid: string; pid: string; rid: string } 
}) {
  if (!params.rid) {
    redirect('/');
    return;
  }

  const review = await getReview(params.rid);

  if (!review) {
    notFound();
    return;
  }

  return (
    <div className="flex flex-col space-y-[64px] text-rose-950">
      <PageBar name="Edit Review" />
      <div className="px-[64px]">
        <form 
          action={async (formData: FormData) => {
            'use server';
            const content = formData.get('content') as string;
            await updateReview(
              params.rid,          // reviewId
              content,             // new content
              params.pid,          // petId
              params.uid           // userId
            );
          }}
          className="border border-rose-200 rounded-[24px] p-6"
        >
          <h2 className="text-[24px] font-semibold mb-2">Edit Your Review</h2>
          <div className="relative">
            <div className="absolute inset-0 p-2 text-gray-300 pointer-events-none overflow-hidden">
              {review.content}
            </div>
            <textarea
              name="content"
              defaultValue={review.content}
              className="w-full h-[120px] p-2 border border-rose-200 rounded-[12px] mb-4 resize-none bg-transparent"
              placeholder="Edit your review"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-[12px] transition-colors"
            >
              Update Review <MdSend size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}