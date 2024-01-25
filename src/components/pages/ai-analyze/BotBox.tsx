import { Scrap } from '@assets/Scrap';
import styles from '@components/pages/ai-analyze/box.module.css';
import ButtonCommon from '@components/UI/ButtonCommon';
import { useEffect, useState } from 'react';
import MiniToast from './MiniToast';

interface Props {
  toSave: boolean;
  text: string;
  button: { type: string; text: string }[];
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>, idx: number) => void;
}

const BotBox = ({ toSave, text, button, handleOnClick }: Props) => {
  const [scrap, setScrap] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [toast, setToast] = useState(false);

  const handleScrap = (e: React.MouseEvent<HTMLDivElement>) => {
    setScrap(!scrap);
    if (!scrap) {
      setToast(true);
      // 스크랩 추가 API 호출
    } else {
      setToast(false);
      // 스크랩 삭제 API 호출
    }
  };

  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayed(true);
    }, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {delayed && (
        <div className={styles.question_wrapper}>
          <div className={styles.box_wrapper}>
            <img src='/images/9gram_logo.png' alt='ai bot' />
            <div className={styles.chat_wrapper}>
              <div className={styles.text_wrapper}>
                <div className={`${styles.text} r-regular`}>{text}</div>
                <div className={styles.button_wrapper}>
                  <>
                    {button.map((btn, idx) => (
                      <div key={`chatBtn-${idx}`}>
                        <ButtonCommon
                          variant='default-active'
                          size='med-small'
                          onClickBtn={(e) => {
                            handleOnClick(e, idx);
                            setClicked(true);
                          }}
                          disabled={clicked && true}
                          customClassName={clicked && styles.disable_btn}
                        >
                          {btn.text}
                        </ButtonCommon>
                      </div>
                    ))}
                  </>
                </div>
              </div>
              {toSave && (
                <div className={styles.scrap_wrapper} onClick={handleScrap}>
                  <Scrap scrap={scrap} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {toast && (
        <MiniToast setToast={setToast} text='서랍에 답변이 저장되었습니다.' />
      )}
    </>
  );
};

export default BotBox;
