import { notFound, redirect } from 'next/navigation';
import PageBar from "@/components/PageBar";
import { MdSend } from "react-icons/md";
import getReviews from '@/libs/reviewService/getReviews';
import updateReview from '@/libs/reviewService/updateReview';

export default async function EditReviewPage({ params }: { params: { pid: string, rid: string } }) {
  const { reviews, isMatched } = await getReviews(params.pid);
  const review = reviews.find(r => r.id === params.rid);

  if (!review || !review.isOwner || !isMatched) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-[64px] text-rose-950">
      <PageBar name="Edit Review" />
      <div className="px-[64px]">
        <form action={async (formData: FormData) => {
          'use server';
          const content = formData.get('content') as string;
          await updateReview(params.rid, params.pid, content);
          redirect(`/pets/${params.pid}/reviews`);
        }} className="border border-rose-200 rounded-[24px] p-6">
          <textarea
            name="content"
            className="w-full h-[120px] p-2 border border-rose-200 rounded-[12px] mb-4"
            defaultValue={review.content}
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-rose-200 rounded-[12px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-[12px]"
            >
              Update Review <MdSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}