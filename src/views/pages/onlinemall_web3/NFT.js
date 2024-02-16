import { cilHandPointUp } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CAlert, CButton, CCard,
  CCardBody, CCardFooter, CCardHeader, CCardImage, CCardText, CCardTitle, CCol,
  CContainer, CModal, CModalBody, CModalHeader,
  CModalTitle, CRow
} from "@coreui/react";
import { Fragment, useEffect, useState } from "react";
import { WaitSpinner } from 'src/components/Waiting';
import Pagination from 'src/components/pagination/Pagination';
import { pageTopScroll } from "src/utils";
import { SearchBuyableNFTListAPI } from "src/webAPI/assetsAPI";
import { dctw_to_nft_api } from "src/webAPI/exchangeAPI";
import { _web3, contractCls, get_currentAccount, provider } from "../../../web3/tools";
import { useTranslation } from "react-i18next";

export default function NFT(props) {
  // 翻譯用hook
  const { t } = useTranslation();

  const [buyableNFT, setBuyableNFT] = useState([]);
  const [buyNFTtokenID, setBuyNFTtokenID] = useState("");
  const [buyNFTamount, setBuyNFTamount] = useState(0);

  const [showBuy, setShowBuy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [reloadList, setReloadList] = useState(false);

  // Pagination 按鈕操作
  const [showPerPage, setShowPerPage] = useState(9);  // 資料一頁顯示多少個
  const [nowPage, setNowPage] = useState(1);  // 現在是顯示第幾頁的資料
  // Pagination 按鈕操作

  // Pagination 按鈕操作(上/下一頁)
  function PreNexPage(nowBtnName, totalPage_array) {
    if (nowBtnName === "«") {
      if (nowPage !== 1) {
        setNowPage(nowPage - 1)
        pageTopScroll()
      }
    } else if (nowBtnName === "»") {
      if (nowPage !== totalPage_array.length) {
        setNowPage(nowPage + 1)
        pageTopScroll()
      }
    }
  }

  // Pagination 按鈕操作(直接點擊數字頁數)
  const numChangePage = (pageNumber) => setNowPage(pageNumber)

  // Pagination 按鈕操作(資料顯示指定的數量)
  const indexLastShow = nowPage * showPerPage;
  const indexFirstShow = indexLastShow - showPerPage;
  const nowShow = buyableNFT.slice(indexFirstShow, indexLastShow)

  // let pic = {'2D電影票券': D2, '3D電影票券': D3, '超商咖啡券': coffee_711}

  function BuyNFT(tokenID, amount) {
    setBuyNFTtokenID(tokenID);
    setBuyNFTamount(amount);
    setShowBuy(!showBuy);
  }

  useEffect(() => {
    // fetch BuyableNFTList
    setLoading(true);
    setBuyableNFT([]);
    setBuyNFTtokenID("");
    setBuyNFTamount(0);
    setShowBuy(false);

    // clear err msg
    setErrormsg("");
    setShowErrorMsg(false)

    SearchBuyableNFTListAPI().then((result) => {
      if (result.rCode == "0001") {
        setBuyableNFT(result.data)
        setLoading(false);
      } else {
        setErrormsg(result.rCodeDesc);
        setLoading(false);
        setShowErrorMsg(true)
        return;
      }
    })
  }, [reloadList])

  const buyBtnHandler = async () => {
    console.log(buyNFTtokenID);
    console.log(buyNFTamount);

    // 讀取合約資料
    let contractInfo = await contractCls.init();
    let DCTW_ADDRESS = contractInfo.DCTW_ADDRESS;
    let DCTW_ABI = contractInfo.DCTW_ABI;

    let _w3 = await _web3.init(provider.metamask);
    _w3.contractAddr = DCTW_ADDRESS;
    _w3.contractABI = DCTW_ABI

    let currentAccount = (await get_currentAccount())[0]
    let contract_inst = await _w3.getContractInst();
    let receiver = await _w3.toCheckSum(_w3.Company);
    let sender = await _w3.toCheckSum(currentAccount);
    let amount = await _w3.toWei(buyNFTamount.toString());

    let tx = await contract_inst.methods.transfer(receiver, amount).send({ from: sender, value: String(0) });

    // 取tx_receipt 傳後端
    let transactionHash = tx.transactionHash;
    let api = new dctw_to_nft_api();
    api.DCTW_transactionID = transactionHash;
    api.tokenID = buyNFTtokenID;
    let result = await api.do_api();

    console.log(result);
    alert("complete buying");
    setReloadList(!reloadList);
  }

  return (
    <div>
      <CContainer>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>{t('onlinemallnft-web3nft')}</CCardHeader>
              <CCardBody>
                <CAlert
                  color="danger"
                  dismissible
                  visible={showErrorMsg}
                  onClose={() => setShowErrorMsg(false)}
                  style={{ marginTop: "30px" }}
                >
                  {errormsg}
                </CAlert>
                {
                  loading ?
                    (
                      <div style={{ marginBottom: "30px", marginTop: "40px" }}>
                        <WaitSpinner></WaitSpinner>
                      </div>
                    ) :
                    (
                      <>
                        <CRow>
                          {
                            nowShow.map((nft, idx) => {
                              return (
                                <Fragment key={idx + 1}>
                                  <CCard style={{ width: '15rem', margin: "30px", marginRight: "15px" }}>
                                    <CCardImage orientation="top" src={nft['IMAGE']} />
                                    <CCardBody>
                                      <CCardTitle>{t('onlinemalltitle-web3nft')} :<br />{nft["MoreDetail"]['NAME']}</CCardTitle>
                                      <CCardText>
                                        {t('prodmodaltitle5-production')} : {nft["DENOMINATION"]} DCTW<br />
                                        {t('prodmodaltitle2-production')} : {nft["PRICE"]} DCTW<br />
                                        {t('nftmodaltitle4-assets')} : {nft['RELEASE_DATE']}<br />
                                        {t('nftmodaltitle5-assets')} : {nft["DEADLINE"]}<br />
                                        {/* 數量 : {nft['count']} 張 */}
                                      </CCardText>
                                    </CCardBody>
                                    <CCardFooter>
                                      <CButton
                                        color="info"
                                        variant="outline"
                                        onClick={() => {
                                          BuyNFT(nft["TOKEN_ID"], nft["PRICE"])
                                        }}
                                      >
                                        {t('buy-sidebartitle')}
                                      </CButton>
                                    </CCardFooter>
                                  </CCard>
                                </Fragment>
                              )
                            })
                          }
                        </CRow>
                        <p></p>
                        <Pagination
                          perPage={showPerPage}
                          totalPost={buyableNFT.length}
                          PreNext={PreNexPage}
                          numchange={numChangePage} />
                        <p style={{ marginBottom: "30px" }}></p>
                      </>
                    )
                }
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CModal
          alignment="center"
          visible={showBuy}
          onClose={() => setShowBuy(false)}
        >
          <CModalHeader>
            <CModalTitle>{t('onlinemallmodaltitle-web3nft')}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <h4>{t('onlinemallmodaltext1-web3nft')}</h4>
            <p>
              <CButton
                color="info"
                variant="outline"
                onClick={() => { buyBtnHandler() }}
              >
                <CIcon icon={cilHandPointUp} size="lg" /> {t('onlinemallmodaltext1-web3nft')}
              </CButton>
            </p>
            <hr />
            <h4>{t('onlinemallmodaltext2-web3nft')}</h4>
            <p>
              {t('onlinemallmodaltext3-web3nft')} :<br />{t('Companyname')}
            </p>
            <p>
              {t('addressinput')} :<br />{t('onlinemalladdress-mainprod')}
            </p>
            <p>
              {t('emailinput')} :<br />info@Company.com
            </p>
          </CModalBody>
        </CModal>
      </CContainer>
      <p style={{ marginBottom: "20px" }}></p>
    </div>
  );
}