import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import classes from "./dropdown.module.css";

type DropdownProps = {
  children: ReactNode | ReactNode[];
  onChange?: (val: string) => void;
};

export type higlightedIndexType = number | string;

type DropdownContextType = {
  isOpen: boolean;
  handleIsOpen: (val: React.SetStateAction<boolean>) => void;
  highlightedindex: higlightedIndexType;
  handleHighlightedIndex: (
    val: React.SetStateAction<higlightedIndexType>
  ) => void;
  handleBtnText: (val: React.SetStateAction<string>) => void;
};
const DropdownContext = createContext<DropdownContextType | null>(null);
export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Error in creating the context");
  }
  return context;
};

export const Dropdown = ({ children, onChange }: DropdownProps) => {
  const [isOpen, setIsopen] = useState(false);
  const handleIsOpen = useCallback(() => setIsopen((prev) => !prev), []);
  const [highlightedindex, setHighlightedIndex] = useState(0);
  const handleHighlightedIndex = useCallback(
    (val: any) => setHighlightedIndex(val),
    []
  );
  const [btnText, setBtnText] = useState("");
  const handleBtnText = useCallback((val: any) => setBtnText(val), []);

  const value = useMemo(
    () => ({
      isOpen,
      handleIsOpen,
      highlightedindex,
      handleHighlightedIndex,
      handleBtnText,
    }),
    [
      isOpen,
      handleIsOpen,
      highlightedindex,
      handleHighlightedIndex,
      handleBtnText,
    ]
  );

  useEffect(() => {
    onChange && onChange(btnText);
  }, [btnText]);

  return (
    <DropdownContext.Provider value={value}>
      <div className={classes.container}>
        <span
          className={classes.value}
          onClick={() => {
            setIsopen((prev) => {
              console.log("handler clicked!");
              return !prev;
            });
          }}
        >
          {btnText}
        </span>
        <div
          onClick={() => {
            setIsopen((prev) => {
              console.log("handler clicked!");
              return !prev;
            });
          }}
          className={classes.caret}
        />
        {children}
      </div>
    </DropdownContext.Provider>
  );
};
