import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMessages } from '../../services/messagingService';
import { Icons } from '../../components/icons';
import { cn, formatDate } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { useChatStore } from '../../stores/chatStore';

type Props = {};

const Messages = (props: Props) => {
  const UserIcon = Icons['user'];
  const DotIcon = Icons['dot'];
  const { data, isFetching, isError } = useQuery({
    queryKey: ['messages'],
    queryFn: getAllMessages,
  });

  const chats = data?.data?.filter((d: any) => d.last_message_content !== null);

  const [unreadChats] = useChatStore((state) => [state.unreadChats]);

  return (
    <div className="p-5 bg-white shadow-main rounded-xl">
      <h5>Messages</h5>
      {!chats || chats.length < 1 ? (
        <p className="text-gray-400">No recent chats.</p>
      ) : (
        <div className="mt-1">
          {chats.map((data: any) => (
            <div
              key={data.created_at}
              className="flex gap-3 border-b border-gray-100 py-3 last:border-b-0 last:pb-0 items-center"
            >
              <div className="rounded-full relative">
                {unreadChats[data.id] ? (
                  <p className="text-blue-500 flex items-center justify-center w-6 h-6 rounded bg-blue-100 absolute top-0 right-0  -translate-y-1/3">
                    <DotIcon />
                  </p>
                ) : null}
                {data.picutre ? (
                  <img src={data.picutre} alt="" />
                ) : (
                  <div className="w-14 h-14 bg-rose-100 rounded-full flex justify-center items-center">
                    <UserIcon className="text-rose-300" />
                  </div>
                )}
              </div>
              <div className="text flex-1">
                <div className="font-semibold justify-between w-full flex items-center">
                  <Link to={'/messages/' + data.id}>{data.name}</Link>
                  <p className="text-gray-400/50 text-xs">
                    {formatDate(data.last_message_timestamp)}
                  </p>
                </div>
                <p
                  className={cn(
                    'text-gray-500 text-sm',
                    unreadChats[data.id] ? 'font-bold text-rose-400' : ''
                  )}
                >
                  {data.last_message_content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Messages;
