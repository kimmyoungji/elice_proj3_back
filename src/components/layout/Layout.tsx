import { useNavigate } from 'react-router-dom';
import styles from '@components/layout/layout.module.css';

interface Menu {
  item: string;
  text: string;
}

const Layout = () => {
  const navigate = useNavigate();

  const menus = [
    { item: 'ai-analyze', text: 'AI분석' },
    { item: 'calendar', text: '달력' },
    { item: 'home', text: '홈' },
    { item: 'record', text: '기록' },
    { item: 'my-page', text: '설정' },
  ];

  return (
    <div className={styles.navbar}>
      {menus.map((menu: Menu, index) => (
        <div key={index} className={styles.item} onClick={() => navigate(`/${menu.item}`)}>
          <img className={styles.icon} src={`icons/${menu.item}.png`} alt={`${menu.item}`} />
          <div className={styles.text}>{menu.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Layout;
