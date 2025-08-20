import { useState } from "react";

export const useGlobalLoading = () => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return { loading, showLoading, hideLoading };
};
