import { useQuery } from '@tanstack/react-query';
import { getAllMessages } from '../services/messagingService';
import { Icons } from './icons';
import { formatDate } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import socketEventManager from '../services/socketsService';
import { useQueryClient } from '@tanstack/react-query';
import { useChatStore } from '../stores/chatStore';
type Props = {};

const RecentChats = ({}: Props) => {
  const location = useLocation();
  const UserIcon = Icons['user'];
  const { data } = useQuery({
    queryKey: ['messages'],
    queryFn: getAllMessages,
  });

  const [unreadChats, addToUnread] = useChatStore((state) => [
    state.unreadChats,
    state.addToUnread,
  ]);
  const queryClient = useQueryClient();

  console.log(unreadChats);
  // filter out chats with no message content (convo init but didnt send messge yet)
  const chats = data?.data?.filter((d: any) => d.last_message_content !== null);

  const handleMessage = (message: any) => {
    queryClient.invalidateQueries({ queryKey: ['messages'] });
    // Here, check that the message isnt open and provide some kind of notifcation
    if (location.pathname !== '/messages/' + message.id) {
      // add to unread array in store
      // remove from the read array when that message opens
      console.log(message);
      addToUnread(message.id);
    }
  };

  useEffect(() => {
    // Subscribe to message events
    const unsubscribe = socketEventManager.subscribeToMessages(handleMessage);
    // Clean up by unsubscribing from the event when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bg-white rounded-xl p-5">
      <h6>Recent Chats</h6>
      {!chats || chats.length < 1 ? (
        <p className="text-gray-400">No recent chats.</p>
      ) : (
        <div className="mt-1">
          {chats.map((data: any) => (
            <div
              key={data.created_at}
              className="flex gap-3 border-b border-gray-200 py-3 last:border-b-0 last:pb-0"
            >
              {data.picutre ? (
                <img src={data.picutre} alt="" />
              ) : (
                <div className="w-10 h-10 bg-rose-100 rounded-full flex justify-center items-center">
                  <UserIcon className="text-rose-300" />
                </div>
              )}
              <div className="text-sm flex-1">
                <div className="font-semibold justify-between w-full flex items-center">
                  <p>{data.name}</p>
                  <p className="text-gray-400/50 text-xs">
                    {formatDate(data.last_message_timestamp)}
                  </p>
                </div>
                <p className="text-gray-400 ">
                  {data.last_message_content}
                  {/* <Link to={'/messages/' + data.id}>Open chat</Link> */}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentChats;
