import React from 'react'
import { useQuery } from "@tanstack/react-query"
import { getAllMessages } from "../../services/messagingService"
import { Icons } from "../../components/icons"
import { formatDate } from "../../lib/utils"
import { Link } from "react-router-dom"

type Props = {}

const Messages = (props: Props) => {

  const UserIcon = Icons['user']
  const { data, isFetching, isError } = useQuery({ queryKey: ['messages'], queryFn: getAllMessages })


  return (
    <div className="p-5 bg-white shadow-main rounded-xl">
      <h5>Messages</h5>
      {!data?.data || data?.data?.length < 1 ?
        <p className="text-gray-400">No recent chats.</p>
        :
        <div className="mt-1">
          {data.data.map((data: any) => (
            <div key={data.created_at} className="flex gap-3 border-b border-gray-100 py-3 last:border-b-0 last:pb-0 items-center">
              {data.picutre ?
                <img src={data.picutre} alt="" />
                :
                <div className="w-14 h-14 bg-rose-100 rounded-full flex justify-center items-center">
                  <UserIcon className="text-rose-300" />
                </div>
              }
              <div className="text flex-1">
                <div className="font-semibold justify-between w-full flex items-center">
                  <Link to={'/messages/' + data.id}>
                    {data.name}
                  </Link>
                  <p className="text-gray-400/50 text-xs">
                    {formatDate(data.last_message_timestamp)}
                  </p>
                </div>
                <p className="text-gray-500 font-bold text-sm">{data.last_message_content}</p>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
export default Messages