import { 
  CCol,
  CRow, 
  CButton,
  CContainer} from "@coreui/react";
import { Result, Spin } from 'antd';
import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storge } from "src/utils";
import { SaveUserLineAPI } from "src/webAPI/LineApi";
import { useTranslation } from "react-i18next";

export default function LineNotify() {
  // 翻譯用hook
  const { t } = useTranslation();

  // 各種頁面狀態
  const [showMoveButton, setShowMoveButton] = useState(false);  // 轉跳頁面按鈕
  const [showWrongPage, setShowWrongPage] = useState(false);  // 顯示錯誤結果component
  const [title_text, setTitle_text] = useState(t('linenotifytext-linenotify')); 

  const navigate = useNavigate();  // 頁面導向
  const dispatch = useDispatch();

  function CheckCompany(text: String) {
    if (text.split('_')[0] === "Company") {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    const UserQuery = window.location.search;  // 抓取 url Query
    const UserCode = UserQuery.replace('?', '').split("&")[0].split("=")[1];
    const UserName = UserQuery.replace('?', '').split("&")[1].split("=")[1].split('_')[1];
    const State = CheckCompany(UserQuery.replace('?', '').split("&")[1].split("=")[1]);

    // chk parameters
    if (State != true) {
      setTimeout(()=>{
        setShowWrongPage(true);
        setTitle_text(t('linenotifytext1-linenotify'));
      }, 5000)
      return;
    }

    // fetch 將使用者的Code查詢Token並儲存起來api
    const param = {
      AccountName: UserName,
      UserCode: UserCode,
    };

    SaveUserLineAPI(param).then((result) => {
      if (result.rCode == "0001") {
        // Line Notify綁定與富泰帳號綁定完成
        setTimeout(()=>{
          setTitle_text(result.msg);
          setShowMoveButton(true);
        }, 5000)
      } else {
        setTimeout(()=>{
          setShowWrongPage(true);
          setTitle_text(result.rCodeDesc);
        }, 5000)
        
      };
    });
  }, [])


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={7}>
            {
              showWrongPage ?
              (
                <Result 
                  status="warning"
                  title={title_text}
                  />
              ) :
              (
                <Result
                  title={title_text}
                  extra={
                    showMoveButton ?
                    (
                      <CButton 
                        color="success"
                        size="sm"
                        shape="rounded-pill"
                        onClick={() => {
                          // 清掉all localstorge
                          storge.clearAllStorge()
                          // 清除全域變數
                          dispatch({
                            type: "UPDATE_TOKEN",
                            token: "",
                            type: "UPDATE_USERNAME",
                            userName: "",
                            type: "ISVERIFY",
                            verify: null,
                            type: "POWERBOX_BOUGHT",
                            pb_bought: false,
                          });
                          navigate("/login");  // 前往登入頁面
                        }}
                      >
                        {t('login')}
                      </CButton>
                    ): 
                    (
                      <Spin size="large" />
                    )
                  }
                />
              )
            }
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
