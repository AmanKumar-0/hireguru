export const ToastConfig = (title, description, status) => {
  return {
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
  };
};
