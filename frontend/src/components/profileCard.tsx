import { Icons } from './icons';
import Button from './button';
import { useMutation } from '@tanstack/react-query';
import { registerConnection } from '../services/connectionsService';
import { useQueryClient } from '@tanstack/react-query';
import { Verified } from "lucide-react";

type Props = {
  name: string;
  age: number;
  image: string;
  bio: string;
  likes: string[];
  dislikes: string[];
  location: string;
  isConnection: boolean;
  userId: number;
  onProfileClick?: () => void;
  verified?: boolean
};

const ProfileCard = ({
  userId,
  name,
  age,
  image,
  bio,
  likes,
  dislikes,
  location,
  isConnection,
  onProfileClick,
  verified
}: Props) => {
  const queryClient = useQueryClient();
  const LocationIcon = Icons['location'];
  const RightIcon = Icons['right'];
  const UserIcon = Icons['user1']
  const VerifiedIcon = Icons['checkCircle']

  const { mutate, isPending } = useMutation({
    mutationFn: registerConnection,
  });

  const handleConnect = () => {
    mutate(
      { id: userId, status: 'pending' },
      {
        onSuccess: () => Promise.all([
          queryClient.invalidateQueries({ queryKey: ['connections'] }),
          queryClient.invalidateQueries({ queryKey: ['recent-connections'] })
        ])
      }
    );
  };

  const handleDelete = () => {
    // Here, save the connection as BLOCKED.
    mutate(
      { id: userId, status: 'blocked' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['connections'] });
        },
      }
    );
  };


  return (
    <div className="bg-white rounded-xl flex flex-col xl:flex-row shadow-main">
      <div className="bg-rose-100 min-w-[220px] h-full  xl:h-auto  relative flex justify-center items-center rounded-tl-xl rounded-bl-xl">
        {image ? <img
          loading="lazy"
          className="object-cover w-full h-full top-0 left-0 absolute rounded-tl-xl rounded-bl-xl"
          src={image}
        /> :
          <UserIcon size={100} className="text-rose-300" />
        }
        {verified ?
          <div className="flex items-center gap-2 top-full -translate-x-1/2 -translate-y-1/2 left-1/2  px-5 py-1 -skew-x-12 rounded-lg bg-gradient-to-r from-blue-500 to-sky-400 absolute text-white capitalize font-semibold">
            <VerifiedIcon size={20} />
            <p>
              Verified
            </p>
          </div>
          : null}
      </div>
      <div className="p-5">
        <h5 className="capitalize">
          {name}, {age}
        </h5>
        <div className="flex gap-2 items-center text-gray-400 capitalize">
          <LocationIcon size={15} />
          <p className="capitalize">{location}</p>
        </div>
        <p className=" my-3">
          {bio
            ? bio
            : !isConnection && !bio
              ? 'Please update your personal bio'
              : "This is a placeholder for the user's bio text. This doesnt effect the recommendations."}
        </p>
        <div className="flex flex-col xl:flex-row gap-3 pt-2">
          <div className="flex-1">
            <p className="font-bold mb-2">Likes</p>
            <div className="flex gap-2 flex-wrap">
              {likes?.slice(0, 3)?.map((d: string, i: number) => (
                <p
                  className=" p-1 bg-green-100 text-green-600 text-xs px-2 rounded capitalize font-medium"
                  key={d + i}
                >
                  {d}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold mb-2">Dislikes</p>
            <div className="flex gap-2 flex-wrap">
              {dislikes?.slice(0, 3)?.map((d: string, i: number) => (
                <p
                  className="p-1 bg-red-100 text-red-600 text-xs px-2 rounded capitalize font-medium"
                  key={d + i}
                >
                  {d}
                </p>
              ))}
            </div>
          </div>
        </div>
        {isConnection ? (
          <>
            <button
              onClick={onProfileClick}
              className="py-5 font-bold flex items-center text-rose-400"
            >
              See More about {name} <RightIcon size={20} />
            </button>
            <div className="flex gap-5">
              <Button loading={isPending} onClick={handleDelete} intent={'gray'} size={'lg'}>
                Delete
              </Button>
              <Button
                loading={isPending}
                onClick={handleConnect}
                size={'lg'}
                icon="connect"
                intent={'primary'}
              >
                Connect
              </Button>
            </div>{' '}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileCard;
