import { CCard, CCardBody, CCol, CContainer, CRow, CCardHeader } from "@coreui/react";
import OnlineMall from "src/views/pages/MainProduct/OnlineMall";
import { ChkToken } from "src/components/Token";
import { useTranslation } from "react-i18next";

export default function MainProduction(props) {
  // 翻譯用hook
  const { t } = useTranslation();
  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="mx-1">
              <CCardHeader>{t('mainprodtitle-mainprod')}</CCardHeader>
              <CCardBody className="p-3">
                <OnlineMall />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <p style={{ marginBottom: "30px"}}></p>
    </div>
  );
}