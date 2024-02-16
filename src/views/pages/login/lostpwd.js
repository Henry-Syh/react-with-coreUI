import { 
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CFormInput,
  CInputGroup,
  CForm,
  CFormLabel,
  CAlert,
} from '@coreui/react'

import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { LostPWDAPI } from "src/webAPI/accountAPI";
import { JSXString } from "src/utils";
import { useTranslation } from "react-i18next";

export default function lostpwd() {
  // 翻譯用hook
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false)  // errormsg顯示狀態

  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");

  function MailNewPassword() {
    // clear err msg
    setErrorMessage("");
    let warningWord = "";

    // chk parameters
    if (accountName == "") warningWord += t('usernameerror-login');
    if (email == "") warningWord += t('emailerror-register');
    if (!email.includes("@")) warningWord += t('emailincorrect-register');

    if (warningWord != "") {
      setErrorMessage(warningWord);
      setVisible(true)
      return;
    }

    let param = {
      account_name: accountName,
      email: email
    }

    LostPWDAPI(param).then((result) => {
      if (result.rCode == "0001") {
        alert(t('lostpwdreturn-lostpwd'))
        navigate("/login");
      } else {
        setErrorMessage(result.rCodeDesc);
        setVisible(true)  // 顯示錯誤訊息
        return errorMessage;
      }
    })

  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol>
          <CCard className="mx-3 mx-auto" style={{ width: '30rem' }}>
            <CCardHeader>{t('lostpwdtitle-lostpwd')}</CCardHeader>
            <CCardBody className="p-3">
              <CRow>
                <CForm>
                  <div className="text-center" style={{ marginBottom: "10px",marginTop: "10px"}}>
                    <h5 className='bg-light'>{t('lostpwdtext1-lostpwd')}</h5>
                    <CRow>
                      <CInputGroup className="mb-3" style={{ marginTop: "40px" }}>
                        <CCol>
                          <CFormLabel>{t('account-sidebar')}</CFormLabel>
                        </CCol>
                        <CCol>
                          <CFormInput
                            id="account_input"
                            placeholder={t('usernameinput')}
                            onChange={(e) => setAccountName(e.target.value)} />
                        </CCol>
                      </CInputGroup>
                    </CRow>
                    <CRow>
                      <CInputGroup className="mb-3" style={{ marginTop: "40px" }}>
                        <CCol>
                          <CFormLabel>{t('emailinput')}</CFormLabel>
                        </CCol>
                        <CCol>
                          <CFormInput
                            id="email_input"
                            type="email"
                            placeholder="abc@abc.com"
                            onChange={(e) => setEmail(e.target.value)} />
                        </CCol>
                      </CInputGroup>
                    </CRow>
                    <p style={{ marginTop: "30px" }}></p>
                      <CButton 
                        id="OK_Btn"
                        variant="outline"
                        onClick={() => {
                          MailNewPassword();
                        }}
                      >
                        {t('lostpwdbtn-lostpwd')}
                      </CButton>
                  </div>
                </CForm>
              </CRow>
              <p style={{ marginTop: "30px" }}></p>
              <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
                {JSXString(errorMessage)}
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
