export const avatarStyles = {
    width: 32,
    height: 32,
    border: "1px solid #458FAC",
    borderRadius: "50%" 
   };

export const buttonStyles = { 
   backgroundColor: "inherit",
   border: "none",
   cursor: "pointer",
   fontFamily: "Roboto",
   fontWeight: 500,
   color: "#161C1E",
   fontSize: "14px",
   lineHeight: "18px",
   textTransform: "capitalize",
   };
export const buttonStylesColored = { 
    ...buttonStyles,
    color: "#458FAC"
    };

export const marketplaceMenuStyles = {
   overflow: 'visible',
   filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
   mt: 1.5,
   '& .MuiAvatar-root': {
     width: 32,
     height: 32,
     ml: -0.5,
     mr: 1,
   },
   '&:before': {
     content: '""',
     display: 'block',
     position: 'absolute',
     top: 0,
     right: 14,
     width: 10,
     height: 10,
     bgcolor: 'background.paper',
     transform: 'translateY(-50%) rotate(45deg)',
     zIndex: 0,
   },
 };

export const avatarMenuStyles = {
   overflow: 'visible',
   filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
   mt: 1.5,
   '& .MuiAvatar-root': {
     width: 32,
     height: 32,
     ml: -0.5,
     mr: 1,
   },
   '&:before': {
     content: '""',
     display: 'block',
     position: 'absolute',
     top: 0,
     right: 14,
     width: 10,
     height: 10,
     bgcolor: 'background.paper',
     transform: 'translateY(-50%) rotate(45deg)',
     zIndex: 0,
   },
 };

 export const burgerButtonStyles = {
    width: "20px",
    height: "20px"
 }