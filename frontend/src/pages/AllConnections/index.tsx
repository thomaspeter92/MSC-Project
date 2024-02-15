import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getConnectionsList } from '../../services/connectionsService';
import Button from '../../components/button';
import { Icons } from '../../components/icons';
import TextInput from '../../components/textInput';
type Props = {};

const AllConnections = ({}: Props) => {
  const UserIcon = Icons['user1'];
  const { data, isFetching, error } = useQuery({
    queryKey: ['all-connections'],
    queryFn: getConnectionsList,
  });

  return (
    <div className="p-5  rounded-xl">
      <div className="mb-5 bg-white rounded-xl p-5">
        <h5 className="mb-5">All Connections</h5>
        <div className="flex gap-3">
          <TextInput
            placeholder="Search connections..."
            size="sm"
            className="rounded-full"
          />
          <Button className="rounded-full" size={'sm'} intent="primary">
            Search
          </Button>
        </div>
      </div>
      {data?.data.length > 0 ? (
        <div className="flex flex-wrap gap-10">
          {data.data.map((d: any) => (
            <div className=" bg-white rounded-lg shadow-main rounded p-5 flex flex-col items-center gap-3">
              {d.picutre ? null : (
                <UserIcon
                  className="bg-rose-100 p-5 rounded-full text-rose-300"
                  size={100}
                />
              )}
              <p className="text-gray-500 font-bold">{d.first_name}</p>
              <div className="flex gap-2">
                <Button className="rounded" intent={'gray'} size={'sm'}>
                  Block
                </Button>
                <Button className="rounded" size={'sm'}>
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">You don't have any connections yet</p>
      )}
    </div>
  );
};

export default AllConnections;
