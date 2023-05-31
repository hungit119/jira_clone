import React from "react";
import * as Icons from "react-icons/io5";

export const DynamicIcon = ({ name }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return <Icons.IoBeer />;
  }

  return <IconComponent />;
};
