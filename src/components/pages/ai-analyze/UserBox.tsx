import styles from '@components/pages/ai-analyze/box.module.css';

interface Props {
  text: string;
}

const UserBox = ({ text }: Props) => {
  return (
    <div className={styles.user_wrapper}>
      <div className={`${styles.user_text} r-regular`}>{text}</div>
    </div>
  );
};

export default UserBox;
