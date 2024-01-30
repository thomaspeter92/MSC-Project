import { getUserProfile } from "../services/userService";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./loadingSpinner";
type Props = {
  userId: number
}

const ProfilePreview = ({ userId }: Props) => {
  const { data, isPending } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUserProfile(userId + ""),
  });


  if (isPending) return <LoadingSpinner />

  console.log(data)
  return (
    <div>
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
    </div>
  )
}

export default ProfilePreview