import styles from '@components/pages/ai-analyze/drawer.module.css';
import useCachingApi from '@hooks/useCachingApi';
import { useEffect, useState } from 'react';
import DrawerCard from './DrawerCard';

interface DrawerList {
  feedbackId: string;
  feedbackDate: string;
  questionType: string;
  question: string;
  feedback: string;
}

const AiDrawer = () => {
  const [drawerList, setDrawerList] = useState<DrawerList[]>([]);

  const { trigger, result }: { trigger: any; result: any } = useCachingApi({
    path: `/feedback?page=1`,
    gcTime: 10000,
  });

  const triggerData = async () => {
    await trigger({});
  };

  useEffect(() => {
    triggerData();
  }, []);

  useEffect(() => {
    if (result?.data.data) {
      setDrawerList(result?.data.data);
    }
  }, [result?.data]);

  return (
    <div className={styles.drawer_wrapper}>
      {drawerList?.map((drawer, idx) => (
        <DrawerCard
          key={`drawercard-${idx}`}
          id={drawer.feedbackId}
          date={drawer.feedbackDate}
          type={drawer.questionType}
          tag={drawer.question}
          text={drawer.feedback}
        />
      ))}
    </div>
  );
};

export default AiDrawer;
