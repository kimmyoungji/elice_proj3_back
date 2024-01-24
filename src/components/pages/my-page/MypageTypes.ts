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

export type HealthInfoProps = {
  weight: number;
  height: number;
  goal: 1 | 2 | 3 | 4;
  targetCalories: number;
  recommendIntake: TargetNutrients;
  activityAmount: 1 | 2 | 3 | 4;
};

export type UserData = {
  email?: string;
  username?: string;
  password?: string;
  birthday?: string;
  gender?: 1 | 2 | 3;
  age: number;
  profileImage?: string | undefined;
  healthInfo: HealthInfoProps;
};

export interface MyPageEditProps {
  data: UserData;
  healthData: HealthInfoProps;
  goalMsg: string;
  activityMsg: string;
}
