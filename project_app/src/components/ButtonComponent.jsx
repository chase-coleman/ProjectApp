import Button from "@mui/material/Button";

export const ButtonComponent = ({styling, text, onClick}) => {
  return (
      <Button variant="outlined" onClick={onClick} className={`${styling} standard`} >{text}</Button>
  );
}