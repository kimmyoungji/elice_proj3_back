import { TopBarPropsType, TopNavKeyType } from 'typings/propTypes';

export const existDate = (val: string) => {
  const dateRegExp = /(\d{4}-\d{2}-\d{2})/;
  const dateInUrl = val.match(dateRegExp);
  console.log(dateInUrl);
  return {
    existed: !!(dateInUrl && dateInUrl[1]),
    date: dateInUrl ? dateInUrl[1] : null,
  };
};

//url[2]의 숫자를 meal로 변경
export const getKeyFromUrl = (url: string): TopNavKeyType | string => {
  //url에 date가 존재하는 경우 ymd로 변경
  const urlArr = url.split('/');
  const returnKey: TopNavKeyType | string = urlArr
    .map((url, idx) => {
      const deleteHypen = url.replace(/-/g, '');
      console.log(deleteHypen);
      console.log(url);

      const dateExisted = existDate(url).existed;

      if (dateExisted) {
        console.log('date exited!');
        return 'ymd';
      }
      if (idx === 2) {
        return 'meal';
      }
      console.log(url);
      return deleteHypen;
    })
    .join('');
  console.log(returnKey);
  return returnKey;
};

export const defaultNavProps: TopBarPropsType = {
  home: false,
  title: undefined,
  back: false,
  qIcon: false,
  icon: false,
};

interface GetNavPropsType {
  [key: string]: {};
}

export const getNavProps: GetNavPropsType = {
  join: { title: '회원정보 입력', back: true },
  joinonboarding: { back: true },
  login: { title: '로그인' },
  home: { home: true, title: '구그램' },
  calendar: { title: '식단달력' },
  recordymd: { title: '하루식단' },
  recordymdmeal: {
    title: 'AI 식단 기록',
    back: true,
    qIcon: true,
  },
  addphoto: { title: 'AI 식단 카메라', back: true, qIcon: true },
  recordedit: { title: 'AI 식단 확인', back: true },
  addphotosearch: { title: '식단 검색', back: true },
  aianalyze: { title: 'AI 분석', icon: true },
  aldrawer: { back: true, title: 'AI 분석 서랍' },
  aldrawerymd: { back: true, title: 'AI 분석 서랍' }, //날짜 넣어줘야 함
  share: { title: '구그램' },
  mypage: { title: '설정' },
  mypageedit: { back: true, title: '정보수정' },
};
