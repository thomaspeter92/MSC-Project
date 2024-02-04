import Button from '../../components/button';

type Props = {};

const Settings = ({ }: Props) => {
  return (
    <div className="rounded-xl p-10 bg-white shadow-main space-y-5">
      <div className="space-y-3 pb-5 border-b border-gray-200">
        <h5>Privacy & Security</h5>
        <div className="flex gap-5">
          <h6 className="w-1/5 text-gray-600">Profile Visibility</h6>
          <p className="text-gray-500">Everyone can see my profile</p>
          <button className="text-rose-500 font-bold ml-auto">Edit</button>
        </div>
        <div className="flex gap-5">
          <h6 className="w-1/5 text-gray-600">Allow Messages</h6>
          <p className="text-gray-500">Only connections can message me</p>
          <button className="text-rose-500 font-bold ml-auto">Edit</button>
        </div>
      </div>
      <div className="space-y-3 pb-5 border-b border-gray-200">
        <h5>Account</h5>
        <div className="flex gap-5">
          <h6 className="w-1/5 text-gray-600">Email Address</h6>
          <p className="text-gray-500">thomastest@test.com</p>
          <button className="text-rose-500 font-bold ml-auto">Edit</button>
        </div>
        <div className="flex gap-5">
          <h6 className="w-1/5 text-gray-600">Password</h6>
          <p className="text-gray-500">************</p>
          <button className="text-rose-500 font-bold ml-auto">Edit</button>
        </div>
      </div>
      <Button size={'lg'} intent="dager">
        Delete Account
      </Button>
    </div>
  );
};

export default Settings;
