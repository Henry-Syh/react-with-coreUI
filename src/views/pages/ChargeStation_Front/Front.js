import { 
  CCard, CCardBody, CCol, 
  CRow, CCardHeader, CAlert
} from "@coreui/react";

import { useState, useEffect, Fragment } from "react";
import { Collapse } from 'antd';

import { WaitSpinner } from 'src/components/Waiting'
import ManageStations from 'src/views/pages/ChargeStation_Front/ManageComponent/ManageStations'
import { JSXString, DateToString } from "src/utils";

import { SearchManageDataAPI, RealTimeDataAPI } from "src/webAPI/ChargeStationFrontAPI";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


export default function Front() {
  // 翻譯用hook
  const { t } = useTranslation();
  const languageChange = useSelector((state) => state.languageChange); // 當語言改變時PowerBox繳費狀況也要改

  // 各種頁面狀態
  const [loading, setLoading] = useState(false);  // 讀取資料
  const [errormsg, setErrormsg] = useState("");  // 錯誤訊息
  const [showErrorMsg, setShowErrorMsg] = useState(false);  // 顯示錯誤訊息
  const [RenderOK, setRenderOK] = useState(false);  // 頁面渲染完畢

  // 管理Data
  const [manageData, setManageData] = useState([])  // 管理Data

  const GetStatus = () => {
    // 獲取各充電樁及槍的即時資料並發送至後端
    manageData.map((data) => {
      let realTimeData = {};      
      realTimeData.datetime = DateToString()
      realTimeData.status = {};
      console.log('==============================');

      let station_ID = data['STATION_ID'];
      // 充電樁的即時狀態
      data['CHARGING_STATION'].map((charge) => {
        realTimeData['status'][charge['CHARGE_ID']] = {
            'remainedPower': document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-remainedPower`)[0].childNodes[0].textContent,
            'A': {
              'Status': document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-A-status`)[0].childNodes[0].childNodes[1].textContent,
              'Time': document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-A-time`)[0].childNodes[0].textContent
            },
            'B': {
              'Status': document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-B-status`)[0].childNodes[0].childNodes[1].textContent,
              'Time': document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-B-time`)[0].childNodes[0].textContent
            }
          }
        // // 各充電樁剩餘電量
        // console.log(`${station_ID}-${charge['CHARGE_ID']} 剩餘電量 = `, document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-remainedPower`)[0].childNodes[0].textContent);
        // // 各充電槍狀態
        // console.log(`${station_ID}-${charge['CHARGE_ID']} A充電槍狀態 =`, document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-A-status`)[0].childNodes[0].childNodes[1].textContent);
        // console.log(`${station_ID}-${charge['CHARGE_ID']} B充電槍狀態 =`, document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-B-status`)[0].childNodes[0].childNodes[1].textContent);
        // // 各充電槍秒數
        // console.log(`${station_ID}-${charge['CHARGE_ID']} A充電槍秒數 =`, document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-A-time`)[0].childNodes[0].textContent);
        // console.log(`${station_ID}-${charge['CHARGE_ID']} B充電槍秒數 =`, document.getElementsByClassName(`${station_ID}-${charge['CHARGE_ID']}-B-time`)[0].childNodes[0].textContent);
      });
      console.log('realTimeData = ', realTimeData);
      // 傳送即時資料到MQ API
      // RealTimeDataAPI(realTimeData, station_ID)
    });
  };

  // 每一段時間傳送資料
  const TIME_MS = 2000;

  // 一開始進入此畫面就用useEffect抓取管理資料
  useEffect(() => {
    if (RenderOK != true) {
      // 初始化資料
      setLoading(true);
      setManageData([]);

      // fetch 獲取管理資料api
      SearchManageDataAPI().then((result) => {
        if (result.rCode == "0001") {
          console.log("result.data = ", result.data);
          setManageData(result.data);
          setLoading(false);
          setRenderOK(true);
          return;
        } else {
          setErrormsg(result.rCodeDesc);
          setLoading(false); 
          setShowErrorMsg(true);
          return;
        }
      })
    } else {
      // const interval = setInterval(() => {
      //   console.log('==============================');
      //   console.log('Logs every 2s');
      //   // console.log("log = ", document.getElementsByClassName("NSP-E1-CS0001-A-time")[0].childNodes[0].textContent);
      //   GetStatus();
      // }, TIME_MS);
      // return () => clearInterval(interval);
      
    }
    
  }, [RenderOK, languageChange])
  
  return (
    <div>
      <CRow>
        <CCard className="mx-3" style={{ width: '77rem' }}>
          <CCardHeader>{t('chargefronttitle-chargefront')}</CCardHeader>
          <CCardBody className="p-3">
            <CRow>
              <CCol>
                <CAlert
                    color="danger"
                    dismissible
                    visible={showErrorMsg}
                    onClose={() => setShowErrorMsg(false)}
                    style={{ marginTop: "30px"}}
                  >
                    {JSXString(errormsg)}
                  </CAlert>
                  {
                    loading ?
                    (
                      <div style={{ marginBottom: "30px",marginTop: "40px"}}>
                        <WaitSpinner></WaitSpinner>
                      </div>
                    ) :
                    (
                      manageData.map((data, idx) => {
                        return (
                          <Fragment key={idx}>
                            <ManageStations
                              Data={data} setErrormsg={setErrormsg} setShowErrorMsg={setShowErrorMsg}
                              setRenderOK={setRenderOK}
                            />
                          </Fragment>
                        )
                      })
                    )
                  }
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CRow>
    </div>
  )
}
