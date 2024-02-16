import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardText,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import LoginForm from "src/components/inOut/LoginForm";
import { VerifyAccountAPI } from "../../../webAPI/accountAPI";

const Login = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [verifyResult, setVerifyResult] = useState('');

  useEffect(() => {
    // console.log(searchParams.get("v_code"));
    let v_code = searchParams.get("v_code");

    if (v_code != null) {
      console.log('verify');
      verify_api(v_code);
    }

    async function verify_api(v_code) {
      let result = await VerifyAccountAPI(v_code);
      console.log(result);
      if (result.msg == '') {
        setVerifyResult(result.rCodeDesc);
      } else {
        setVerifyResult(result.msg);
      }
    }
  }, [])


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <div>
                    <CCardText>
                      {verifyResult}
                    </CCardText>
                  </div>
                  <LoginForm />
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>{t('register')}</h2>
                    <p>
                      {t('welcome-login')}
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        {t('registerbtn-login')}
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
