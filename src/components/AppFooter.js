import React from 'react'
import { CFooter } from '@coreui/react'
import { useTranslation } from "react-i18next";

const AppFooter = () => {
  const { t } = useTranslation();
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="ms-1">&copy; 2023 </span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          {t('Companyname')}
        </a>
        <span className="ms-1">All Rights Reserved.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
