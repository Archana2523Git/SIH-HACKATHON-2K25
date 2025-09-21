import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

const useNotification = () => {
  const showSuccess = useCallback((message) => {
    toast.success(message);
  }, []);

  const showError = useCallback((message) => {
    toast.error(message);
  }, []);

  const showLoading = useCallback((message) => {
    return toast.loading(message);
  }, []);

  const dismiss = useCallback((toastId) => {
    toast.dismiss(toastId);
  }, []);

  const updateNotification = useCallback((toastId, type, message) => {
    toast[type](message, { id: toastId });
  }, []);

  return {
    showSuccess,
    showError,
    showLoading,
    dismiss,
    updateNotification,
  };
};

export default useNotification;
