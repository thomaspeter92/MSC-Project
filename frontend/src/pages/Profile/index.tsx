import { useQuery } from "@tanstack/react-query"
import IMAGES from "../../assets/images/images"
import { getUser } from "../../services/userService"
import { useParams } from "react-router-dom"

type Props = {}

const Profile = ({}: Props) => {
  const {id} = useParams()
  const {data, isPending, error} = useQuery({
    queryKey: ['user', 1],
    queryFn: () => getUser(id)
  })

  console.log(data)
  return (
    <div className="bg-white rounded-xl flex">
      <img src={IMAGES.photos.sebastian1} alt="" />
      <div className="p-5">
        <h4>Sebastian, 31</h4>
      </div>
    </div>
  )
}

export default Profile