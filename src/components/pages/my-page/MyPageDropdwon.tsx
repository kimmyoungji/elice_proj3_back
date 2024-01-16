import toggle from './mypageedit.module.css';

interface MyPageDropdownProps {
  items: string[];
  selectedItem: string;
  onSelectItem: (item: string) => void;
  toggleDropdown: () => void;
  isDropdownVisible: boolean;
  style?: React.CSSProperties;
}

const MyPageDropdown = ({
  items,
  selectedItem,
  onSelectItem,
  toggleDropdown,
  isDropdownVisible,
  style,
}: MyPageDropdownProps) => {
  return (
    <div style={style}>
      <div onClick={toggleDropdown}>{selectedItem} ▼</div>
      {isDropdownVisible && (
        <div className={toggle.dropdown}>
          {items.map((item: string) => (
            <div
              key={item}
              onClick={() => onSelectItem(item)}
              className={selectedItem === item ? toggle.active : ''}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPageDropdown;
