import LoadingButton from "@mui/lab/LoadingButton";

export const ButtonComponent = ({styling, text, onClick}) => {
  return (
      <LoadingButton variant="outlined" onClick={onClick} className={styling}>{text}</LoadingButton>
  );
}