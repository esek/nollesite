import { useState } from 'react';

export const useToggle = (defaultValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultValue);

  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, open, close };
};
