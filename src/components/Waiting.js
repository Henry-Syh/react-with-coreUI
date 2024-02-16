import { CSpinner } from '@coreui/react'
import { useTranslation } from "react-i18next";

const divStyle = {
    color: 'blue',
    fontSize: '50pt',
    fontWeight: 'bold'
};

export const WaitingDisplay = () => {
    // 翻譯用hook
    const { t } = useTranslation();
    return (
        <div className="pt-5 text-center">
            <div style={divStyle}>
                {t('waiting')}
            </div>
        </div>
    )
}

export const WaitSpinner = () => {
    return (
        <CSpinner color="secondary"/>
    )
}