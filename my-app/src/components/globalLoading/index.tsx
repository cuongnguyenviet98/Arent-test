import { Spin } from "antd";
import React from "react";

interface GlobalLoadingProps {
  spinning: boolean;
}

const GlobalLoading: React.FC<GlobalLoadingProps> = ({ spinning }) => {
  if (!spinning) return null; // 👈 không render khi tắt

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255,255,255,0.6)",
        zIndex: 9999,
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default GlobalLoading;
