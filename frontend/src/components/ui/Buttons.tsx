interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: any;
  endIcon?: any;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-500",
};
const sizeStyles = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};
const defaultStyles = "rounded-md flex justify-center items-center font-light";

export const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick}
      className={`${defaultStyles} ${variantStyles[props.variant]} ${
        sizeStyles[props.size] 
      }`}
    >
      {props.startIcon?<div className="pr-2"> {props.startIcon}</div>:null} {props.text} {props.endIcon}
    </button>
  );
};
