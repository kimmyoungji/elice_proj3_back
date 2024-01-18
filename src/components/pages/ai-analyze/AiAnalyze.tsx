import styles from '@components/pages/ai-analyze/aianalyze.module.css';
import { useEffect, useRef, useState } from 'react';
import BotBox from './BotBox';
import UserBox from './UserBox';
import { questionData } from './QuestionData';
import { useNavigate } from 'react-router-dom';

const AiAnalyze = () => {
  // const [recordText, setRecordText] = useState(false);
  // 저장된 일주일치 기록이 있는지 API 호출하고 setRecordText(true)

  // 현재 대화내용 저장
  const [chats, setChats] = useState<
    {
      type: { questionType: string; question: string | undefined };
      text: string;
      button: { type: string; text: string }[];
    }[]
  >([questionData['1']]);

  const [answerIdx, setAnswerIdx] = useState(3);
  const [questionIdx, setQuestionIdx] = useState('1');

  const navigate = useNavigate();

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    setAnswerIdx(idx);
    setQuestionIdx((prev) => {
      if (prev.length === 5 || prev === '1-3') {
        return '1';
      } else {
        return prev + '-' + String(idx + 1);
      }
    });
    // if (questionData[questionIdx].button[idx].type === 'follow-up') {
    // } else if (questionData[questionIdx].button[idx].type === 'navigate') {
    //   navigate('/');
    // } else if (questionData[questionIdx].button[idx].type === 'ai') {
    //   // questionData[questionIdx].type을 body에 담아서 api 호출
    //   console.log('api 호출');
    //   // 결과 기다리기
    // }
    setChats((prev) => [...prev, questionData[questionIdx]]);
    // 대화 내용 저장 api 호출
  };

  useEffect(() => {
    console.log(chats);
    console.log(questionIdx);
    console.log(answerIdx);
  }, [chats]);

  /* delay 걸기 */
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    const delay = 1500;
    const timeoutId = setTimeout(() => {
      setDelayed(true);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, []);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <div className={styles.main_wrapper}>
      <>
        {chats.map((chat, idx) => {
          return (
            <div key={`chat-${idx}`} className={styles.chats_wrapper}>
              {answerIdx}
              {answerIdx < 3 && <UserBox text={chat.button[answerIdx].text} />}
              {delayed && (
                <BotBox
                  toSave={true}
                  // questionIdx 바뀔 때마다 내용도 같이 바뀜..
                  text={questionData[questionIdx].text}
                  button={questionData[questionIdx].button}
                  handleOnClick={handleOnClick}
                />
              )}
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </>
    </div>
  );
};

export default AiAnalyze;
