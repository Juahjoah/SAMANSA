import styles from './button.module.css';

export default function Button({
  variant = 'base',
  children = '',
  ...other
}: ButtonProps) {
  let variantClass;
  switch (variant) {
    case 'base':
      variantClass = styles.base;
      break;
    case 'nickname':
      variantClass = styles.nickname;
      break;
    case 'logout':
      variantClass = styles.logout;
      break;
  }
  return (
    <button {...other} className={`${styles.base} ${variantClass}`}>
      {children}
    </button>
  );
}

type ButtonProps = {
  children?: string;
  variant?: 'base' | 'nickname' | 'logout';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
