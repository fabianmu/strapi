import { useState } from 'react';
import { useNotification } from '@strapi/helper-plugin';
import { axiosInstance } from '../../core/utils';

const useRegenerate = (id, onRegenerate) => {
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);
  const toggleNotification = useNotification();

  const regenerateData = async () => {
    try {
      const {
        data: {
          data: { accessKey },
        },
      } = await axiosInstance.post(`/admin/api-tokens/${id}/regenerate`);
      setIsLoadingConfirmation(false);
      onRegenerate(accessKey);
    } catch (error) {
      setIsLoadingConfirmation(false);
      toggleNotification({
        type: 'warning',
        message: error?.response?.data?.message ?? 'notification.error',
      });
    }
  };

  return {
    regenerateData,
    isLoadingConfirmation,
  };
};

export default useRegenerate;
