import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";

import { DateToString } from "src/utils";
import { BillPaymentAPI } from "src/webAPI/exchangeAPI";
import { _web3, contractCls, get_currentAccount, provider } from "../../../web3/tools";
import { useTranslation } from "react-i18next";

export default function PayModal(props) {
  const { showDetail, setShowDetail, Data, reloadList, setReloadList } = props;

  // 翻譯用hook
  const { t } = useTranslation();

  async function PayBtn() {
    // 前端透過MetaMask繳費

    // 讀取合約資料
    let contractInfo = await contractCls.init();
    let DCTW_ADDRESS = contractInfo.DCTW_ADDRESS;
    let DCTW_ABI = contractInfo.DCTW_ABI;

    let _w3 = await _web3.init(provider.metamask);
    _w3.contractAddr = DCTW_ADDRESS;
    _w3.contractABI = DCTW_ABI

    let currentAccount = (await get_currentAccount())[0]  // get transcation wallet
    let contract_inst = await _w3.getContractInst();  // use contract
    let receiver = await _w3.toCheckSum(_w3.Company);  // DCTW pay for
    let sender = await _w3.toCheckSum(currentAccount);  // Payer wallet
    let amount = await _w3.toWei(Data.Total.toString());  // PowerBox Bill Amount
    // let amount = await _w3.toWei("0.01");  // PowerBox Bill Amount

    // get transcation detail
    let tx = await contract_inst.methods.transfer(receiver, amount).send({ from: sender, value: String(0) });

    // 將transcation detail傳回後端
    let transactionHash = tx.transactionHash;  // 取tx_receipt
    const nowTime = DateToString()  // 獲取當下時間
    const param = {
      DCTW_transactionID: transactionHash,
      BillID: Data.BillID,
      PaymentTime: nowTime
    }

    BillPaymentAPI(param).then((result) => {
      if (result.rCode == "0001") {
        console.log('result = ', result.data);
        // reload PowerBox Bill
        const attentionMsg =
          t('pbbillmodalreturntxt1-pbbillrec', {Bill_ID: Data.BillID, Total: Data.Total, now_Time: nowTime}) +
          t('pbbillmodalreturntxt2-pbbillrec') +
          `============================================\n` +
          t('pbbillmodalreturntxt3-pbbillrec', {Transaction_ID: result.data.TransactionID, Payment_Time: result.data.PaymentTime}) +
          t('pbbillmodalreturntxt4-pbbillrec', {FromWallet: result.data.FromWallet, GasFee_ETH: result.data.GasFee_ETH}) +
          t('pbbillmodalreturntxt5-pbbillrec', {Payment_Amount: result.data.PaymentAmount}) +
          `============================================\n` +
          t('pbbillmodalreturntxt6-pbbillrec');
        alert(attentionMsg);
      } else {
        const errorMsg = result.rCodeDesc
        alert(errorMsg);
      }
      setShowDetail(false);
      setReloadList(!reloadList);
    })
  }

  return (
    <div>
      <CModal
        alignment="center"
        visible={showDetail}
        onClose={() => setShowDetail(false)}>
        <CModalHeader>
          <CModalTitle>{t('searchdetailbtn-production')}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CInputGroup className="mb-3">
            <CCol>
              <CFormLabel>{t('pbbillcolumn1-pbbillrec')}</CFormLabel>
            </CCol>
            <CFormInput
              id="BillID_input"
              size="sm"
              value={Data.BillID}
              disabled />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CCol>
              <CFormLabel>{t('pbbillcolumn2-pbbillrec')}</CFormLabel>
            </CCol>
            <CFormInput
              id="BillYM_input"
              size="sm"
              value={Data.BillYM}
              disabled />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CCol>
              <CFormLabel>{t('pbmanagecolumn1-pbmanage')}</CFormLabel>
            </CCol>
            <CFormInput
              id="ProdSN_input"
              size="sm"
              value={Data.ProdSN}
              disabled />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CCol>
              <CFormLabel>{t('pbbillcolumn4-pbbillrec')}</CFormLabel>
            </CCol>
            <CFormInput
              id="Total_input"
              size="sm"
              value={Data.Total}
              disabled />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            variant="outline"
            onClick={PayBtn}
          >
            {t('pbbillmodalpaybtn-pbbillrec')}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}
