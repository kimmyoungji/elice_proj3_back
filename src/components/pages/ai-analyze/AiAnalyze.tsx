import styles from '@components/pages/ai-analyze/aianalyze.module.css';
import { useEffect, useRef, useState } from 'react';
import BotBox from './BotBox';
import UserBox from './UserBox';
import { questionData } from './QuestionData';
import { useNavigate } from 'react-router-dom';
import useCachingApi from '@hooks/useCachingApi';
import useApi from '@hooks/useApi';

type RecordList = {
  feedbackId: string;
  feedbackDate: string;
  questionType: string;
  question: string | undefined;
  feedback: string;
}[];
interface AskData {
  questionType: string;
  question: string;
}

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
  feedbackId: string;
}[];
const now = new Date();
const nowYear = now.getFullYear();
const nowMonth = now.getMonth();
const nowDate = now.getDate();

const AiAnalyze = () => {
  const [recordText, setRecordText] = useState(false);
  const todayDate = `${nowYear}-${nowMonth + 1 >= 10 ? nowMonth + 1 : `0${nowMonth + 1}`}-${nowDate >= 10 ? nowDate : `0${nowDate}`}`;
  // 최근 7일을 찾아야 함..
  // const startDate = `${thisYear}-${thisMonth}-${thisDay}`;

  const { trigger, result }: { trigger: any; result: any } = useCachingApi({
    path: `/feedback?startDate=2024-01-23&date=2024-01-30`,
    // path: `/feedback?startDate=${startDate}&date=${todayDate}`,
    gcTime: 10000,
  });

  const triggerData = async () => {
    await trigger({});
  };

  useEffect(() => {
    triggerData();
  }, []);

  useEffect(() => {
    if (result?.data) {
      setRecordText(true);
    }
  }, [result?.data]);

  const [chats, setChats] = useState([
    {
      date: todayDate,
      questionIdx: '1',
      context: questionData['1'],
      answer: '3',
      feedbackId: '',
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
        if (idx !== 3) {
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
                feedbackId: record.feedbackId,
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
                feedbackId: record.feedbackId,
              };
            }
          } else if (questionData[num].type.questionType === '질문선택') {
            return {
              date: record.feedbackDate,
              questionIdx: num,
              context: questionData[num],
              answer: '3',
              feedbackId: record.feedbackId,
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
              feedbackId: record.feedbackId,
            };
          }
        }
      });
      questionList.push(...(question as QuestionList));
    });
    return questionList;
  };

  useEffect(() => {
    if (recordText) {
      const questionList = formatRecord(result?.data.data);
      if (questionList[questionList.length - 1].date !== todayDate) {
        setChats((prev) => [
          ...questionList,
          {
            date: todayDate,
            questionIdx: '1',
            context: questionData['1'],
            answer: '3',
            feedbackId: '',
          },
        ]);
      } else {
        setChats((prev) => [...questionList]);
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
          feedbackId: '',
        },
      ]);
    }
  }, [recordText]);

  const navigate = useNavigate();

  const {
    trigger: askTrigger,
    result: askResult,
  }: { trigger: any; result: any } = useApi({
    method: 'post',
    path: `/feedback?date=${todayDate}`,
    shouldInitFetch: false,
  });

  const askGPT = async (askData: AskData) => {
    await askTrigger({
      applyResult: true,
      isShowBoundary: true,
      data: askData,
    });
  };
  const [gptAnswer, setGptAnswer] = useState('');
  const [gptId, setGptId] = useState('');

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
      const askData = questionData[questionIdx + '-' + String(idx + 1)]
        .type as AskData;
      askGPT(askData);
      // 결과 기다리기
      if (askResult) {
        console.log(askResult);
        setGptAnswer(askResult?.data.feedback);
        setGptId(askResult?.data.feedbackId);
      }
    }
  };

  useEffect(() => {
    if (answerIdx < 3) {
      if (questionIdx.length === 5 || questionIdx === '1-3') {
        const newContext = questionData[questionIdx];
        newContext.text = gptAnswer + newContext.text;
        console.log(gptId);
        setChats((prev) => [
          ...prev,
          {
            date: todayDate,
            questionIdx: questionIdx,
            context: newContext,
            answer: questionData[prevQuestionIdx].button[answerIdx].text,
            feedbackId: gptId,
          },
        ]);
      } else {
        setChats((prev) => [
          ...prev,
          {
            date: todayDate,
            questionIdx: questionIdx,
            context: questionData[questionIdx],
            answer: questionData[prevQuestionIdx].button[answerIdx].text,
            feedbackId: gptId,
          },
        ]);
      }
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
              feedbackId={chat.feedbackId}
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
