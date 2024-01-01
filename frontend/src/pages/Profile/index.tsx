import IMAGES from "../../assets/images/images"

type Props = {}

const Profile = ({}: Props) => {
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