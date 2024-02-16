import { CCard, CCardBody, CCol, CContainer, CRow, CCardHeader } from "@coreui/react";
import SearchProductFrom from "src/components/account/SearchProductFrom";
import { ChkToken } from "src/components/Token";
import { useTranslation } from "react-i18next";


export default function Production(props) {
  // 翻譯用hook
  const { t } = useTranslation();
  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="mx-3" style={{ width: '60rem' }}>
              <CCardHeader>{t('productiontitle-production')}</CCardHeader>
              <CCardBody className="p-3">
                <SearchProductFrom />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <p style={{ marginBottom: "20px"}}></p>
    </div>
  );
}