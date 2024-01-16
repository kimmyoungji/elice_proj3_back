export type TopNavKeyType =
  | 'join'
  | 'onboarding'
  | 'onboardingmeal'
  | 'login'
  | 'home'
  | 'calendar'
  | 'recordymd'
  | 'recordymdmeal'
  | 'addphoto'
  | 'recordeidt'
  | 'addphotosearch'
  | 'auth';

export interface TopBarPropsType {
  home?: boolean;
  title?: string;
  back?: boolean;
  qIcon?: boolean;
  icon?: boolean;
}
