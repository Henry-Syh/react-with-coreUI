import { CNavItem, CFormSelect } from "@coreui/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { storge } from "src/utils";

export default function LocaleSelection() {
  const dispatch = useDispatch();

  const languageChange = useSelector((state) => state.languageChange);
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("zhtw");

  useEffect(() => {
    i18n.changeLanguage(lang);
    storge.setStorge(storge.LANG, lang)
    dispatch({ type: "set", languageChange: !languageChange });
  }, [lang]);

  return (
    <div style={{ marginLeft: '15px', marginTop: '3px' }}>
      <CNavItem>
        <CFormSelect 
          size="sm"
          id='select_locale'
          onChange={(e) => setLang(e.target.value)}
        >          
          <option value="zhtw">中文</option>
          <option value="jp">日本語</option>
          <option value="en">English</option>
        </CFormSelect>
      </CNavItem>
    </div>
  )
}
