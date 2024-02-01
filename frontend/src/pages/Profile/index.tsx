import { useQuery } from '@tanstack/react-query';
import { getUserProfile, updateProfile } from '../../services/userService';
import { useUserStore } from '../../stores/userStore';
import { Icons } from '../../components/icons';
import { useState } from 'react';
// import { Popover } from '@headlessui/react';
import ProfileCard from '../../components/profileCard';
import { useQueryParams } from '../../hooks/util';
import { useParams } from 'react-router-dom';
type Props = {};

const Profile = ({}: Props) => {
  const { id } = useParams();
  const [user] = useUserStore((state) => [state.user]);
  const { data, isPending } = useQuery({
    queryKey: ['profile', id ? id : user.id],
    queryFn: () => getUserProfile(id ? id : user.id),
  });
  const [image, setImage] = useState<any>(null);
  const [showAdditional, setShowAdditional] = useState<boolean>(false);
  const RightIcon = Icons['right'];

  const userInfo = data?.data;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // 1 - upload image through supbase client
    // 2 - get the id of the image
    // 3 - save the image link to the db
    console.log(image);
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', user.id);

    const response = await updateProfile(formData);
    console.log(response);
  };

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
          <h5>About Me</h5>
          <div className="flex flex-wrap items-center space-y-1 capitalize">
            {/* GENDER */}
            <div className="w-1/2 flex items-center">
              <p className=" text-gray-500 text-sm w-24">Gender</p>
              <p className="font-semibold">
                {data.data.sex === 'm' ? 'Male' : 'Female'}
              </p>
            </div>
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
          </div>
          <hr className="my-5" />
          <h5>Gallery</h5>

          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/"
              onChange={(e: any) => setImage(e?.target?.files[0])}
            />
            <button type="submit">submit</button>
          </form>
          <div></div>
          <hr className="my-5" />
          <button
            className="font-bold text-rose-500 mb-5 flex items-center"
            onClick={() => setShowAdditional(true)}
          >
            See {showAdditional ? 'less' : 'more'} about {data.data.first_name}{' '}
            <RightIcon size={20} />
          </button>
          {showAdditional ? (
            <div className="space-y-5 ">
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
      </section>
    );
  }
};

export default Profile;
