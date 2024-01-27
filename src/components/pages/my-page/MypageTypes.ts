export interface MyPageDropdownProps {
  items: string[];
  selectedItem: string;
  onSelectItem: (item: string) => void;
  toggleDropdown: () => void;
  isDropdownVisible: boolean;
  style?: React.CSSProperties;
}

interface TargetNutrients {
  carbohydrates: number;
  proteins: number;
  fats: number;
  dietaryFiber: number;
  [key: string]: number;
}

export type UserData = {
  username?: string;
  gender?: 1 | 2 | 3;
  age: number;
  profileImage?: string | undefined;
  weight: number;
  height: number;
  diet_goal: 1 | 2 | 3 | 4;
  targetCalories: number;
  recommendIntake: TargetNutrients;
  activityAmount: 1 | 2 | 3 | 4;
};

export interface MyPageEditProps {
  data: UserData;
  goalMsg: string;
  activityMsg: string;
}
