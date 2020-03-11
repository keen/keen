/// <reference types="react" />
declare type LeveLRange = 1 | 2 | 3 | 4 | 5 | 6;
declare type Props = {
  children: string;
  level?: LeveLRange;
};
declare const Title: ({ children, level }: Props) => JSX.Element;
export default Title;
