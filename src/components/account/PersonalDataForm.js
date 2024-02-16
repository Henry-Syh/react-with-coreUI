import {
  CAlert,
  CButton,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";

import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { updateAccountInfoAPI, sendVerifyMailAPI, getAccountInfoAPI } from "src/webAPI/accountAPI";
import { storge, JSXString } from "src/utils";
import { useTranslation } from "react-i18next";

// 按下Edit按鈕後對應的input欄位反灰反白判斷
function PersonalButton(inputform, title) {
  switch (title) {
    case "Gender": {
      const isdisableMale = inputform[0].disabled
      const isdisableFemale = inputform[1].disabled

      if (isdisableMale === false | isdisableFemale === false) {
        inputform[0].disabled = true;
        inputform[1].disabled = true;
      } else {
        inputform[0].disabled = false;
        inputform[1].disabled = false;
      };
      break;
    }
    case "Password": {
      const isdisableOldpassword = inputform[0].disabled
      const isdisableNewpassword = inputform[1].disabled

      if (isdisableNewpassword === false | isdisableNewpassword === false) {
        inputform[0].disabled = true;
        inputform[1].disabled = true;
      } else {
        inputform[0].disabled = false;
        inputform[1].disabled = false;
      };
      break;
    }
    default: {
      const isdisable = inputform.disabled
      if (isdisable === false) {
        inputform.disabled = true;
      } else {
        inputform.disabled = false;
      };
      break;
    };
  };
};

export default function PersonalBasicForm() {
  // 翻譯用hook
  const { t } = useTranslation();
  const dispatch = useDispatch()

  // set state default
  const [username, setUsername] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [oldpassword, setOldPassword] = useState("")
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("male");
  const [realName, setRealName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [verify, setVerify] = useState(false);  // 帳號驗證狀態
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false)  // errormsg顯示狀態

  // 利用useEffect當頁面渲染完畢後執行呼叫api
  // 後面設[]的第2個參數表示每當頁面渲染完後會檢查useEffect第2個參數是否與上次一樣
  // 若一樣則不會重新執行裡面做的事情,不一樣則會再次執行裡面做的事情(若未設定則屬於這個情況)
  useEffect(() => {
    // fetch account info
    getAccountInfoAPI().then((result) => {
      if (result.rCode == "0001") {
        setUsername(result.data.ACCOUNT_NAME)
        setBirthday(result.data.BIRTHDAY)
        setGender(result.data.GENDER)
        setRealName(result.data.REAL_NAME)
        setEmail(result.data.EMAIL)
        setAddress(result.data.ADDRESS)
        setVerify(result.data.ACTIVATION)
        if (result.data.ACTIVATION === true) {
          storge.setStorge(storge.VERIFY, true)
          dispatch({
            type: "ISVERIFY",
            verify: storge.getStorge(storge.VERIFY),
          });
        };
      };
    });
  }, []);

  function personalInfoChangeBtn() {
    // clear err msg
    setErrorMessage("");
    let warningWord = "";

    // chk parameters
    if (username == "") warningWord += t('usernameerror-login');
    if (email == "") warningWord += t('emailerror-register');
    else if (email.includes("@") == false) warningWord += t('emailincorrect-register');
    if (newpassword != "" && oldpassword == "") warningWord += "If want change password, the oldpassword is required.<br />";
    if (address == "") warningWord += t('addresserror-register');
    if (birthday == "") warningWord += t('birthdayerror-register');
    if (realName == "") warningWord += t('realnameerror-register');
    if (verify == false) warningWord += "You must be verify your account by email first.<br />";

    if (warningWord != "") {
      setErrorMessage(warningWord);
      setVisible(true)
      return;
    };

    let updateparam = {
      account_name: username,
      account_passwd_old: oldpassword,
      account_passwd_new: newpassword,
      email: email,
      address: address,
      birthday: birthday,
      gender: gender,
      real_name: realName,
    };

    // call update accountinfo api
    updateAccountInfoAPI(updateparam)
      .then((result) => {
        console.log(result);

        if (result.rCode == "0001") {
          setUsername(result.data.ACCOUNT_NAME)
          setNewPassword("")
          setOldPassword("")
          setBirthday(result.data.BIRTHDAY)
          setGender(result.data.GENDER)
          setRealName(result.data.REAL_NAME)
          setEmail(result.data.EMAIL)
          setAddress(result.data.ADDRESS)
          setVerify(result.data.ACTIVATION)
          alert(t('successtext1-personaldata'));
          if (result.data.ACTIVATION === false) {
            alert(t('successtext2-personaldata'));
            // 將驗證狀態更改為false
            storge.setStorge(storge.VERIFY, false)
            dispatch({
              type: "ISVERIFY",
              verify: storge.getStorge(storge.VERIFY),
            });
          };
        } else {
          setNewPassword("")
          setOldPassword("")
          setErrorMessage(result.rCodeDesc);
          setVisible(true)
          return errorMessage;
        }
      }).catch((e) => console.log(e));

  };

  function reMailVerifyCode() {
    // call update accountinfo api
    sendVerifyMailAPI()
      .then((result) => {
        if (result.rCode == "0001") {
          alert(t('sendmailtext1-personaldata'));
        } else {
          alert(result.rCodeDesc);
        }
      }).catch((e) => console.log(e));
  };

  function genderCheck() {
    if (gender === "male") {
      return (
        <div>
          <CFormCheck 
            inline 
            type="radio" 
            name="gender" 
            id="maleCheckbox" 
            value="male" 
            label={t('maleinput')}
            onChange={(e) => setGender(e.target.value)}
            defaultChecked 
            disabled/>
          <CFormCheck 
            inline 
            type="radio" 
            name="gender" 
            id="femaleCheckbox" 
            value="female" 
            label={t('femaleinput')}
            onChange={(e) => setGender(e.target.value)}
            disabled />
        </div>
      )
    } else {
      return (
        <div>
          <CFormCheck 
            inline 
            type="radio" 
            name="gender" 
            id="maleCheckbox" 
            value="male" 
            label={t('maleinput')}
            onChange={(e) => setGender(e.target.value)}
            disabled/>
          <CFormCheck 
            inline 
            type="radio" 
            name="gender" 
            id="femaleCheckbox" 
            value="female" 
            label={t('femaleinput')}
            onChange={(e) => setGender(e.target.value)}
            defaultChecked
            disabled />
        </div>
      )
    }
  };

  return (
    <CListGroup flush>
      <div className="d-flex justify-content-between">
        <h5>{t('basic-personaldata')}</h5>
        {verify ? 
          t('verifytext1-personaldata'):
          <CButton 
            color="link"
            id="verifyButton"
            shape="rounded-0"
            onClick={() => {
              reMailVerifyCode();
            }}>
              {t('verifytext2-personaldata')}
          </CButton>}
      </div>
      <CListGroupItem className="d-flex justify-content-between align-items-center">
        <div>
          <CFormLabel htmlFor="usernameFormInput">{t('usernameinput')}</CFormLabel>
        </div>
        <div>
          <CFormInput
            type="text"
            id="changeUserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled />
        </div>
        <div>
        </div>
        <div></div>
      </CListGroupItem>
      <CListGroupItem className="d-flex justify-content-between align-items-center">
        <div>
          <CFormLabel htmlFor="usernameFormInput">{t('oldpassword-personaldata')}</CFormLabel>
        </div>
        <div>
          <CFormInput
            type="password"
            id="OldPassword"
            value={oldpassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled />
        </div>
        <div></div>
        <div></div>
        <div></div>
      </CListGroupItem>
      <CListGroupItem className="d-flex justify-content-between align-items-center">
        <div>
          <CFormLabel htmlFor="usernameFormInput">{t('newpassword-personaldata')}</CFormLabel>
        </div>
        <div>
          <CFormInput
            type="password"
            id="changePassword"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled />
        </div>
        <div>
          <CButton
            color="dark"
            variant="ghost"
            size="sm"
            id="passwordButton"
            onClick={() => {
              PersonalButton(
                [document.getElementById('OldPassword'), document.getElementById('changePassword')],
                "Password");
            }}>
            <CIcon icon={cilPencil} className="me-2" />
              {t('editbtn-personaldata')}
          </CButton>
        </div>
      </CListGroupItem>
      <CListGroupItem className="d-flex justify-content-between align-items-center">
        <div>
          <CFormLabel htmlFor="realnameFormInput">{t('realnameinput')}</CFormLabel>
        </div>
        <div>
          <CFormInput
            type="text"
            id="changeRealName"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            disabled />
        </div>
        <div>
          <CButton
            color="dark"
            variant="ghost"
            size="sm"
            id="realnameButton"
            onClick={() => {
              PersonalButton(document.getElementById('changeRealName'), "RealName");
            }}>
            <CIcon icon={cilPencil} className="me-2" />
            {t('editbtn-personaldata')}
          </CButton>
        </div>
      </CListGroupItem>
      <CListGroupItem className="d-flex justify-content-between align-items-center">
        <div>
          <CFormLabel htmlFor="birthdayFormInput">{t('birthdayinput')}</CFormLabel>
        </div>
        <div>
          <CFormInput
            type="date"
            id="changeBirthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            disabled />
        </div>
        <div>
          <CButton
            color="dark"
            variant="ghost"
            size="sm"
            id="birthdayButton"
            onClick={() => {
              PersonalButton(document.getElementById('changeBirthday'), "Birthday");
            }}>
            <CIcon icon={cilPencil} className="me-2" />
            {t('editbtn-personaldata')}
          </CButton>
        </div>
      </CListGroupItem>
      <CListGroupItem className="d-flex justify-content-between align-items-center">
        <div>
          <CFormLabel htmlFor="genderFormInput">{t('gender-personaldata')}</CFormLabel>
        </div>
        {genderCheck()}
        <div>
          <CButton
            color="dark"
            variant="ghost"
            size="sm"
            id="genderButton"
            onClick={() => {
              PersonalButton(
                [document.getElementById('maleCheckbox'), document.getElementById('femaleCheckbox')],
                "Gender"
              );
            }}>
            <CIcon icon={cilPencil} className="me-2" />
              {t('editbtn-personaldata')}
          </CButton>
        </div>
      </CListGroupItem>
      <p style={{ marginTop: "20px"}}></p>
      <h5>{t('contact-personaldata')}</h5>
      <CListGroupItem className="d-flex justify-content-between align-items-center">
        <div>
          <CFormLabel htmlFor="emailFormInput">{t('emailinput')}</CFormLabel>
        </div>
        <div>
          <CFormInput
            type="text"
            id="changeEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled />
        </div>
        <div>
          <CButton
            color="dark"
            variant="ghost"
            size="sm"
            onClick={() => {
              PersonalButton(document.getElementById('changeEmail'), "EMail");
            }}>
            <CIcon icon={cilPencil} className="me-2" />
            {t('editbtn-personaldata')}
          </CButton>
        </div>
      </CListGroupItem>
      <CListGroupItem className="d-flex justify-content-between align-items-center">
        <div>
          <CFormLabel htmlFor="addressFormInput">{t('addressinput')}</CFormLabel>
        </div>
        <div>
          <CFormInput
            type="text"
            id="changeAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled />
        </div>
        <div>
          <CButton
            color="dark"
            variant="ghost"
            size="sm"
            onClick={() => {
              PersonalButton(document.getElementById('changeAddress'), "Address");
            }}>
            <CIcon icon={cilPencil} className="me-2" />
              {t('editbtn-personaldata')}
          </CButton>
        </div>
      </CListGroupItem>
      <div>
        <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
          {JSXString(errorMessage)}
        </CAlert>
      </div>
      <p style={{ marginTop: "2px" }}></p>
      <div
        className="d-flex justify-content-end"
        style={{ marginRight: "15px" }}>
        <CButton
          color="dark"
          size="sm"
          onClick={() => {
            personalInfoChangeBtn();
          }}>
          {t('changebtn-personaldata')}
        </CButton>
      </div>
    </CListGroup>
  )
};