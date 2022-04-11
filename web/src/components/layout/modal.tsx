import { useLocale } from '@/hooks/locale.hook';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

type Props = {
  title: string;
  isVisible?: boolean;
  onChange?: (value: boolean) => void;
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
      className={`fixed inset-0 z-50 flex items-center justify-center`}
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/30" onClick={handleClose}></div>

      <div className="relative w-full max-w-sm bg-primary p-6 text-secondary shadow-sm shadow-secondary/10">
        <header className="flex items-center justify-between text-lg font-semibold">
          <span>{title}</span>

          <button onClick={handleClose} aria-label="Close modal">
            <FiX />
          </button>
        </header>

        <main>{children}</main>

        <footer className="mt-2">
          <button
            className="float-right bg-accent px-4 py-1"
            onClick={handleClose}
          >
            {t('close')}
          </button>
        </footer>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
