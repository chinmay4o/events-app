import OtpInput from "react-otp-input";

const OTPLogin = (props) => {
    return (
        <div className="w-[320px] flex justify-between">
            <OtpInput
                value={props.otpValue}
                onChange={(value) => props.handleChange(value)}
                numInputs={props.length}
                separator=""
                containerStyle={{
                    fontSize: "16px",
                    color: "#14142B",
                }}
                hasErrored={props.errored}
                inputStyle={{
                    width: "54.24px",
                    height: "48px",
                    border: "2px solid #D1D1DB",
                    boxSizing: "border-box",
                    marginRight: "40px",
                    borderRadius: "10px",
                    outline: "none",
                }}
                isInputNum={true}
                focusStyle={{
                    outline: "1px solid #D1D1DB",
                }}
                errorStyle={{
                    border: "1px solid red",
                    outline: "1px solid #D1D1DB",
                }}
                shouldAutoFocus={true}
            />
            {props.errored && <div className="text-error text-xs font-semibold my-1 ml-4 md:text-center lg:text-left color-red-300">{props.errorMessage}</div>}
        </div>
    );
};

export default OTPLogin;
