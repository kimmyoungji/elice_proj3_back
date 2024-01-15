import styles from '@components/layout/layout.module.css';

type propsType = {
  home: boolean;
  title: string;
  back: boolean;
  qIcon: boolean;
  icon: boolean;
};

const TopBar = ({ home, title, back, qIcon, icon }: propsType) => {
  return (
    <div className={styles.top}>
      {back && (
        <div className={styles.back}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='currentColor'
            className='w-6 h-6'
            width='19'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M15.75 19.5 8.25 12l7.5-7.5'
            />
          </svg>
        </div>
      )}
      <div className={styles.title_wrapper}>
        {home ? (
          <p className={styles.name}>{title}</p>
        ) : (
          <p className={styles.title}>{title}</p>
        )}
        {qIcon && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='var(--main-skyblue)'
            className='w-6 h-6'
            width='16'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
            />
          </svg>
        )}
      </div>
      {icon && (
        <div className={styles.icon_wrapper}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='currentColor'
            className='w-6 h-6'
            width='22'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default TopBar;
