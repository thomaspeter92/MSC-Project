import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getConversationById } from '../../../services/messagingService';
import LoadingSpinner from '../../../components/loadingSpinner';
import { cn, formatDate } from '../../../lib/utils';
import TextInput from '../../../components/textInput';
import { Icons } from '../../../components/icons';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '../../../stores/userStore';
import socketEventManager from '../../../services/socketsService';

type Props = {};

const FullMessage = ({}: Props) => {
  const SendIcon = Icons['send'];
  const [user] = useUserStore((state) => [state.user]);
  const [newMessages, setNewMessages] = useState<string[]>([]);
  const { id } = useParams();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversationById(Number(id)),
    refetchOnWindowFocus: false,
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      formik.resetForm();
      socketEventManager.sendMessage(id + '', values.message);
    },
  });

  const handleMessage = (message: string) => {
    console.log('Received message:', message);
    setNewMessages((newMessages) => [...newMessages, message]);
    // queryClient.invalidateQueries({ queryKey: ['conversation', id] });
  };

  useEffect(() => {
    // Whenever messages updates, keep scroll position to bottom
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [newMessages]);

  useEffect(() => {
    // Subscribe to message events
    const unsubscribe = socketEventManager.subscribeToMessages(handleMessage);
    // Clean up by unsubscribing from the event when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // whenever backend data is refreshed, remove new messages (theyll come from backend)
    setNewMessages([]);
  }, [data]);

  return (
    <div className="py-5 bg-white rounded-xl h-full flex flex-col">
      <div className="px-5 flex-1 flex flex-col mt-5 w-full space-y-3 overflow-y-scroll scroll-snap-y-container">
        {/* RENDER THE MESSAGES FROM API */}
        {(!isLoading && data?.data && data.data?.messages?.length > 0) ||
        newMessages.length > 0 ? (
          <>
            {data.data?.messages?.map((message: any) => (
              <div
                className={cn(
                  'p-3  rounded-lg w-fit max-w-[30ch] rounded-bl-none',
                  message.sender_id === user.id
                    ? 'ml-auto bg-rose-400 text-white'
                    : 'bg-neutral-100'
                )}
              >
                <p className="pr-3">{message.content}</p>
                <p className="text-xs text-right mt-1">
                  {formatDate(message.timestamp)}
                </p>
              </div>
            ))}
            {newMessages.map((message: any) => (
              <div
                className={cn(
                  'p-3  rounded-lg w-fit max-w-[30ch] rounded-bl-none',
                  message.sender_id === user.id
                    ? 'ml-auto bg-rose-400 text-white'
                    : 'bg-neutral-100'
                )}
              >
                <p className="pr-3">{message.content}</p>
                <p className="text-xs text-right mt-1">
                  {formatDate(message.timestamp)}
                </p>
              </div>
            ))}
            <div ref={bottomRef}></div>
          </>
        ) : isLoading ? (
          <div className="m-auto">
            <LoadingSpinner />
          </div>
        ) : (
          <p>No messages are currently available</p>
        )}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-5 px-5 border-t border-gray-200 pt-5 flex items-center gap-3"
      >
        <TextInput
          onChange={formik.handleChange}
          value={formik.values.message}
          placeholder="Aa..."
          type="text"
          name="message"
          size="md"
        />
        <button type="submit" className="text-rose-500">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default FullMessage;
