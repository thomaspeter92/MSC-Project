import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../../services/userService';
import { useUserStore } from '../../stores/userStore';
import { Icons } from '../../components/icons';
import { useState } from 'react';
import ProfileCard from '../../components/profileCard';
import { useParams } from 'react-router-dom';
import { Popover } from '@headlessui/react';
import Modal from '../../components/modal';
import { useModal } from '../../hooks/useModal';
import SelectInput from '../../components/selectInput';
import Button from '../../components/button';
import AboutMeForm from '../../components/profile/aboutMeForm';

type Props = {};

// PEXELS API KEY cVwTkwpovfH10DvMh0GTfNxcqNJXHpNfkwvARx8D3dpibaxHAm7z8xZgPEX

const Profile = ({}: Props) => {
  const { id } = useParams();
  const [user] = useUserStore((state) => [state.user]);
  const { data, isPending } = useQuery({
    queryKey: ['profile', id ? id : user.id],
    queryFn: () => getUserProfile(id ? id : user.id),
  });
  const [showAdditional, setShowAdditional] = useState<boolean>(false);
  const { open: aboutModalOpen, toggleModal: toggleAboutModal } =
    useModal(false);
  const { open: essayModalOpen, toggleModal: toggleEssayModal } =
    useModal(false);

  const RightIcon = Icons['right'];
  const MoreIcon = Icons['ellipsis'];
  const PencilIcon = Icons['pencil'];

  const userInfo = data?.data;

  if (userInfo && !isPending) {
    return (
      <section className="space-y-5">
        <ProfileCard
          userId={userInfo.id}
          name={userInfo.first_name}
          bio={userInfo.bio}
          image={userInfo.picture}
          likes={userInfo.likes}
          dislikes={userInfo.dislikes}
          age={userInfo.age}
          location={userInfo.location}
          isConnection={false}
        />
        <div className="bg-white rounded-xl p-5 mb-5 ">
          <div className="w-full flex justify-between">
            <h5>About Me</h5>
            <Popover className="relative">
              <Popover.Button>
                <MoreIcon
                  size={30}
                  className="text-rose-500 hover:text-rose-300"
                />
              </Popover.Button>
              <Popover.Panel className="absolute top-full right-0 bg-white shadow-main border border-gray-100 rounded">
                <button
                  onClick={toggleAboutModal}
                  className="text-rose-500 whitespace-nowrap p-3 flex items-center gap-2 hover:bg-rose-100"
                >
                  <PencilIcon size={20} />
                  Edit Profile
                </button>
              </Popover.Panel>
            </Popover>
          </div>
          <div className="flex flex-wrap items-center space-y-1 capitalize">
            {/* SMOKES */}
            <div className="w-1/2 flex items-center">
              <p className=" text-gray-500 text-sm w-24">Smokes</p>
              <p className="font-semibold">{data.data.smokes || '?'}</p>
            </div>
            {/* HOMETOWN */}
            <div className="w-1/2 flex items-center">
              <p className=" text-gray-500 text-sm w-24">Diet</p>
              <p className="font-semibold">{data.data.diet || '?'}</p>
            </div>
            {/* DRINKS */}
            <div className="w-1/2 flex items-center">
              <p className=" text-gray-500 text-sm w-24">Drinks</p>
              <p className="font-semibold">{data.data.drinks || '?'}</p>
            </div>
            {/* LANGUAGES */}
            <div className="w-1/2 flex items-center">
              <p className=" text-gray-500 text-sm w-24">Education</p>
              <p className="font-semibold">{data.data.education || '?'}</p>
            </div>
            {/* PETS */}
            <div className="w-1/2 flex items-center">
              <p className=" text-gray-500 text-sm w-24">Pets</p>
              <p className="font-semibold">{data.data.pets || '?'}</p>
            </div>
            {/* EDUCATION */}
            <div className="w-1/2 flex items-center">
              <p className=" text-gray-500 text-sm w-24">Job</p>
              <p className="font-semibold">{data.data.job || '?'}</p>
            </div>
            {/* CHILDREN */}
            <div className="w-1/2 flex items-center">
              <p className=" text-gray-500 text-sm w-24">Children</p>
              <p className="font-semibold">{data.data.offspring || '?'}</p>
            </div>
            {/* BODY TYPE */}
            <div className="w-1/2 flex items-center">
              <p className=" text-gray-500 text-sm w-24">Body Type</p>
              <p className="font-semibold">{data.data.body_type || '?'}</p>
            </div>
          </div>
          <hr className="my-5" />
          <button
            className="font-bold text-rose-500 mt-5 flex items-center"
            onClick={() => setShowAdditional(!showAdditional)}
          >
            See {showAdditional ? 'less' : 'more'} about {data.data.first_name}{' '}
            <RightIcon size={20} />
          </button>
          {showAdditional ? (
            <div className="space-y-5 py-5 relative">
              <Popover className="absolute top-0 right-0">
                <Popover.Button>
                  <MoreIcon
                    size={30}
                    className="text-rose-500 hover:text-rose-300"
                  />
                </Popover.Button>
                <Popover.Panel className="absolute top-full right-0 bg-white shadow-main border border-gray-100 rounded">
                  <button
                    onClick={toggleEssayModal}
                    className="text-rose-500 whitespace-nowrap p-3 flex items-center gap-2 hover:bg-rose-100"
                  >
                    <PencilIcon size={20} />
                    Edit My Essays
                  </button>
                </Popover.Panel>
              </Popover>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>Self Summary</h6>
                <p>{data.data.essay0}</p>
              </div>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>What I'm doing with my life...</h6>
                <p>{data.data.essay1}</p>
              </div>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>I'm really good at...</h6>
                <p>{data.data.essay2}</p>
              </div>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>The first thing people notice about me</h6>
                <p>{data.data.essay3}</p>
              </div>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>My favorite media is...</h6>
                <p>{data.data.essay4}</p>
              </div>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>The things I could never do without</h6>
                <p>{data.data.essay4}</p>
              </div>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>I spend a lot of time thinking about...</h6>
                <p>{data.data.essay4}</p>
              </div>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>On a typical Friday night I am...</h6>
                <p>{data.data.essay4}</p>
              </div>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>The most private thing I am willing to admit</h6>
                <p>{data.data.essay4}</p>
              </div>
              <div className="[&>p]:text-sm [&>p]:text-gray-500">
                <h6>You should message me if...</h6>
                <p>{data.data.essay4}</p>
              </div>
            </div>
          ) : null}
        </div>
        <Modal open={aboutModalOpen} onClose={toggleAboutModal}>
          <AboutMeForm
            close={toggleAboutModal}
            profile={data.data}
            user_id={user.id}
          />
        </Modal>
        <Modal open={essayModalOpen} onClose={toggleEssayModal}>
          <div className="p-5 bg-white"></div>
        </Modal>
      </section>
    );
  }
};

export default Profile;
