import { CCol, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { useTranslation } from "react-i18next";

const TransferDetail = props => {
  // 翻譯用hook
  const { t } = useTranslation();

  const { detail, showDetail, setShowDetail } = props;

  return (
    <CModal
      size="lg"
      visible={showDetail}
      onClose={() => setShowDetail(false)}
    >
      <CModalHeader>
        <CModalTitle>{detail.TRADE_NO} {t('searchdetailbtn-production')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          {
            Object.entries(detail).map(([key, value], idx) => {
              return (
                <CRow className="mb-2">
                  <CCol>
                    <CFormLabel className="col-sm-2">{key}</CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormInput className="" type="text" placeholder={value} disabled readOnly />
                  </CCol>
                </CRow>
              )
            })
          }
        </CForm>

      </CModalBody>
    </CModal>
  )
}

TransferDetail.propTypes = {}

export default TransferDetail