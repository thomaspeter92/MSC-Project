import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services/userService';
import { Icons } from './icons';
import { getConnectionsList } from '../services/connectionsService';
import { initChat } from '../services/messagingService';
import { Link, useNavigate } from 'react-router-dom';

type Props = {};

const RecentConnections = ({}: Props) => {
  const { mutate, isPending } = useMutation({ mutationFn: initChat });
  const navigate = useNavigate();

  const { data, isFetching, error } = useQuery({
    queryKey: ['recent-connections'],
    queryFn: getConnectionsList,
  });

  // click, init chat, direct to chat
  const handleClick = (user_id: number) => {
    if (!isPending) {
      mutate(user_id, {
        onSuccess: (data) => {
          console.log(data);
          navigate('/messages/' + data.data.conversationId);
        },
      });
    }
  };

  const UserIcon = Icons['user'];
  return (
    <div className="p-5 rounded-xl bg-white">
      <h6 className="mb-3">Recent Connections</h6>
      {isFetching ? (
        <p>Loading</p>
      ) : data?.data?.length > 0 ? (
        <div>
          <div className="flex flex-wrap gap-4">
            {data?.data?.map((d: any) => (
              <div
                onClick={() => handleClick(d.id)} // LINK TO PROFILE OR CHAT?
                key={d.id}
                className="flex flex-col items-center"
              >
                <UserIcon
                  className="bg-rose-100 p-2 rounded-full text-rose-300"
                  size={40}
                />
                <p className="text-gray-500 text-sm mt-1">{d.first_name}</p>
              </div>
            ))}
          </div>
          <Link
            to={'/connections/all'}
            className="mt-3 font-bold text-sm text-rose-400 block text-center"
          >
            See All
          </Link>
        </div>
      ) : (
        <p className="text-gray-400">You have no connections yet</p>
      )}
    </div>
  );
};

export default RecentConnections;
