import Button from "@mui/material/Button";
import { forwardRef } from "react";

export const ButtonComponent = forwardRef(function ButtonComponent(
  { styling = "", text, onClick, className = "", ...props },
  ref
) {
  return (
    <Button
      ref={ref}
      variant="outlined"
      onClick={onClick}
      // IMPORTANT: merge className from Tooltip with your own classes
      className={`standard ${styling} ${className}`.trim()}
      {...props}
    >
      {text}
    </Button>
  );
});