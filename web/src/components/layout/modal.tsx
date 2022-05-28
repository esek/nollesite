import { useLocale } from '@/hooks/locale.hook';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Btn from '../forms/btn';

type Props = {
  title: string;
  isVisible?: boolean;
  onChange?: (value: boolean) => void;
  children?: React.ReactNode;
};

const Modal: React.FC<Props> = ({
  children,
  title,
  onChange,
  isVisible = false,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isShown, setIsShown] = useState(isVisible);

  const { t } = useLocale();

  // We can only render the modal on browser
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // If the prop changes, we update the state
  useEffect(() => {
    setIsShown(isVisible);
  }, [isVisible]);

  if (!isBrowser || !isShown) {
    return null;
  }

  const handleClose = () => {
    onChange?.(false);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2, ease: 'linear' } }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-800/50"
        onClick={handleClose}
      ></motion.div>

      <motion.div
        initial={{ y: '-20px', opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.3, ease: 'backOut' },
        }}
        className="relative w-full max-w-sm bg-primary p-6 text-secondary shadow-sm shadow-secondary/10"
      >
        <header className="flex items-center justify-between text-lg font-semibold">
          <span>{title}</span>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            aria-label="Close modal"
          >
            <FiX />
          </motion.button>
        </header>

        <main>{children}</main>

        <footer className="mt-2 text-right">
          <Btn onClick={handleClose}>{t('close')}</Btn>
        </footer>
      </motion.div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
