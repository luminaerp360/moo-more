import React from 'react';
import { CheckoutModal } from './CheckoutModal';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProductId?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  preselectedProductId,
}) => {
  return (
    <CheckoutModal
      isOpen={isOpen}
      onClose={onClose}
      preselectedProductId={preselectedProductId}
    />
  );
};
