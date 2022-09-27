import {Button} from "@mui/material";

const SubmitButton = (props:{children: string, className: string}) => {
  const {children, className} = props;

  return (
      <Button type="submit"
              variant="contained"
              className={className}
              disableElevation
              disableRipple>
        {children}
      </Button>
  );
};

export default SubmitButton;