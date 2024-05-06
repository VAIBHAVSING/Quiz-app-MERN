import { useState } from "react";
import { InputComponent } from "../Component/InputComponent";

export function Confirmpassword({ setValue }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword !== '' && e.target.value !== confirmPassword) {
      setPasswordMatch(false);
    } else { 
      setValue(e.target.value)
      setPasswordMatch(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== '' && e.target.value !== password) {
      setPasswordMatch(false);
    } else {
     
      setValue(e.target.value)
      setPasswordMatch(true);
    }
  };

  return (
    <div>
      <InputComponent
        label={"Password"}
        setvalue={setPassword}
        id={"PasswordButton"}
        type={"password"}
        placeholder={"Abc@123"}
        onChange={handlePasswordChange}
      />
      <InputComponent
        label={"Confirm Password"}
        setvalue={setConfirmPassword}
        id={"confirmpasswordbutton"}
        type={"password"}
        placeholder={"Abc@123"}
        onChange={handleConfirmPasswordChange}
      />
      {!passwordMatch && <p className="text-red">Passwords do not match!</p>}
      
    </div>
  );
}
