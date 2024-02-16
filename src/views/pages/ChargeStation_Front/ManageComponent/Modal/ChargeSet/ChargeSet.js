import { 
  CButton, CModal, CModalHeader, CModalTitle,
  CModalBody, CModalFooter, CInputGroup, CFormLabel,
  CFormInput, CFormSelect, CFormCheck, CCol
} from "@coreui/react";
import { Fragment, useState } from "react";

import { GenerateReceiptAPI } from "src/webAPI/ChargeStationFrontAPI";
import { ChargeCannotClose, ChargeCanClose } from "./ChargeClose"
import Charging from "./Charging"
import ChargeFinish from "./ChargeFinish"
import { DateToString } from "src/utils";
import { useTranslation } from "react-i18next";

export default function ChargeSet(props) {
  const { 
    showModify, setShowModify,
    dataBefore
  } = props;

  // 翻譯用hook
  const { t } = useTranslation();

  const [chargeID, setChargeID] = useState(dataBefore[0])  // 使用充電樁編號
  const [chargerID, setChargerID] = useState("0")  // 使用充電槍編號
  const [chargekW, setchargekW] = useState(0)  // 預計要充電千瓦數
  const [chargeStartTime, setchargeStartTime] = useState("")  // 充電開始時間
  const [chargeEndTime, setchargeEndTime] = useState("")  // 充電結束時間
  const [charger_Voltage, setCharger_Voltage] = useState(0)  // 充電槍輸出電壓
  const [charger_Current, setCharger_Current] = useState(0)  // 充電槍輸出電流
  const [chargeStatus, setChargeStatus] = useState(0)  // 充電狀態 0=尚未充電 1=充電中 2=充電完成

  const [showBar, setShowBar] = useState(0)  // 進度條百分比
  const [showText, setShowText] = useState(t('chargesetstatus-chargefront'))  // 進度條下方文字

  const [receipt, setReceipt] = useState({})  // 回傳的收據資料
  const [paied, setPaied] = useState(false)  // 是否已經繳費完成

  const ChangeStatus = () => {
    // 更改因為充電而消耗的電量
    let nowPower = parseFloat(document.getElementsByClassName(`${dataBefore[6]}-${dataBefore[0]}-remainedPower`)[0].childNodes[0].textContent.slice(0, -3))
    let remainedPower = nowPower - chargekW    
    document.getElementsByClassName(`${dataBefore[6]}-${dataBefore[0]}-remainedPower`)[0].childNodes[0].textContent = `${remainedPower} kW`
    // 更改待機為充電中
    document.getElementsByClassName(`${dataBefore[6]}-${chargerID}-status`)[0].childNodes[0].childNodes[1].textContent = t('chargesetstatus-chargefront')
    // 更改狀態燈號
    document.getElementsByClassName(`${dataBefore[6]}-${chargerID}-status`)[0].childNodes[0].childNodes[0].classList.remove('ant-badge-status-success')
    document.getElementsByClassName(`${dataBefore[6]}-${chargerID}-status`)[0].childNodes[0].childNodes[0].classList.add('ant-badge-status-processing')
  };

  const ModalClose = () => {
    // 控制modal是否會出現關閉按鈕
    switch (chargeStatus) {
      case 2:
        // 充電完且尚未繳費完成前不能有關閉按鈕
        if (paied == false) {
          return (
            <ChargeCannotClose />
          )
        } else {
          return (
            <ChargeCanClose />
          )
        }
      case 1:
        // 充電中不能有關閉按鈕
        return (
          <ChargeCannotClose />
        )
      case 0:
        // 充電前的選擇設定頁面可以有關閉按鈕
        return (
          <ChargeCanClose />
        )
    }
  };

  const Display = () => {
    // 顯示充電前畫面
    if (chargeStatus == 0) {
      return (
        <Fragment>
          <CModalBody>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>{t('managestationtext1-chargefront')}</CFormLabel>
              </CCol>
              <CCol>
                <CFormInput
                    value={chargeID}
                    disabled
                  />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>{t('managestationtext6-chargefront')}</CFormLabel>
              </CCol>
              <CCol>
                <CFormSelect
                  size="sm"
                  id='select_ChargerID'
                  value={chargerID}
                  onChange={(e) => {
                    setChargerID(e.target.value);
                    if (e.target.value != "0") {
                      switch (e.target.value) {
                        case `${chargeID}-A`:
                          setCharger_Voltage(dataBefore[2]['Voltage']);
                          setCharger_Current(dataBefore[2]['Current']);
                          break;
                        case `${chargeID}-B`:
                          setCharger_Voltage(dataBefore[3]['Voltage']);
                          setCharger_Current(dataBefore[3]['Current']);
                          break;
                      }
                    }
                  }}
                >
                  <option value={"0"}>{t('onlinemallexchangeselectdefalut-web3exchange')}</option>
                  <option value={`${chargeID}-A`}>{`${t('managestationtext6-chargefront')}A`}</option>
                  <option value={`${chargeID}-B`}>{`${t('managestationtext6-chargefront')}B`}</option>
                </CFormSelect>
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel>{`${t('chargesetformlabel-chargefront')}(kW)`}</CFormLabel>
              </CCol>
              <CCol>
                <CFormInput
                  type="number"
                  min="10"
                  step="0.01"
                  placeholder={`${t('chargesetformlabel-chargefront')}(kW)`}
                  value={chargekW}
                  onChange={(e) => setchargekW(e.target.value)}
                />
              </CCol>
            </CInputGroup>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="info"
              variant="outline"
              onClick={()=>{
                ChargeStart()
              }}
            >
              {t('chargesetbtn1-chargefront')}
            </CButton>
          </CModalFooter>
        </Fragment>
      )
    };
    // 顯示充電中畫面
    if (chargeStatus == 1) {
      return (
        <Fragment>
          <Charging 
            showText={showText}
            showBar={showBar}
          />
        </Fragment>
      )
    };
    // 顯示充電完繳費畫面
    if (chargeStatus == 2) {
      return (
        <Fragment>
          <ChargeFinish 
            stationID={dataBefore[4]} chargeID={chargeID}
            chargerID={chargerID} price={dataBefore[5]}
            chargekW={chargekW} chargeStartTime={chargeStartTime}
            chargeEndTime={chargeEndTime} receipt={receipt}
            setPaied={setPaied} setShowModify={setShowModify}
          />
        </Fragment>
      )
    };
  };

  const ChargeStart = () => {
    // 按下充電按鈕
    // clear err msg
    let errMsg = "";

    // chk params
    if (chargerID == "0") errMsg += t('chargeseterror1-chargefront');
    if (chargekW == 0) errMsg += t('chargeseterror2-chargefront');
    if (chargekW < 10) errMsg += t('chargeseterror3-chargefront');
    if (chargerID == `${chargeID}-A` && dataBefore[1]["A"] != 1) errMsg += t('chargeseterror4-chargefront');
    if (chargerID == `${chargeID}-B` && dataBefore[1]["B"] != 1) errMsg += t('chargeseterror4-chargefront');

    if (errMsg != "") {
      alert(errMsg); // 顯示錯誤訊息
      return;
    };
    // 更改因為充電而消耗的電量
    ChangeStatus();

    // 開始充電
    const start = DateToString();  // 設定開始充電時間
    setchargeStartTime(start);
    setChargeStatus(1);
    // 模擬充電使用倒數計時
    let countSec = 10;
    let barProgress = 0;
    const timerId = setInterval(()=>{
      // 按照讀秒更改顯示畫面
      document.getElementsByClassName(`${dataBefore[6]}-${chargerID}-time`)[0].childNodes[0].textContent = `${countSec} ${t('managestationtext2-chargefront')}`
      countSec--
      if (countSec > 0) {
        if ((countSec % 2) == 0) {
          barProgress = barProgress + 20
          setShowBar(barProgress)
        }
      } else {
        barProgress = barProgress + 20
        setShowBar(barProgress)
        setShowText(t('chargesetreturn-chargefront'));
        setTimeout(()=>{
          // 秒數設定為0
          document.getElementsByClassName(`${dataBefore[6]}-${chargerID}-time`)[0].childNodes[0].textContent = `0 ${t('managestationtext2-chargefront')}`
          const end = DateToString();
          setchargeEndTime(end);
          const param = {
            stationName: dataBefore[4],
            charger: chargerID,
            startTime: start,
            endTime: end,
            chargePower: chargekW,
            voltage: charger_Voltage,
            current: charger_Current,
            perElectric: dataBefore[5]
          }

          // fetch 產生收據api
          GenerateReceiptAPI(param).then((result) => {
            if (result.rCode == "0001") {
              console.log("receipt data = ", result.data);
              alert(result.msg)  // 直接顯示api回傳的msg
              setReceipt(result.data);
              setChargeStatus(2);
              // 將充電槍以及充電秒數init
              // 更改為待機
              document.getElementsByClassName(`${dataBefore[6]}-${chargerID}-status`)[0].childNodes[0].childNodes[1].textContent = t('managestationbadge2-chargefront')
              // 更改狀態燈號
              document.getElementsByClassName(`${dataBefore[6]}-${chargerID}-status`)[0].childNodes[0].childNodes[0].classList.remove('ant-badge-status-processing')
              document.getElementsByClassName(`${dataBefore[6]}-${chargerID}-status`)[0].childNodes[0].childNodes[0].classList.add('ant-badge-status-success')
            } else {
              alert(result.rCodeDesc);
              return;
            }
          });
        }, "3000")
        clearInterval(timerId);
      }
    }, 1000);
  }; 

  return (
    <div>
      <CModal
        // size='lg'
        alignment='center'
        visible={showModify}
        onClose={() => setShowModify(false)}        
        backdrop='static'
        keyboard={false}
      >
        {
          ModalClose()
        }
        {
          Display()
        }
      </CModal>
    </div>
  )
}
