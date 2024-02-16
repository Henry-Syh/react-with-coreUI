import { CModalHeader, CModalTitle } from "@coreui/react";
import { useTranslation } from "react-i18next";

export function ChargeCannotClose() {
  // 翻譯用hook
  const { t } = useTranslation();

  return (
    <div>
      <CModalHeader closeButton={false}>
        <CModalTitle>
          {t('chargeclosetitle-chargefront')}
        </CModalTitle>
      </CModalHeader>
    </div>
  )
}

export function ChargeCanClose() {
  // 翻譯用hook
  const { t } = useTranslation();

  return (
    <div>
      <CModalHeader>
        <CModalTitle>
          {t('chargeclosetitle-chargefront')}
        </CModalTitle>
      </CModalHeader>
    </div>
  )
}