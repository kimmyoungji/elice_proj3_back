import styles from '@components/pages/ai-analyze/box.module.css';
import ButtonCommon from '@components/UI/ButtonCommon';
import { useState } from 'react';
import UserBox from './UserBox';

interface Props {
  toSave: boolean;
  text: string;
  button: { type: string; text: string }[];
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>, idx: number) => void;
}

const BotBox = ({ toSave, text, button, handleOnClick }: Props) => {
  const [scrap, setScrap] = useState(false);

  const handleScrap = () => {
    setScrap(!scrap);
    // 스크랩되었음을 안내
    // 스크랩 API 호출
  };

  return (
    <div className={styles.question_wrapper}>
      <div className={styles.box_wrapper}>
        <img src='/images/9gram_logo.png' alt='ai bot' />
        <div className={styles.chat_wrapper}>
          <div className={styles.text_wrapper}>
            <div
              className={`${styles.text} r-regular`}
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
            <div className={styles.button_wrapper}>
              <>
                {button.map((one, idx) => (
                  <div key={`chatBtn-${idx}`}>
                    <ButtonCommon
                      variant='default-active'
                      size='med-small'
                      onClickBtn={(e) => handleOnClick(e, idx)}
                    >
                      {one.text}
                    </ButtonCommon>
                  </div>
                ))}
              </>
            </div>
          </div>
          {toSave && (
            <div className={styles.scrap_wrapper} onClick={handleScrap}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                strokeWidth='2'
                stroke='currentColor'
                className={scrap ? `w-6 h-6 ${styles.scrapped}` : 'w-6 h-6'}
                width='13'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotBox;
