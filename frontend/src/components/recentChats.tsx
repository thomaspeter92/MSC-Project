import { useQuery } from "@tanstack/react-query";
import { getAllMessages } from "../services/messagingService";
import { Icons } from "./icons";
import { formatDate } from "../lib/utils";
type Props = {};

const RecentChats = ({ }: Props) => {
  const UserIcon = Icons['user']
  const { data, isFetching, isError } = useQuery({ queryKey: ['messages'], queryFn: getAllMessages })




  return (
    <div className="bg-white rounded-xl p-5">
      <h6>Recent Chats</h6>
      {!data?.data || data?.data?.length < 1 ?
        <p className="text-gray-400">No recent chats.</p>
        :
        <div className="mt-1">
          {data.data.map((data: any) => (
            <div key={data.created_at} className="flex gap-3 border-b border-gray-200 py-3 last:border-b-0 last:pb-0">
              {data.picutre ?
                <img src={data.picutre} alt="" />
                :
                <div className="w-10 h-10 bg-rose-100 rounded-full flex justify-center items-center">
                  <UserIcon className="text-rose-300" />
                </div>
              }
              <div className="text-sm flex-1">
                <div className="font-semibold justify-between w-full flex items-center">
                  <p>
                    {data.name}
                  </p>
                  <p className="text-gray-400/50 text-xs">
                    {formatDate(data.last_message_timestamp)}
                  </p>
                </div>
                <p className="text-gray-500 font-bold">{data.last_message_content}</p>
              </div>
            </div>
          ))}
        </div>}
    </div>
  );
};

export default RecentChats;
