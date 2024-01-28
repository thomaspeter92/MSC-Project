import React from 'react';
import { Icons } from '../../components/icons';
import Button from '../../components/button';
import { useQuery } from "@tanstack/react-query";
import { getConnections } from "../../services/connectionsService";
import LoadingSpinner from "../../components/loadingSpinner";

type Props = {};


const Connections = ({}: Props) => {

  const { data:users, isPending, error } = useQuery({
    queryKey: ["connections"],
    queryFn: () => getConnections(),
    retry: false
  });


  const HeartIcon = Icons['heart'];
  const LocationIcon = Icons['location'];
  if (isPending) {
    return <div className="w-full flex justify-center items-center h-full">
      <LoadingSpinner />
      </div>
  }
  return (
    <div className="space-y-8">
      <h3 className="flex items-center gap-2 text-rose-500">
        <HeartIcon />
        Here are today's suggestions:
      </h3>
      {users?.data?.map((d: any) => (
        <div className="bg-white p-5 rounded-xl flex gap-5">
          <div className="bg-gray-100 min-w-[200px] relative rounded overflow-hidden">
            <img className="object-cover h-full top-0 left-0 absolute" src="https://fxxqwotagugztamftphi.supabase.co/storage/v1/object/public/gallery/ANTassF7eGgTmbFOMtgYsj5Sn5i2/profile.png" />
          </div>
          <div className="space-y-2">
            <h5>
              {d.first_name}, {d.age}
            </h5>
            <div className="flex gap-2 items-center text-gray-400 ">
              <LocationIcon size={15} />
              <p>Oakland, California</p>
            </div>
            <p className="text-sm">{d.Profile.bio || "This is a placeholder for the user's bio text. This doesnt effect the recommendations."}</p>
            <div className="flex gap-3mb-3">
              <div className="flex-1">
                <p className="font-bold mb-2">Likes</p>
                <div className="flex gap-2 flex-wrap">
                  {d.likes?.slice(0,3)?.map((d: string, i: number) => (
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
                  {d.dislikes?.slice(0,3)?.map((d: string, i: number) => (
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
            <Button className=" font-bold" intent="text" icon="right">
              See More about {d.first_name}
            </Button>
            <div className="flex gap-5 mt-3">
              <Button intent={'gray'} size={'lg'}>
                Delete
              </Button>
              <Button size={'lg'} icon="connect" intent={'primary'}>
                Connect
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
