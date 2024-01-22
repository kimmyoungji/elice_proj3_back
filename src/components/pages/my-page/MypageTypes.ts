export interface MyPageDropdownProps {
  items: string[];
  selectedItem: string;
  onSelectItem: (item: string) => void;
  toggleDropdown: () => void;
  isDropdownVisible: boolean;
  style?: React.CSSProperties;
}
