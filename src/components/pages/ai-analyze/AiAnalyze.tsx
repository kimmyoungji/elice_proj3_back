import styles from '@components/pages/ai-analyze/aianalyze.module.css';
import { useEffect, useRef, useState } from 'react';
import BotBox from './BotBox';
import UserBox from './UserBox';
import { questionData } from './QuestionData';
import { useNavigate } from 'react-router-dom';
import getDates from '@utils/getDates';

const DUMMYrecordData = [
  {
    date: '2024-01-01',
    questionIdx: '1',
    question: questionData['1'],
    answer: '3',
  },
  {
    date: '2024-01-01',
    questionIdx: '1-3',
    question: questionData['1-3'],
    answer: '나에게 맞는 목표를 추천해줄래?',
  },
  {
    date: '2024-01-05',
    questionIdx: '1',
    question: questionData['1'],
    answer: '3',
  },
  {
    date: '2024-01-05',
    questionIdx: '1-1',
    question: questionData['1-1'],
    answer: '오늘 식단 추천이 필요해!',
  },
  {
    date: '2024-01-05',
    questionIdx: '1-1-2',
    question: questionData['1-1-2'],
    answer: '내 목표에 맞게 추천 받고 싶어!',
  },
  {
    date: '2024-01-05',
    questionIdx: '1',
    question: questionData['1'],
    answer: '다른 질문도 할래!',
  },
  {
    date: '2024-01-05',
    questionIdx: '1-2',
    question: questionData['1-2'],
    answer: '잘 하고 있는지, 식단 평가가 필요해!',
  },
  {
    date: '2024-01-12',
    questionIdx: '1',
    question: questionData['1'],
    answer: '3',
  },
  {
    date: '2024-01-12',
    questionIdx: '1-2',
    question: questionData['1-2'],
    answer: '잘 하고 있는지, 식단 평가가 필요해!',
  },
  {
    date: '2024-01-12',
    questionIdx: '1-2-1',
    question: questionData['1-2-1'],
    answer: '오늘 하루 내 식단은 어땠어?',
  },
  // {
  //   date: '2024-01-25',
  //   questionIdx: '1',
  //   question: questionData['1'],
  //   answer: '3',
  // },
  // {
  //   date: '2024-01-25',
  //   questionIdx: '1-2',
  //   question: questionData['1-2'],
  //   answer: '잘 하고 있는지, 식단 평가가 필요해!',
  // },
  // {
  //   date: '2024-01-25',
  //   questionIdx: '1-2-1',
  //   question: questionData['1-2-1'],
  //   answer: '오늘 하루 내 식단은 어땠어?',
  // },
];

const AiAnalyze = () => {
  const [recordText, setRecordText] = useState(false);
  // 저장된 일주일치 기록이 있는지 확인하고 setRecordText(true) 혹은 chats 초기값 업데이트

  const { thisYear, thisMonth, thisDay } = getDates();
  const todayDate = `${thisYear}-${thisMonth}-${thisDay}`;

  const [chats, setChats] = useState([
    {
      date: todayDate,
      questionIdx: '1',
      question: questionData['1'],
      answer: '3',
    },
  ]);
  const [chatDate, setChatDate] = useState(todayDate);

  const [answerIdx, setAnswerIdx] = useState(3);
  const [questionIdx, setQuestionIdx] = useState('1');
  const [prevQuestionIdx, setPrevQuestionIdx] = useState('1');

  useEffect(() => {
    if (recordText) {
      if (DUMMYrecordData[DUMMYrecordData.length - 1].date !== todayDate) {
        setChats((prev) => [
          ...prev,
          ...DUMMYrecordData,
          {
            date: todayDate,
            questionIdx: '1',
            question: questionData['1'],
            answer: '3',
          },
        ]);
      } else {
        setChats((prev) => [...prev, ...DUMMYrecordData]);
        setQuestionIdx(DUMMYrecordData[DUMMYrecordData.length - 1].questionIdx);
      }
      setChatDate(DUMMYrecordData[1].date);
    } else {
      setChats((prev) => [
        ...prev,
        {
          date: todayDate,
          questionIdx: '1',
          question: questionData['1'],
          answer: '3',
        },
      ]);
    }
  }, []);

  const navigate = useNavigate();

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
      setChats((prev) => [
        ...prev,
        {
          date: todayDate,
          questionIdx: questionIdx,
          question: questionData[questionIdx],
          answer: questionData[prevQuestionIdx].button[answerIdx].text,
        },
      ]);
    }
  }, [questionIdx]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    const timeoutId = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 900);
    return () => clearTimeout(timeoutId);
  }, [chats]);

  return (
    <div className={styles.main_wrapper}>
      <>
        {chats.slice(1).map((chat, idx) => (
          <div key={`chat-${idx}`} className={styles.chats_wrapper}>
            {(idx === 0 || chat.date !== chats[idx].date) && (
              <div className={`${styles.date} s-regular`}>{chat.date}</div>
            )}
            {idx !== 0 && chat.answer !== '3' && <UserBox text={chat.answer} />}
            <BotBox
              toSave={chat.question.type.question ? true : false}
              text={chat.question.text}
              button={chat.question.button}
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
