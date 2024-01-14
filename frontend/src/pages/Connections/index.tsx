import React from "react";
import { Icons } from "../../components/icons";

type Props = {};

const Connections = ({}: Props) => {
  const HeartIcon = Icons["heart"];
  return (
    <div>
      <h3 className="flex items-center gap-2 text-rose-500">
        <HeartIcon />
        Here are today's suggestions:
      </h3>
    </div>
  );
};

export default Connections;
