import styles from './Modal.module.css';
import Image from 'next/image';
import alert from '@/public/assets/alert_icon.png';

type ModalProps = {
  maskClosable: boolean;
  visible: boolean;
  onClose: () => void;
  action: () => void;
};

export default function Modal({
  onClose,
  maskClosable,
  action,
  visible,
}: ModalProps) {
  const onMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const close = () => {
    if (onClose) {
      onClose();
    }
  };

  const Delete = () => {
    onClose();
    action();
  };
  //   if (!open) return null;
  return (
    <>
      <div
        className={`${styles.overlayStyle} ${visible ? styles.visible : ''}`}
      />
      <div
        className={`${styles.modalStyle} ${visible ? styles.visible : ''}`}
        onClick={maskClosable ? onMaskClick : undefined}
      >
        <div className={styles.modalInner}>
          <Image src={alert} alt="alert" width={45} height={45} />
          <p>단어를 삭제하시겠습니까?</p>
          <p>
            삭제된 단어는 다시 복구할 수 없으니 <br /> 신중히 결정해주세요.
          </p>
          <div className={styles.container}>
            <div className={styles.closebutton} onClick={close}>
              취소
            </div>
            <div className={styles.deletebutton} onClick={Delete}>
              확인
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
