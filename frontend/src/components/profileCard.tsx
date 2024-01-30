import React from 'react';
import { Icons } from './icons';
import Button from './button';

type Props = {
  name: string;
  age: number;
  image: string;
  bio: string;
  likes: string[];
  dislikes: string[];
  location: string;
  isConnection: boolean;
};

const ProfileCard = ({
  name,
  age,
  image,
  bio,
  likes,
  dislikes,
  location,
  isConnection,
}: Props) => {
  const LocationIcon = Icons['location'];
  return (
    <div className="bg-white p-5 rounded-xl flex flex-col xl:flex-row gap-5">
      <div className="bg-gray-100 min-w-[200px] h-[200px]  xl:h-auto  relative rounded-lg overflow-hidden">
        <img
          loading="lazy"
          className="object-cover w-full h-full top-0 left-0 absolute"
          src={image}
        />
      </div>
      <div className="">
        <h5>
          {name}, {age}
        </h5>
        <div className="flex gap-2 items-center text-gray-400">
          <LocationIcon size={15} />
          <p className="capitalize">{location}</p>
        </div>
        <p className=" my-3">
          {bio ||
            "This is a placeholder for the user's bio text. This doesnt effect the recommendations."}
        </p>
        <div className="flex flex-col xl:flex-row gap-3 pt-2">
          <div className="flex-1">
            <p className="font-bold mb-2">Likes</p>
            <div className="flex gap-2 flex-wrap">
              {likes?.slice(0, 3)?.map((d: string, i: number) => (
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
              {dislikes?.slice(0, 3)?.map((d: string, i: number) => (
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
        {isConnection ? (
          <>
            <Button className="py-5 font-bold" intent="text" icon="right">
              See More about {name}
            </Button>
            <div className="flex gap-5">
              <Button intent={'gray'} size={'lg'}>
                Delete
              </Button>
              <Button size={'lg'} icon="connect" intent={'primary'}>
                Connect
              </Button>
            </div>{' '}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileCard;
