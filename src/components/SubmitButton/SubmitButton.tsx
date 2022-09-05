import {Button} from "@mui/material";

import React from "react";


const SubmitButton = (props:{children: string, className: string}) => {
  const {children, className} = props;

  return (
      <Button type="submit" variant="contained" className={className}>{children}</Button>
  )
};

export default SubmitButton;