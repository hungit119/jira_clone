import React from "react";
import * as Component from "antd";
export const Widget = ({ widget }) => {
  const WidgetComponent = Component[widget];
  return <WidgetComponent />;
};
