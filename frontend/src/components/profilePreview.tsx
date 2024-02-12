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
    <div className="overflow-scroll h-full">
      <h5>About Me</h5>
      <div className="flex flex-wrap items-center space-y-1 capitalize border-b pb-5">
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
        {/* CHILDREN */}
        <div className="w-1/2 flex items-center">
          <p className=" text-gray-500 text-sm w-24">Body Type</p>
          <p className="font-semibold">{data.data?.body_type || '?'}</p>
        </div>
      </div>
      <div className="mt-2 grid md:grid-cols-2 gap-3">
        {data.data?.essay0 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>Self Summary</h6>
            <p>{data.data.essay0}</p>
          </div>
        }
        {data.data.essay1 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>What I'm doing with my life...</h6>
            <p>{data.data.essay1}</p>
          </div>
        }
        {data.data.essay2 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>I'm really good at...</h6>
            <p>{data.data.essay2}</p>
          </div>}
        {data.data.essay3 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>The first thing people notice about me</h6>
            <p>{data.data.essay3}</p>
          </div>}
        {data.data.essay4 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>My favorite media is...</h6>
            <p>{data.data.essay4}</p>
          </div>
        }
        {data.data.essay5 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>The things I could never do without</h6>
            <p>{data.data.essay4}</p>
          </div>
        }
        {data.data.essay6 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>I spend a lot of time thinking about...</h6>
            <p>{data.data.essay4}</p>
          </div>}
        {data.data.essay7 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>On a typical Friday night I am...</h6>
            <p>{data.data.essay4}</p>
          </div>}
        {data.data.essay8 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>The most private thing I am willing to admit</h6>
            <p>{data.data.essay4}</p>
          </div>}
        {data.data.essay9 &&
          <div className="[&>p]:text-sm [&>p]:text-gray-500">
            <h6>You should message me if...</h6>
            <p>{data.data.essay4}</p>
          </div>
        }
      </div>

    </div>
  )
}

export default ProfilePreview