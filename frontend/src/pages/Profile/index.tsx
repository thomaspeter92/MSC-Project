import { useQuery } from "@tanstack/react-query"
import IMAGES from "../../assets/images/images"
import { getUserProfile } from "../../services/userService"
import { useUserStore } from "../../stores/userStore"
import { Icons } from "../../components/icons"
import Button from "../../components/button"

type Props = {}

const Profile = ({}: Props) => {
  const [user] = useUserStore((state) => [state.user])
  const {data, isPending, error} = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserProfile(user.id)
  })

  const LocationIcon = Icons['location']


  if(data && !isPending){
    return (
    <section className="space-y-5">

    <div className="bg-white rounded-xl flex">
      <img src={IMAGES.photos.sebastian1} alt="" />
      <div className="p-5 space-y-2">
        <h4>{data.data.first_name}, {data.data.age}</h4>
        <div className="flex gap-2 items-center text-gray-400 ">
          <LocationIcon size={15} />
          <p>Oakland, California</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-5">
      <h5>
        About Me
      </h5>
      <div className="flex flex-wrap items-center space-y-1">
        {/* GENDER */}
       <div className="w-1/2 flex items-center">
          <p className=" text-gray-500 text-sm w-24">
            Gender 
          </p>
          <p className="font-semibold">
            {data.data.sex === "m" ? 'Male' : "Female"}
          </p>
       </div>
        {/* SMOKES */}
       <div className="w-1/2 flex items-center">
          <p className=" text-gray-500 text-sm w-24">
            Smokes 
          </p>
          <p className="font-semibold">
            {data.data.smokes || '?'}
          </p>
       </div>
       {/* HOMETOWN */}
       <div className="w-1/2 flex items-center">
          <p className=" text-gray-500 text-sm w-24">
            Hometown 
          </p>
          <p className="font-semibold">
            {data.data.hometown || '?' }
          </p>
       </div>
        {/* DRINKS */}
        <div className="w-1/2 flex items-center">
          <p className=" text-gray-500 text-sm w-24">
            Drinks 
          </p>
          <p className="font-semibold">
            {data.data.hometown || '?' }
          </p>
       </div>
        {/* LANGUAGES */}
        <div className="w-1/2 flex items-center">
          <p className=" text-gray-500 text-sm w-24">
            Languages 
          </p>
          <p className="font-semibold">
            {data.data.hometown || '?' }
          </p>
       </div>
        {/* PETS */}
        <div className="w-1/2 flex items-center">
          <p className=" text-gray-500 text-sm w-24">
            Pets 
          </p>
          <p className="font-semibold">
            {data.data.hometown || '?' }
          </p>
       </div>
        {/* EDUCATION */}
        <div className="w-1/2 flex items-center">
          <p className=" text-gray-500 text-sm w-24">
            Education 
          </p>
          <p className="font-semibold">
            {data.data.hometown || '?' }
          </p>
       </div>
        {/* CHILDREN */}
        <div className="w-1/2 flex items-center">
          <p className=" text-gray-500 text-sm w-24">
            Children 
          </p>
          <p className="font-semibold">
            {data.data.hometown || '?' }
          </p>
       </div>
      </div>
      <hr className="my-5" />
      <h5>
        About Me
      </h5>
      <div>

      </div>
      <hr className="my-5" />
      <Button intent="text">See more about {data.data.first_name}</Button>
    </div>
    </section>
  )}
}

export default Profile