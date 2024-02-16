import { CCard, CCardBody, CCol, CContainer, CRow, CButton } from "@coreui/react";
import PersonalBasicForm from "src/components/account/PersonalDataForm";
import { ChkToken } from "src/components/Token";
import { useTranslation } from "react-i18next";


export default function Psernal(props) {
  // 翻譯用hook
  const { t } = useTranslation();
  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={7}>
            <h1>{t('personaltitle-personaldata')}</h1>
            <CCard className="mx-3" style={{ width: '35rem' }}>
              <CCardBody className="p-3">
                <PersonalBasicForm />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <p style={{ marginBottom: "20px" }}></p>
      <ChkToken />
    </div>
  );
}
