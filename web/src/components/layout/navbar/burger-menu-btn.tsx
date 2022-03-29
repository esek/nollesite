import styles from 'src/styles/navbar.module.scss';

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

const BurgerMenuBtn: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <button
      aria-label={`${isOpen ? 'Open' : 'Close'} the menu`}
      className="flex flex-col"
      onClick={onClick}
    >
      {new Array(3).fill(null).map((_, i) => (
        <span
          key={`burger-line-${i}`}
          aria-hidden="true"
          className={`${styles.line} ${isOpen ? styles.open : ''}`}
        ></span>
      ))}
    </button>
  );
};

export default BurgerMenuBtn;
