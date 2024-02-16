import { cilLockLocked, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storge, JSXString } from "src/utils";
import { loginAPI } from "src/webAPI/accountAPI";
import { useTranslation } from "react-i18next";

export default function LoginForm(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false)  // errormsg顯示狀態
  // 翻譯用hook
  const { t } = useTranslation();

  //錯誤狀態
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const loginHandler = (e) => {
    // clear err msg
    setErrorMessage(null);
    let errMsg = "";

    // chk params
    if (username === "") {
      errMsg += t('usernameerror-login');
    }
    if (password === "") {
      errMsg += t('passworderror-login');
    }
    if (errMsg != "") {
      setErrorMessage(errMsg);
      setVisible(true)  // 顯示錯誤訊息
      return;
    }

    // call loginAPI
    loginAPI(username, password)
      .then((result) => {
        console.log('result.data = ', result.data);
        if (result.rCode == "0001") {
          console.log('result.data.lineBind(login) = ', result.data.lineBind);
          // save token
          storge.setStorge(storge.TOKEN_NAME, result.data.access_token)
          storge.setStorge(storge.USERNAME, username)
          storge.setStorge(storge.VERIFY, true)
          storge.setStorge(storge.POWERBOX_BOUGHT, result.data.powerbox_bought)
          storge.setStorge(storge.LINEBINDED, result.data.lineBind)
          // 設定全域變數
          dispatch({
            type: "UPDATE_TOKEN",
            token: storge.getStorge(storge.TOKEN_NAME),
            type: "UPDATE_USERNAME",
            userName: storge.getStorge(storge.USERNAME),
            type: "ISVERIFY",
            verify: storge.getStorge(storge.VERIFY),
            type: "POWERBOX_BOUGHT",
            pb_bought: storge.getStorge(storge.POWERBOX_BOUGHT),
            type: "LINENOTIFY",
            lineBind: storge.getStorge(storge.LINEBINDED),
          });

          // 導頁
          navigate("/");
        } else {
          setErrorMessage(result.rCodeDesc);
          setVisible(true)  // 顯示錯誤訊息
          return errorMessage;
        }
      }).catch((e) => console.log(e));

  };

  return (
    <CForm>
      <h1>{t('login')}</h1>
      <p className="text-medium-emphasis">{t('text1-login')}</p>
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={cilUser} />
        </CInputGroupText>
        <CFormInput
          placeholder={t('usernameinput')}
          onChange={(e) => setUsername(e.target.value)}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>
        <CFormInput
          type="password"
          placeholder={t('passwordinput')}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CInputGroup>
      {/* 錯誤訊息 */}
      <div>
        <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
          {JSXString(errorMessage)}
        </CAlert>
      </div>
      <CRow>
        <CCol xs={6}>
          <CButton
            color="primary"
            className="px-4"
            onClick={() => loginHandler()}
          >
            {t('login')}
          </CButton>
        </CCol>
        <CCol xs={6} className="text-right">
          <CButton color="link"  href="/#/lost">
            {t('passwordforgot-login')}
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
}
