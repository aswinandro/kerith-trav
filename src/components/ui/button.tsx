export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    return (
      <button
        className={className}
        onClick={props.onClick}
        ref={ref}
        disabled={props.disabled}
        style={props.style}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";