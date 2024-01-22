import styles from '@components/pages/ai-analyze/aianalyze.module.css';
import { useEffect, useRef, useState } from 'react';
import BotBox from './BotBox';
import UserBox from './UserBox';
import { questionData } from './QuestionData';
import { useNavigate } from 'react-router-dom';

const AiAnalyze = () => {
  const [recordText, setRecordText] = useState([]);
  // API 호출해서 저장된 일주일치 기록이 있는지 확인하고 setRecordText(true)

  // 현재 대화내용 저장
  const [chats, setChats] = useState([questionData['1']]);

  const [answerIdx, setAnswerIdx] = useState(3);
  const [questionIdx, setQuestionIdx] = useState('1');

  const navigate = useNavigate();

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    setAnswerIdx(idx);
    setQuestionIdx((prev) =>
      prev.length === 5 || prev === '1-3' ? '1' : prev + '-' + String(idx + 1)
    );
    if (questionData[questionIdx].button[idx].type === 'follow-up') {
    } else if (questionData[questionIdx].button[idx].type === 'navigate') {
      // chats 저장, 캐싱?
      navigate('/');
    } else if (questionData[questionIdx].button[idx].type === 'ai') {
      // questionData[questionIdx].type을 body에 담아서 api 호출
      console.log('api 호출');
      // 결과 기다리기
    }
  };

  /* delay 걸기 */
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    const delay = 1500;
    const timeoutId = setTimeout(() => {
      setDelayed(true);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [delayed]);

  useEffect(() => {
    setChats((prev) => [...prev, questionData[questionIdx]]);
  }, [questionIdx]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <div className={styles.main_wrapper}>
      <>
        {chats.slice(1).map((chat, idx) => {
          return (
            <div key={`chat-${idx}`} className={styles.chats_wrapper}>
              <BotBox
                toSave={chat.type.question ? true : false}
                text={chat.text}
                button={chat.button}
                handleOnClick={handleOnClick}
              />
              {/* 제일 최신 chat만 딜레이 걸어주기 */}
              {/* 답변 달아주기 */}
              {/* {answerIdx < 3 && <UserBox text={chat.button[answerIdx].text} />} */}
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </>
    </div>
  );
};

export default AiAnalyze;
