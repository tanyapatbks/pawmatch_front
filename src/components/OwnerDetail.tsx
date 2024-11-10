// OwnerDetail.tsx
import Image from "next/image";

interface OwnerDetailProps {
  user: {
    name: string;
    surname: string;
    email: string;
    telephoneNumber: string;
    lineId: string;
    profileImage: string;
  };
}

const OwnerDetail: React.FC<OwnerDetailProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Owner Detail</h1>
      </div>
      {user.profileImage ? (
        <Image
          src={user.profileImage}
          alt={`${user.name} ${user.surname}'s profile picture`}
          width={150}
          height={150}
          className="rounded-full"
        />
      ) : (
        <div className="w-36 h-36 bg-gray-300 rounded-full"></div>
      )}
      <h2 className="text-2xl font-bold">
        {user.name} {user.surname}
      </h2>
      <p>Email: {user.email}</p>
      <p>Telephone: {user.telephoneNumber}</p>
      <p>Line ID: {user.lineId}</p>
    </div>
  );
};

export default OwnerDetail;