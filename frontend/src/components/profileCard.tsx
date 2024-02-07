import { Icons } from './icons';
import Button from './button';
import { useMutation } from '@tanstack/react-query';
import { registerConnection } from '../services/connectionsService';
import { useQueryClient } from '@tanstack/react-query';

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
}: Props) => {
  const queryClient = useQueryClient();
  const LocationIcon = Icons['location'];
  const RightIcon = Icons['right'];
  const UserIcon = Icons['user1']


  const connectMutation = useMutation({
    mutationFn: registerConnection,
  });

  const handleConnect = () => {
    connectMutation.mutate(
      { id: userId, status: 'pending' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['connections'] });
        },
      }
    );
  };

  const handleDelete = () => {
    // Here, save the connection as BLOCKED.
    connectMutation.mutate(
      { id: userId, status: 'blocked' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['connections'] });
        },
      }
    );
  };




  return (
    <div className="bg-white p-5 rounded-xl flex flex-col xl:flex-row gap-5">
      <div className="bg-gray-100 min-w-[200px] h-[200px]  xl:h-auto  relative rounded-lg overflow-hidden flex justify-center items-center">
        {image ? <img
          loading="lazy"
          className="object-cover w-full h-full top-0 left-0 absolute"
          src={image}
        /> :
          <UserIcon size={100} className="text-rose-200" />
        }
      </div>
      <div className="">
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
              <Button onClick={handleDelete} intent={'gray'} size={'lg'}>
                Delete
              </Button>
              <Button
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
