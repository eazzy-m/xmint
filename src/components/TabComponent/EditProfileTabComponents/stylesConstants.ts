import {fontFive, smallText, mediumText, colors} from "../../../constants/inlineConstants";
const {darkColor, borderColor, whiteColor, mainPageBackgroundColor, buttonColor, disabledButtonColor} = colors;

export const ButtonStyle = {
        ...fontFive,
        ...smallText,
        textTransform: 'none',
        width: "108px",
        height: "36px",
        background: whiteColor,
        border: `1px solid ${borderColor}`,
        borderrRadius: "6px",
        color: darkColor,
    };

export const DisabledInputStyle = {
        width: "100%",
        background: mainPageBackgroundColor,
        borderRadius: "6px",
        margin: window.innerWidth > 900 ? "24px 0 25px" : "0",
        "&::placeholder": {
            backgroundColor: whiteColor
        }
    };

export const SmalldInputStyle = {
        width: window.innerWidth > 900 ? "323px" : "100%",
        background: whiteColor,
        borderRadius: "6px",
        "&:first-of-type": {
            marginRight: "24px"
        }
    };

export const BigInputStyle = {
        width: "100%",
        background: whiteColor,
        borderRadius: "6px",
        marginBottom: "32px"
    };

export const ResetButtonStyle = {
        marginRight: "12px",
        padding: "4px 24px",
        width: "98px",
        height: "48px",
        background: "#FFF",
        border: "1px solid #D0D2D2",
        borderRadius: "6px",
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
        color: "#161C1E",
        textTransform: 'none',
    };

export const SubmitButtonStyle = {
        ...fontFive,
        ...mediumText,
        padding: "14px 24px",
        width: "83px",
        height: "48px",
        backgroundColor: buttonColor,
        borderRadius: "6px",
        color: `${whiteColor} !important`,
        textTransform: 'none',
    };

export const DisabledSubmitButtonStyle = {
    ...SubmitButtonStyle,
    backgroundColor: `${disabledButtonColor} !important`,
}

export const AvatarStyle = { width: 80, height: 80};