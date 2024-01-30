import React from 'react';
import { Icons } from '../../components/icons';
import Button from '../../components/button';
import { useQuery } from '@tanstack/react-query';
import { getConnections } from '../../services/connectionsService';
import LoadingSpinner from '../../components/loadingSpinner';
import ProfileCard from '../../components/profileCard';

type Props = {};

const Connections = ({}: Props) => {
  const {
    data: users,
    isPending,
    error,
  } = useQuery({
    queryKey: ['connections'],
    queryFn: () => getConnections(),
    retry: false,
  });

  const HeartIcon = Icons['heart'];
  const LocationIcon = Icons['location'];
  if (isPending) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <h3 className="flex items-center gap-2 text-rose-500">
        <HeartIcon />
        Here are today's suggestions:
      </h3>
      {users?.data?.map((d: any) => (
        <ProfileCard
          name={d.first_name}
          age={d.age}
          location={d.location}
          image={
            d.picture ||
            'https://fxxqwotagugztamftphi.supabase.co/storage/v1/object/public/gallery/ANTassF7eGgTmbFOMtgYsj5Sn5i2/profile.png'
          }
          likes={d.likes}
          dislikes={d.dislikes}
          bio={d.bio}
          isConnection
        />
      ))}
    </div>
  );
};

export default Connections;
