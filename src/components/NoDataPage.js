import { CImage, CCol, CRow } from "@coreui/react";
import NoDataPNG from 'src/assets/images/common/nodata.png'
import { useTranslation } from "react-i18next";

export default function NoDataPage(props) {
  // 翻譯用hook
  const { t } = useTranslation();

  const {text} = props;
  return (
    <div className="clearfix" style={{ marginTop: '20px' }}>
      <CImage align="center" rounded src={NoDataPNG} width={250} height={250} />
      <p></p>
      <CCol className="text-center" style={{ marginTop: '50px' }}>
        <h3>{t('nodatatext-nodata')}</h3>
      </CCol>
    </div>
  )
}
