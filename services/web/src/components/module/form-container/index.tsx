import React from "react";

export type FormContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const baseClassName = "max-w-lg w-full mx-auto";
const FormContainer: React.FC<FormContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={className ? `${baseClassName} ${className}` : baseClassName}
    >
      {children}
    </div>
  );
};

export default FormContainer;
