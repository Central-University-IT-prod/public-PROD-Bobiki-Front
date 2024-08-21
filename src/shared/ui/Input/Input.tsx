import { UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import styles from "./Input.module.scss";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  labelText?: string;
  errorText?: string;
}
export const Input = ({
  labelText,
  errorText,
  register,
  ...props
}: InputProps) => {
  // const containerRef = useRef<HTMLDivElement>(null);
  // const clickHandler = () => {
  //   const currFocusState = containerRef.current?.dataset.focused;
  //   if (!currFocusState) {
  //     containerRef.current?.focus();
  //     containerRef.current!.dataset["focused"] = "true";
  //   }
  // };
  // return (
  //   <div
  //     data-focused={false}
  //     data-error={hasError}
  //     onClick={clickHandler}
  //     ref={containerRef}
  //     className={styles.container}
  //   >
  //     <div className={styles.inputContainer}>
  //       <label htmlFor={props.id} className={styles.label}>
  //         {labelText}
  //       </label>
  //       <input {...props} className={styles.input} />
  //     </div>
  //     {hasError && <p className={styles.errorMessage}>{props.errorText}</p>}
  //   </div>
  // );
  const errorId = `${props.id}-error`;
  return (
    <div>
      <input
        aria-describedby={errorId}
        {...props}
        className={styles.testInput}
        {...register}
      />
      <ErrorMessage id={errorId}>{errorText}</ErrorMessage>
    </div>
  );
};
