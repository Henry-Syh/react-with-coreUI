import { 
  CModalBody, CCol, CRow, CModalFooter,
  CButton, CInputGroup, CFormLabel, CFormInput
} from "@coreui/react";

import { DateToString } from "src/utils";
import { CheckAPI } from "src/webAPI/ChargeStationFrontAPI";
import { contractCls, get_currentAccount, provider, _web3 } from "src/web3/tools";
import { useTranslation } from "react-i18next";

export default function ChargeFinish(props) {
  const { 
    stationID, chargeID, chargerID, price,
    chargekW, chargeStartTime, chargeEndTime,
    receipt, setPaied, setShowModify
  } = props;

  // 直接拿receipt.TOTAL_AMOUNT
  const total = receipt.TOTAL_AMOUNT

  async function PayBtn() {
    // 前端透過MetaMask繳費
    let _w3 = await _web3.init(provider.metamask);
    // 讀取合約資料
    let contractInfo = await contractCls.init();
    _w3.contractAddr = contractInfo.DCTW_ADDRESS ;
    _w3.contractABI = contractInfo.DCTW_ABI;

    let currentAccount = (await get_currentAccount())[0]  // get transcation wallet
    let contract_inst = await _w3.getContractInst();  // use contract
    let receiver = await _w3.toCheckSum(_w3.Company);  // DCTW pay for
    let sender = await _w3.toCheckSum(currentAccount);  // Payer wallet
    let amount = await _w3.toWei(receipt.TOTAL_AMOUNT.toString());  // PowerBox Bill Amount

    // get transcation detail
    let tx = await contract_inst.methods.transfer(receiver, amount).send({ from: sender, value: String(0) });

    // 將transcation detail傳回後端
    let transactionHash = tx.transactionHash;  // 取tx_receipt
    const nowTime = DateToString()  // 獲取當下時間
    const param = {
      DCTW_transactionID: transactionHash,
      ReceiptID: receipt.RECEIPT_ID,
      PaymentTime: nowTime
    }

    CheckAPI(param).then((result) => {
      if (result.rCode == "0001") {
        console.log('result = ', result.data);
        const attentionMsg = 
        t('chargefinishreturntxt1-chargefront', {RECEIPT_ID: receipt.RECEIPT_ID, Total: receipt.TOTAL_AMOUNT, now_Time: nowTime}) +
        t('pbbillmodalreturntxt2-pbbillrec') +
        `============================================\n` +
        t('pbbillmodalreturntxt3-pbbillrec', {Transaction_ID: result.data.TransactionID, Payment_Time: result.data.PaymentTime}) +
        t('pbbillmodalreturntxt4-pbbillrec', {FromWallet: result.data.FromWallet, GasFee_ETH: result.data.GasFee_ETH}) +
        t('pbbillmodalreturntxt5-pbbillrec', {Payment_Amount: result.data.PaymentAmount}) +
        `============================================\n` +
        t('pbbillmodalreturntxt6-pbbillrec');
        alert(attentionMsg);
        setPaied(true);
        setShowModify(false);
      } else {
        const errorMsg = result.rCodeDesc
        alert(errorMsg);
      }
    })
  }; 

  return (
    <div>
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
            <CFormLabel>{t('chargefinishtitle1-chargefront')}</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput
              value={chargerID}
              disabled
            />
          </CCol>
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CCol>
            <CFormLabel>{t('chargefinishtitle2-chargefront')}</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput
              value={price}
              disabled
            />
          </CCol>
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CCol>
            <CFormLabel>{t('chargefinishtitle3-chargefront')}</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput
              value={chargekW}
              disabled
            />
          </CCol>
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CCol>
            <CFormLabel>{t('chargefinishtitle4-chargefront')}</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput
              value={chargeStartTime}
              disabled
            />
          </CCol>
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CCol>
            <CFormLabel>{t('chargefinishtitle5-chargefront')}</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput
              value={chargeEndTime}
              disabled
            />
          </CCol>
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CCol>
            <CFormLabel>{t('chargefinishtitle6-chargefront')}</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput
              value={total}
              disabled
            />
          </CCol>
        </CInputGroup>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="info"
          variant="outline"
          onClick={()=>{PayBtn()}}
        >
          {t('pbbillmodalpaybtn-pbbillrec')}
        </CButton>
      </CModalFooter>
    </div>
  )
}
