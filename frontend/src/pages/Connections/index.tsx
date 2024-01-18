import React from 'react';
import { Icons } from '../../components/icons';
import Button from '../../components/button';

type Props = {};

const USERS = [
  {
    name: 'Danny',
    age: 33,
    pronouns: 'he/him',
    bio: 'New to the area and looking for new connections. Hmu if you’re a nature lover! 🌿',
    likes: ['fitness', 'travel', 'nature', 'outdoor'],
    dislikes: ['mess', 'drugs', 'alchol', 'politics', 'poor hygiene'],
  },
  {
    name: 'Min',
    age: 28,
    pronouns: 'they/them',
    bio: 'Grad student studying cognitive science and design. Looking for a serious relationship.',
    likes: ['art', 'gym', 'reading', 'tennis', 'hiking'],
    dislikes: ['laziness', 'cats', 'horror movies', 'religion'],
  },
  {
    name: 'Min',
    age: 28,
    pronouns: 'they/them',
    bio: 'Grad student studying cognitive science and design. Looking for a serious relationship.',
    likes: ['art', 'gym', 'reading', 'tennis', 'hiking'],
    dislikes: ['laziness', 'cats', 'horror movies', 'religion'],
  },
  {
    name: 'Min',
    age: 28,
    pronouns: 'they/them',
    bio: 'Grad student studying cognitive science and design. Looking for a serious relationship.',
    likes: ['art', 'gym', 'reading', 'tennis', 'hiking'],
    dislikes: ['laziness', 'cats', 'horror movies', 'religion'],
  },
];

const Connections = ({}: Props) => {
  const HeartIcon = Icons['heart'];
  const LocationIcon = Icons['location'];
  return (
    <div className="space-y-8">
      <h3 className="flex items-center gap-2 text-rose-500">
        <HeartIcon />
        Here are today's suggestions:
      </h3>
      {USERS.map((d) => (
        <div className="bg-white p-5 rounded-xl flex gap-5">
          <div className="bg-gray-100 w-1/4">Pic area</div>
          <div className="">
            <h5>
              {d.name}, {d.age}
            </h5>
            <div className="flex gap-2 items-center text-gray-400 ">
              <LocationIcon size={15} />
              <p>Oakland, California</p>
            </div>
            <p className="text-sm">{d.bio}</p>
            <div className="flex gap-5 pt-5 mb-3">
              <div className="flex-1">
                <p className="font-bold mb-2">Likes</p>
                <div className="flex gap-2 flex-wrap">
                  {d.likes?.map((d: string, i: number) => (
                    <p
                      className="p-1 bg-green-100 text-green-600 text-sm px-2 rounded capitalize font-medium"
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
                  {d.dislikes?.map((d: string, i: number) => (
                    <p
                      className="p-1 bg-red-100 text-red-600 text-sm px-2 rounded capitalize font-medium"
                      key={d + i}
                    >
                      {d}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <Button className=" font-bold" intent="text" icon="right">
              See More about {d.name}
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
