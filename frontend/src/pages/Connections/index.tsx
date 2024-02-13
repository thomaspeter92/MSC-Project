import React, { useState } from 'react';
import { Icons } from '../../components/icons';
import Button from '../../components/button';
import { useQuery } from '@tanstack/react-query';
import { getConnections } from '../../services/connectionsService';
import LoadingSpinner from '../../components/loadingSpinner';
import ProfileCard from '../../components/profileCard';
import Modal from '../../components/modal';
import { useModal } from '../../hooks/useModal';
import ProfilePreview from '../../components/profilePreview';
import { useUserStore } from "../../stores/userStore";
import { Link } from "react-router-dom";

type Props = {};

const Connections = ({ }: Props) => {
  const { open, toggleModal } = useModal(false);
  const [expanded, setExpanded] = useState(0);
  const [user] = useUserStore((state) => [state.user]);

  const HeartIcon = Icons['heart'];


  const { data: users, isFetching } = useQuery({
    queryKey: ['connections', user.email],
    queryFn: () => getConnections(),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: user.complete
  });

  const handleExpand = (id: number) => {
    setExpanded(id);
    toggleModal();
  };
  console.log(user)

  if (isFetching) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <div className="space-y-8">
        <h3 className="flex items-center gap-2 text-rose-500">
          <HeartIcon />
          Here are today's suggestions:
        </h3>
        {!user.complete ?
          <p>Please <Link to="/profile" className="font-bold text-rose-400">complete your profile</Link> to begin making connections. Your profile data is needed to help find you the perfect match.</p>
          : null}
        {users?.data?.length > 0 ?
          users?.data?.map((d: any) => (
            <ProfileCard
              key={d.id}
              userId={d.id}
              name={d.first_name}
              age={d.age}
              location={d.location}
              image={d?.picture}
              likes={d.likes}
              dislikes={d.dislikes}
              bio={d.bio}
              isConnection
              onProfileClick={() => handleExpand(d.id)}
            />
          ))
          : <p>No more connections available, please check back tomorrow.</p>
        }
      </div>
      <Modal
        className="w-[150ch] max-h-[95vh] overflow-y-scroll"
        open={open}
        onClose={toggleModal}
      >
        <ProfilePreview userId={expanded} />
      </Modal>
    </>
  );
};

export default Connections;
