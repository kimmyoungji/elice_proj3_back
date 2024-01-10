import { ComponentPropsWithRef, ReactElement } from "react";

export type ButtonVariant =
  | "default"
  | "active"
  | "default-active"
  | "validated"
  | "error";

export type CommonSizeType =
  | "large"
  | "big"
  | "medium"
  | "med-small"
  | "small"
  | "ssmall"
  | "tiny";

export type CommonFontSizeType =
  | "b-super"
  | "b-large"
  | "b-big"
  | "b-medium"
  | "b-regular"
  | "b-small"
  | "b-tiny"
  | "r-super"
  | "r-large"
  | "r-big"
  | "r-medium"
  | "r-regular"
  | "r-small"
  | "r-tiny"
  | "s-large"
  | "s-big"
  | "s-medium"
  | "s-tiny";

export interface ButtonPropsType extends ComponentPropsWithRef<"button"> {
  children?: string | ReactElement | number;
  customClassName?: string;
  onClickBtn?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
  href?: string;
  variant?: ButtonVariant;
  size?: CommonSizeType;
  disabled?: boolean;
  active?: boolean;
  fontSize?: CommonFontSizeType;
}

export interface getClassNameType {
  variant?: ButtonVariant;
  disabled?: boolean;
  active?: boolean;
  size?: CommonSizeType;
  prefix?: string;
}
