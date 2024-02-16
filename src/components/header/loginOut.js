import {
  cilAccountLogout,
  cilArrowCircleRight,
  cilExitToApp,
  cibLine,
  cilContact
} from "@coreui/icons";

import {
  CNavItem,
  CNavLink,
  CHeader,
  CHeaderNav,
  CButton,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { useNavigate, NavLink } from "react-router-dom";
import { GetOnlyAuthLinkAPI } from "src/webAPI/LineApi";
import LocaleSelection from "./LocaleSelection"
import { useTranslation } from "react-i18next";

const LoginHeader = (props) => {
  const { userName, showLine } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();  // 頁面導向

  return (
    <div>
      <CHeaderNav className="ms-3">
        {
          showLine ?
          (
            <CNavItem>
              <CButton
                color="link"
                onClick={()=>{
                  GetOnlyAuthLinkAPI().then((result)=>{
                    if (result.rCode == "0001") {
                      window.location.replace(result.data)
                    }
                  })
                }}>
                <CIcon icon={cibLine} size="sm" />
                {t('Linebind-header')}
              </CButton>
            </CNavItem>
          ) : null
        }
        <CNavItem>
          <CButton 
            color="link"
            onClick={()=>{
              navigate("/account/info");  // 前往個人頁面
            }}>
            <CIcon icon={cilContact} size="sm" />
            {userName}
          </CButton>
        </CNavItem>
        <CNavItem>
          <CButton
            color="link"
            onClick={()=>{
              navigate("/logout");  // 前往登出頁面
            }}>
            <CIcon icon={cilAccountLogout} size="sm" />
            {t('logout')}
          </CButton>
        </CNavItem>
        <LocaleSelection />
      </CHeaderNav>
    </div>
  )
}

const UnLoginHeader = () => {
  const { t } = useTranslation();
  return (
    <div>
      <CHeaderNav className="ms-3">
        <CNavItem>
          <CNavLink to="/login" component={NavLink}>
            <CIcon icon={cilExitToApp} size="sm" />
            {t('login')}
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink to="/register" component={NavLink}>
            <CIcon icon={cilArrowCircleRight} size="sm" />
            {t('register')}
          </CNavLink>
        </CNavItem>
        <LocaleSelection />
      </CHeaderNav>
    </div>
  )
};


export {
  LoginHeader,
  UnLoginHeader,
}