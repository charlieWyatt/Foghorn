const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const getBaseUrl = () => {
  return development
    ? "http://localhost:4000"
    : `${window.location.protocol}//${window.location.host}`;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};
