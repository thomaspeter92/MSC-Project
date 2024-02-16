import { useQuery } from '@tanstack/react-query';
import { getConnectionsList } from '../../services/connectionsService';
import Button from '../../components/button';
import { Icons } from '../../components/icons';
import { Link } from 'react-router-dom';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';
import LoadingSpinner from '../../components/loadingSpinner';

type Props = {};

const AllConnections = ({}: Props) => {
  const UserIcon = Icons['user1'];
  const { data, isFetching } = useQuery({
    queryKey: ['all-connections'],
    queryFn: getConnectionsList,
  });
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === '' && data?.data
      ? data.data
      : data?.data
        ? data?.data?.filter((person: any) =>
            person.first_name.toLowerCase().includes(query.toLocaleLowerCase())
          )
        : [];

  return (
    <div className="p-5  rounded-xl">
      <div className="mb-5 bg-white rounded-xl p-5">
        <h5 className="mb-5">All Connections</h5>
        <div className="relative">
          <Combobox>
            <Combobox.Input
              placeholder="Search all connections..."
              className={
                'bg-rose-100 w-full py-2 px-5 rounded-full placeholder:text-rose-300 focus:outline-rose-500'
              }
              onChange={(e: any) => setQuery(e.target.value)}
            />
          </Combobox>
        </div>
      </div>
      {data?.data.length > 0 ? (
        <div className="flex flex-wrap gap-10">
          {filteredPeople.map((d: any) => (
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
                <Link to={'/profile/' + d.id}>
                  <Button className="rounded" size={'sm'}>
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : isFetching ? (
        <div className="w-full flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <p className="text-center">You don't have any connections yet</p>
      )}
    </div>
  );
};

export default AllConnections;
