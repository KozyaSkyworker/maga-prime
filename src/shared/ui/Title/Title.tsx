import { DOMAttributes, ReactNode } from "react";
import { TTitleVariant } from "./type";

interface Props extends DOMAttributes<HTMLHeadingElement> {
  variant?: TTitleVariant;
  children?: ReactNode;
  className?: string;
}

export const Title = ({
  variant,
  children,
  className = "",
  ...rest
}: Props) => {
  if (variant === "h1") {
    return (
      <h1 className={className} {...rest}>
        {children}
      </h1>
    );
  }

  if (variant === "h2") {
    return (
      <h2 className={className} {...rest}>
        {children}
      </h2>
    );
  }
};
