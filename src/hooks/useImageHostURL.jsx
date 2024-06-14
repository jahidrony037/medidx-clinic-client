const useImageHostURL = () => {
  const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_host_url = import.meta.env.VITE_IMAGE_HOST_URL;
  const host_url = `${image_host_url}?key=${image_api_key}`;
  return host_url;
};

export default useImageHostURL;
