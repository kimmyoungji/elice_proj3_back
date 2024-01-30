import styles from '@components/pages/ai-analyze/aianalyze.module.css';
import { useEffect, useRef, useState } from 'react';
import BotBox from './BotBox';
import UserBox from './UserBox';
import { questionData } from './QuestionData';
import { useNavigate } from 'react-router-dom';
import getDates from '@utils/getDates';
import useCachingApi from '@hooks/useCachingApi';

const DUMMYrecordData = [
  {
    feedbackId: 'sdnl23r',
    feedbackDate: '2024-01-23',
    questionType: '식단평가',
    question: '일주일',
    feedback: '어쩌구저쩌구',
  },
  {
    feedbackId: 'fbe542d',
    feedbackDate: '2024-01-23',
    questionType: '식단추천',
    question: '맛있는추천',
    feedback: '어쩌구저쩌구',
  },
  {
    feedbackId: 'sdnl23r',
    feedbackDate: '2024-01-24',
    questionType: '식단평가',
    question: '하루',
    feedback: '어쩌구저쩌구',
  },
  {
    feedbackId: 'fbe542d',
    feedbackDate: '2024-01-26',
    questionType: '목표추천',
    question: '목표추천',
    feedback: '어쩌구저쩌구',
  },
  {
    feedbackId: 'sdnl23r',
    feedbackDate: '2024-01-26',
    questionType: '식단평가',
    question: '하루',
    feedback: '어쩌구저쩌구',
  },
  {
    feedbackId: 'fbe542d',
    feedbackDate: '2024-01-30',
    questionType: '식단추천',
    question: '맛있는추천',
    feedback: '어쩌구저쩌구',
  },
];

type RecordList = {
  feedbackId: string;
  feedbackDate: string;
  questionType: string;
  question: string | undefined;
  feedback: string;
}[];

interface Context {
  type: {
    questionType: string;
    question: string | undefined;
  };
  text: string;
  button: { type: string; text: string }[];
}
type QuestionList = {
  date: string;
  questionIdx: string;
  context: Context;
  answer: string;
}[];

const AiAnalyze = () => {
  const [recordText, setRecordText] = useState(false);
  const { thisYear, thisMonth, thisDay } = getDates();
  const todayDate = `${thisYear}-${thisMonth}-${thisDay}`;
  // 최근 7일을 찾아야 함..
  const startDate = `${thisYear}-${thisMonth}-${thisDay}`;

  const { trigger, result }: { trigger: any; result: any } = useCachingApi({
    path: `/feedback?startDate=2024-01-19?date=2024-01-25`,
    // path: `/feedback?startDate=${startDate}?date=${todayDate}`,
    gcTime: 10000,
  });

  const triggerData = async () => {
    await trigger({});
  };

  useEffect(() => {
    triggerData();
    if (result?.data) {
      setRecordText(true);
    }
  }, []);

  const [chats, setChats] = useState([
    {
      date: todayDate,
      questionIdx: '1',
      context: questionData['1'],
      answer: '3',
    },
  ]);

  const [answerIdx, setAnswerIdx] = useState(3);
  const [questionIdx, setQuestionIdx] = useState('1');
  const [prevQuestionIdx, setPrevQuestionIdx] = useState('1');

  const formatRecord = (recordList: RecordList) => {
    const questionList: QuestionList = [];
    recordList.forEach((record, idx) => {
      const recordQuestionIdx = Object.keys(questionData).find(
        (key) =>
          questionData[key].type.questionType === record.questionType &&
          questionData[key].type.question === record.question
      );
      const splitIdx = recordQuestionIdx?.split('-');
      const questionIdxList = splitIdx?.map(
        (num, idx) =>
          (splitIdx[idx - 2] ? splitIdx[idx - 2] + '-' : '') +
          (splitIdx[idx - 1] ? splitIdx[idx - 1] + '-' : '') +
          num
      );
      const question = questionIdxList?.map((num, idx) => {
        if (
          questionList.length === 0 ||
          record.feedbackDate === questionList[questionList.length - 1].date
        ) {
          if (questionData[num].type.questionType === '질문선택') {
            return {
              date: record.feedbackDate,
              questionIdx: num,
              context: questionData[num],
              answer: '다른 질문도 할래!',
            };
          } else {
            return {
              date: record.feedbackDate,
              questionIdx: num,
              context: questionData[num],
              answer: splitIdx
                ? questionData[questionIdxList[idx - 1]]?.button[
                    Number(splitIdx[idx]) - 1
                  ].text
                : '3',
            };
          }
        } else if (questionData[num].type.questionType === '질문선택') {
          return {
            date: record.feedbackDate,
            questionIdx: num,
            context: questionData[num],
            answer: '3',
          };
        } else {
          return {
            date: record.feedbackDate,
            questionIdx: num,
            context: questionData[num],
            answer: splitIdx
              ? questionData[questionIdxList[idx - 1]]?.button[
                  Number(splitIdx[idx]) - 1
                ].text
              : '3',
          };
        }
      });
      questionList.push(...question);
    });

    return questionList;
  };

  useEffect(() => {
    const questionList = formatRecord(DUMMYrecordData);
    if (recordText) {
      if (questionList[questionList.length - 1].date !== todayDate) {
        setChats((prev) => [
          ...prev,
          ...questionList,
          {
            date: todayDate,
            questionIdx: '1',
            context: questionData['1'],
            answer: '3',
          },
        ]);
      } else {
        setChats((prev) => [...prev, ...questionList]);
        setQuestionIdx(questionList[questionList.length - 1].questionIdx);
      }
    } else {
      setChats((prev) => [
        ...prev,
        {
          date: todayDate,
          questionIdx: '1',
          context: questionData['1'],
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
      if (questionData[questionIdx].type.questionType === '식단추천') {
        navigate(`/record/${todayDate}`);
      } else if (questionData[questionIdx].type.questionType === '목표추천') {
        navigate('/my-page');
      } else {
        navigate('/');
      }
    } else if (questionData[questionIdx].button[idx].type === 'ai') {
      console.log(
        questionData[questionIdx + '-' + String(idx + 1)].type,
        ' api 호출'
      );
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
          context: questionData[questionIdx],
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
              toSave={chat.context.type.question ? true : false}
              text={chat.context.text}
              button={chat.context.button}
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
