import { Icons } from "./icons";

type Props = {};

const Notification = ({}: Props) => {
  const Icon = Icons["bell"];
  return (
    <button>
      <Icon />
    </button>
  );
};

export default Notification;
