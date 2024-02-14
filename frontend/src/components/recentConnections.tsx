import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services/userService';
import { Icons } from './icons';
import { getRecentConnections } from '../services/connectionsService';
import { initChat } from '../services/messagingService';
import { useNavigate } from 'react-router-dom';

type Props = {};

const RecentConnections = ({}: Props) => {
  const { mutate, isPending } = useMutation({ mutationFn: initChat });
  const navigate = useNavigate();

  const { data, isFetching, error } = useQuery({
    queryKey: ['recent-connections'],
    queryFn: getRecentConnections,
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
      <div className="flex flex-wrap gap-4">
        {isFetching ? (
          <p>Loading</p>
        ) : data?.data?.length > 0 ? (
          data?.data?.map((d: any) => (
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
          ))
        ) : (
          <p className="text-gray-400">You have no connections yet</p>
        )}
      </div>
    </div>
  );
};

export default RecentConnections;
