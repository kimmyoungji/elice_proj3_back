import styles from './loadingbar.module.css';

type pathProps = {
  path: string;
};

export const LoadingBar: React.FC<pathProps> = ({ path }) => {
  let message = 'LOADING';
  const loadingMsg = () => {
    if (path && path === '/ai-analyze') {
      console.log('나오냐');
      message = '뀨봇 답변 중';
    } else if (path && path.startsWith('/add-photo')) {
      message = '뀨봇 사진 분석 중';
    }
  };

  const loadingClass = (): string => {
    if (path && path === '/ai-analyze') {
      return styles.aiAnalyzeLoading;
    } else if (path && path.startsWith('/add-photo')) {
      return styles.addPhotoLoading;
    } else {
      return styles.defaultLoading;
    }
  };

  return (
    <div className={`${styles.wrapper} ${loadingClass()}`}>
      <div className={styles.loaderOuter}>
        <div className={styles.loaderInner}>
          <i className='fas fa-utensils' aria-hidden='true' />
          <i
            className='fas fa-robot'
            style={{ color: '#74C0FC' }}
            aria-hidden='true'
          />
          <i className='fas fa-cookie-bite' aria-hidden='true' />
        </div>
      </div>
      <h1 className={styles.title}>
        <span className={styles.titleSpan}>{message}</span>
      </h1>
    </div>
  );
};
