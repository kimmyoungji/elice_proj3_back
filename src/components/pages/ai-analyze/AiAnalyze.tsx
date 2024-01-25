import styles from '@components/pages/ai-analyze/aianalyze.module.css';
import { useEffect, useRef, useState } from 'react';
import BotBox from './BotBox';
import UserBox from './UserBox';
import { questionData } from './QuestionData';
import { useNavigate } from 'react-router-dom';
import getDates from '@utils/getDates';

const AiAnalyze = () => {
  const [recordText, setRecordText] = useState([]);
  // API 호출해서 저장된 일주일치 기록이 있는지 확인하고 setRecordText(true) 혹은 chats 초기값 업데이트

  // 현재 대화내용 저장
  const [chats, setChats] = useState([questionData['1']]);
  const [answer, setAnswer] = useState(['3']);

  const [answerIdx, setAnswerIdx] = useState(3);
  const [questionIdx, setQuestionIdx] = useState('1');
  const [prevQuestionIdx, setPrevQuestionIdx] = useState('1');

  const navigate = useNavigate();
  const { thisYear, thisMonth, thisDay } = getDates();
  const todayDate = `${thisYear}-${thisMonth}-${thisDay}`;

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    setAnswerIdx(idx);
    setQuestionIdx((prev) => {
      setPrevQuestionIdx(prev);
      return prev.length === 5 || prev === '1-3'
        ? '1'
        : prev + '-' + String(idx + 1);
    });
    if (questionData[questionIdx].button[idx].type === 'follow-up') {
    } else if (questionData[questionIdx].button[idx].type === 'navigate') {
      // chats 저장
      if (questionData[questionIdx].type.questionType === '식단추천') {
        navigate(`/record/${todayDate}`);
      } else if (questionData[questionIdx].type.questionType === '목표추천') {
        navigate('/my-page');
      } else {
        navigate('/');
      }
    } else if (questionData[questionIdx].button[idx].type === 'ai') {
      // questionData[questionIdx].type을 body에 담아서 api 호출
      console.log('api 호출');
      // 결과 기다리기
    }
  };

  useEffect(() => {
    if (answerIdx < 3) {
      setAnswer((pre) => [
        ...pre,
        questionData[prevQuestionIdx].button[answerIdx].text,
      ]);
    }
    setChats((prev) => [...prev, questionData[questionIdx]]);
  }, [questionIdx]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    const timeoutId = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 805);
    return () => clearTimeout(timeoutId);
  }, [chats]);

  return (
    <div className={styles.main_wrapper}>
      <>
        {chats.slice(1).map((chat, idx) => (
          <div key={`chat-${idx}`} className={styles.chats_wrapper}>
            {idx !== 0 && <UserBox text={answer[idx]} />}
            <BotBox
              toSave={chat.type.question ? true : false}
              text={chat.text}
              button={chat.button}
              handleOnClick={handleOnClick}
            />
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </>
    </div>
  );
};

export default AiAnalyze;
