import { useQuery } from '@tanstack/react-query';
import { getAllMessages } from '../services/messagingService';
import { Icons } from './icons';
import { cn, formatDate } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import socketEventManager from '../services/socketsService';
import { useQueryClient } from '@tanstack/react-query';
import { useChatStore } from '../stores/chatStore';
import { useNavigate } from 'react-router-dom';
type Props = {};

const RecentChats = ({}: Props) => {
  const location = useLocation();
  const UserIcon = Icons['user'];
  const DotIcon = Icons['dot'];
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: getAllMessages,
  });
  const [unreadChats, addToUnread] = useChatStore((state) => [
    state.unreadChats,
    state.addToUnread,
  ]);
  const queryClient = useQueryClient();
  const currentPath = useRef(location.pathname);

  // filter out chats with no message content (convo init but didnt send messge yet)
  const chats = data?.data?.filter((d: any) => d.last_message_content !== null);

  const handleMessage = (message: any) => {
    queryClient.invalidateQueries({ queryKey: ['messages'] });
    // Here, check that the message isnt open and provide some kind of notifcation
    if (currentPath.current === '/messages/' + message.id) return;
    // add to unread array in store
    // remove from the read array when that message opens
    addToUnread(message.id);
  };

  useEffect(() => {
    // Subscribe to message events
    const unsubscribe = socketEventManager.subscribeToMessages(handleMessage);
    // Clean up by unsubscribing from the event when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    currentPath.current = location.pathname;
  }, [location.pathname]);

  return (
    <div className="bg-white rounded-xl p-5">
      <h6>Recent Chats</h6>
      {isLoading ? (
        <p>Loading</p>
      ) : !chats || chats.length < 1 ? (
        <p className="text-gray-400">No recent chats.</p>
      ) : (
        // if this message id exists in unread messages, bolden the message text
        <div className="mt-1">
          {chats.map((data: any) => (
            <div
              onClick={() => navigate('/messages/' + data.id)}
              key={data.created_at}
              className="flex cursor-pointer gap-3 border-b border-gray-100 py-3 last:border-b-0 last:pb-0"
            >
              <div className="rounded-full relative">
                {unreadChats[data.id] ? (
                  <p className="text-blue-500 flex items-center justify-center w-4 h-4 rounded bg-blue-100 absolute top-0 right-0  -translate-y-1/3">
                    <DotIcon />
                  </p>
                ) : null}
                {data.picutre ? (
                  <img src={data.picutre} alt="" />
                ) : (
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex justify-center items-center">
                    <UserIcon className="text-rose-300" />
                  </div>
                )}
              </div>
              <div className="text-sm flex-1">
                <div className="font-semibold justify-between w-full flex items-center">
                  <p>{data.name}</p>
                  <p className="text-gray-400/50 text-xs">
                    {formatDate(data.last_message_timestamp)}
                  </p>
                </div>
                <p
                  className={cn(
                    '',
                    unreadChats[data.id] === true
                      ? 'font-bold text-rose-400'
                      : 'text-gray-500'
                  )}
                >
                  {data.last_message_content}
                </p>
              </div>
            </div>
          ))}
          <Link
            className="text-center block font-bold text-rose-400 mt-4 text-sm"
            to="messages"
          >
            See All
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentChats;
