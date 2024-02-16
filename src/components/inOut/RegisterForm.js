import {
  cilAddressBook,
  cilBirthdayCake,
  cilLockLocked,
  cilUser,
  cilPhone,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CSpinner,
  CAlert,
} from "@coreui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "src/webAPI/accountAPI";
import { JSXString } from "src/utils";
import { useTranslation } from "react-i18next";

export default function RegisterForm() {
  const navigate = useNavigate();

  // 翻譯用hook
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("male");
  const [realName, setRealName] = useState("");

  // 註冊按鈕狀態
  const [isRegi, setIsRegi] = useState(false);
  //錯誤狀態
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false)  // errormsg顯示狀態

  const registerBtnHandler = (e) => {
    // clear err msg
    setErrorMessage("");
    let warningWord = "";

    // chk parameters
    if (username == "") warningWord += t('usernameerror-login');
    if (email == "") warningWord += t('emailerror-register');
    else if (email.includes("@") == false) warningWord += t('emailincorrect-register');
    if (password == "") warningWord += t('passworderror-login');
    else if (password !== repassword) {
      warningWord += t('repassworderror-register');
    }
    if (phoneNumber == "") warningWord += t('phonenumbererror-register');
    if (address == "") warningWord += t('addresserror-register');
    if (birthday == "") warningWord += t('birthdayerror-register');
    if (realName == "") warningWord += t('realnameerror-register');

    if (warningWord != "") {
      setErrorMessage(warningWord);
      console.log("errorMessage", warningWord);
      setVisible(true)
      return;
    }

    let param = {
      account_name: username,
      account_passwd: password,
      email: email,
      address: address,
      phone_number: phoneNumber,
      birthday: birthday,
      gender: gender,
      real_name: realName,
    };

    console.log(param);

    setIsRegi(true);
    registerAPI(param)
      .then((result) => {
        if (result.rCode == "0001") {
          // 導頁
          navigate("/login");
          alert(t('successtext-register'));
        } else {
          setIsRegi(false);
          setErrorMessage(result.rCodeDesc);
          setVisible(true)  // 顯示錯誤訊息
          return errorMessage;
        }
      })
      .catch((e) => console.log(e));

  };

  const RegiBtn = () => {
    return (
      <CButton color="primary" onClick={() => registerBtnHandler()}>
        {t('register0btn-register')}
      </CButton>
    );
  };

  const RegingBtn = () => {
    return (
      <CButton color="secondary">
        <CSpinner
          component="span"
          size="sm"
          variant="grow"
          aria-hidden="true"
        />
        {t('register1btn-register')}
      </CButton>
    );
  };

  return (
    <CForm>
      <h1>{t('register')}</h1>
      <p className="text-medium-emphasis">{t('text1-register')}</p>
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={cilUser} />
        </CInputGroupText>
        <CFormInput
          placeholder={t('usernameinput')}
          onChange={(e) => setUsername(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>
        <CFormInput
          type="password"
          placeholder={t('passwordinput')}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>
        <CFormInput
          type="password"
          placeholder={t('repeatpasswordinput')}
          onChange={(e) => setRepassword(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CInputGroupText>@</CInputGroupText>
        <CFormInput
          placeholder={t('emailinput')}
          onChange={(e) => setEmail(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilAddressBook} />
        </CInputGroupText>
        <CFormInput
          placeholder={t('addressinput')}
          onChange={(e) => setAddress(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilPhone} />
        </CInputGroupText>
        <CFormInput
          type="tel"
          placeholder={t('phonenumberinput')}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilBirthdayCake} />
        </CInputGroupText>
        <CFormInput
          type="date"
          placeholder={t('birthdayinput')}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CFormCheck
          inline
          type="radio"
          name="gender"
          id="MaleRadio"
          value="male"
          label={t('maleinput')}
          defaultChecked
          onChange={(e) => setGender(e.target.value)}
        />
        <CFormCheck
          inline
          type="radio"
          name="gender"
          id="FemaleRadio"
          vale="female"
          label={t('femaleinput')}
          onChange={(e) => setGender(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilUser} />
        </CInputGroupText>
        <CFormInput
          placeholder={t('realnameinput')}
          onChange={(e) => setRealName(e.target.value)}
        />
      </CInputGroup>
      <div>
        <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
          {JSXString(errorMessage)}
        </CAlert>
      </div>
      <div className="d-grid">
        {isRegi ? null : <RegiBtn />}
        {isRegi ? <RegingBtn /> : null}
      </div>
    </CForm>
  );
}
