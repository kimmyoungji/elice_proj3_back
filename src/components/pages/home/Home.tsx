import TopBar from '@components/layout/TopBar';
import { useEffect, useRef, useState } from 'react';
import Today from './Today';
import Week from './Week';

const Home = () => {
  return (
    <div>
      <TopBar
        home={true}
        title='구그램'
        back={false}
        qIcon={false}
        icon={false}
      />
      <Week />
      <Today />
    </div>
  );
};

export default Home;
