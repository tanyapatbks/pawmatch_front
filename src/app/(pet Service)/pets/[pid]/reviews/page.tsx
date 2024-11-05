// app/(pet Service)/pets/[pid]/reviews/page.tsx
import PageBar from "@/components/PageBar";
import { notFound } from 'next/navigation';
import ButtonType1 from "@/components/Button/ButtonType1";
import { MdEdit, MdDelete, MdSend } from "react-icons/md";
import Link from 'next/link';

interface Review {
  id: string;
  petName: string;
  userName: string;
  content: string;
  createdAt: string;
  isOwner: boolean;
}

async function getReviews(pid: string): Promise<Review[]> {
  // Mock data สำหรับการ demo
  return [
    { 
      id: '1', 
      petName: 'Snow', 
      userName: 'Jab',
      content: 'น้องน่ารักมากครับ เป็นมิตรกับเด็กๆ ชอบเล่นกับของเล่น แต่ชอบกัดรองเท้าเล่นนิดหน่อย', 
      createdAt: '2024-02-01',
      isOwner: true
    },
    { 
      id: '2', 
      petName: 'Winter', 
      userName: 'Smart',
      content: 'เลี้ยงง่าย เชื่อฟัง ฉลาด สอนอะไรเข้าใจไว ที่สำคัญน้องชอบกินผักด้วย', 
      createdAt: '2024-02-02',
      isOwner: false
    },
    { 
      id: '3', 
      petName: 'Rainy', 
      userName: 'Petch',
      content: 'น้องสุขภาพแข็งแรงดี ไม่ค่อยมีปัญหาเรื่องโรคภัย ดูแลง่าย รักเด็ก ชอบเล่นกับเด็กๆ ในบ้าน', 
      createdAt: '2024-02-03',
      isOwner: false
    }
  ];
}

export default async function ReviewPage({ params }: { params: { pid: string } }) {
  const reviews = await getReviews(params.pid);

  if (!reviews) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-[64px] text-rose-950">
      <PageBar name="Review" />
      <div className="px-[64px] flex flex-col space-y-[40px]">
        {reviews.map((review) => (
          <div key={review.id} className="border border-rose-200 rounded-[24px] p-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-[24px] font-semibold">{review.userName}</h2>
                {review.isOwner && (
                  <div className="flex gap-2">
                    <Link 
                      href={`/pets/${params.pid}/reviews/edit/${review.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Edit Review"
                    >
                      <MdEdit size={20} />
                    </Link>
                    <Link 
                      href={`/pets/${params.pid}/reviews/delete/${review.id}`}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      title="Delete Review"
                    >
                      <MdDelete size={20} />
                    </Link>
                  </div>
                )}
              </div>
              <span className="text-gray-500">{review.createdAt}</span>
            </div>
            <p className="text-[16px]">{review.content}</p>
          </div>
        ))}
        <div className="border border-rose-200 rounded-[24px] p-6">
          <h2 className="text-[24px] font-semibold mb-2">Your Review</h2>
          <form action="/api/reviews/create" method="POST">
            <textarea
              name="content"
              className="w-full h-[120px] p-2 border border-rose-200 rounded-[12px] mb-4"
              placeholder="Tell others what you think"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-[12px] hover:bg-rose-600"
              >
                Submit Review
                <MdSend />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}