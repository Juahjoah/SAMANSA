'use client';
import styles from './Card.module.css';

export default function Button({
  variant = 'large',
  children = '',
  ...other
}: CardProps) {
  let variantClass;
  switch (variant) {
    case 'large':
      variantClass = styles.large;
      break;
    case 'medium':
      variantClass = styles.medium;
      break;
    case 'small':
      variantClass = styles.small;
      break;
  }
  return (
    <div {...other} className={`${styles.base} ${variantClass}`}>
      {children}
    </div>
  );
}

type CardProps = {
  variant?: 'large' | 'medium' | 'small';
  children: string;
};
