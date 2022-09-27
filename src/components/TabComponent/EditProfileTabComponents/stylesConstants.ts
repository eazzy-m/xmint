
export const ButtonStyle = {
        textTransform: 'none',
        width: "108px",
        height: "36px",
        background: "#FFF",
        border: "1px solid #D0D2D2",
        borderrRadius: "6px",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        color: "#161C1E",
    };

export const DisabledInputStyle = {
        width: "100%",
        background: "#F2F2F3",
        borderRadius: "6px",
        margin: window.innerWidth > 900 ? "24px 0 25px" : "0",
        "&::placeholder": {
            backgroundColor: "#FFF"
        }
    };

export const SmalldInputStyle = {
        width: window.innerWidth > 900 ? "323px" : "100%",
        background: "#FFF",
        borderRadius: "6px",
        "&:first-of-type": {
            marginRight: "24px"
        }
    };

export const BigInputStyle = {
        width: "100%",
        background: "#FFF",
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
        padding: "14px 24px",
        width: "83px",
        height: "48px",
        backgroundColor: "#458FAC",
        borderRadius: "6px",
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
        color: "#FFF !important",
        textTransform: 'none',
    };
export const DisabledSubmitButtonStyle = {
    ...SubmitButtonStyle,
    backgroundColor: "#B5D2DE !important",
}

export const AvatarStyle = { width: 80, height: 80};