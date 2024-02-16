import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CContainer, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { Fragment, useEffect, useState } from "react";
import { ErrorMessage_new } from "../../../components/Message";
import { WaitSpinner } from "../../../components/Waiting";
import { numberUtils } from "../../../utils";
import { btc_api } from "../../../webAPI/exchangeAPI";
import { quotationAPI } from "../../../webAPI/quotationAPI";
import { getWalletAPI } from "../../../webAPI/walletAPI";
import { useTranslation } from "react-i18next";

export default function Exchange(props) {
    // 翻譯用hook
    const { t } = useTranslation();

    const [lowestBTC, setLowestBTC] = useState(0.00001);

    const [quotationLive, setQuotationLive] = useState('None');
    const [exchangeBTC, setExchangeBTC] = useState('');
    const [exchangeDCTW, setExchangeDCTW] = useState('');
    const [newBTCAmount, setNewBTCAmount] = useState(0);
    const [userWalletsList, setUserWalletsList] = useState({ BTC: [], ETH: [] });
    const [liveQuoPrecision, setLiveQuoPrecision] = useState(0);
    const [exchangeRedisKey, setExchangeRedisKey] = useState('');

    const [btcwalletSelect, setBtcwalletSelect] = useState('');
    const [ethwalletSelect, setEthwalletSelect] = useState('');
    const [btcphraseInput, setBtcphraseInput] = useState('');

    const [loading, setLoading] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalErrMsg, setModalErrMsg] = useState('');
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);
    const [showExchangeSpinner, setShowExchangeSpinner] = useState(false)

    useEffect(() => {


        liveQuotation();
        // 取即時報價

        fetchUserWallet();
        // 取user錢包資訊


    }, [])

    async function liveQuotation() {
        setLoading(true);

        let resultData = await quotationAPI.fetch_current_all_quotation_API();

        if (resultData.rCode != '0001') {
            alert(resultData.rCodeDesc);
        } else {
            let BTCtoUSD_quotation = resultData.data.find(x => x.CURRENCY == 'BTC-USD')['QUOTATION']['quo'];
            let USDtoTWD_quotation = resultData.data.find(x => x.CURRENCY == 'USD-TWD')['QUOTATION']['quo'];

            // 判斷小數點位數，運算完選擇保留位數
            let BTCtoUSD_precision = BTCtoUSD_quotation.toString().split(".").length == 1 ? 0 : BTCtoUSD_quotation.toString().split(".")[1].length
            let USDtoTWD_precision = USDtoTWD_quotation.toString().split(".").length == 1 ? 0 : USDtoTWD_quotation.toString().split(".")[1].length
            let liveRate = (BTCtoUSD_quotation * USDtoTWD_quotation).toFixed(BTCtoUSD_precision + USDtoTWD_precision);

            setQuotationLive(liveRate);
            setLiveQuoPrecision(BTCtoUSD_precision + USDtoTWD_precision);
        }
        setLoading(false);
    }

    async function fetchUserWallet() {
        let walletData = await getWalletAPI();

        if (walletData.rCode != '0001') {
            alert(walletData.rCodeDesc);
        } else {
            let userBTCwalletList = walletData.data.filter(x => x.CATE == "BTC" && x.ENABLE);
            let userETHwalletList = walletData.data.filter(x => x.CATE == "ETH" && x.ENABLE);
            walletData = { BTC: userBTCwalletList, ETH: userETHwalletList };

            setUserWalletsList(walletData);
        }
    }

    async function btcValHandler(value) {
        if (value == '') return;
        else {

            let value_precision = value.toString().split('.').length == 1 ? 0 : value.toString().split('.')[1].length;

            let dctwPrice = (value * quotationLive).toFixed(liveQuoPrecision + value_precision);

            setExchangeBTC(value);
            setExchangeDCTW(dctwPrice);
        }
    }

    async function dctwValHandler(value) {
        if (value == '') return;
        else {

            let btcPrice = numberUtils.round(value / quotationLive, 8);

            setExchangeBTC(btcPrice);
            setExchangeDCTW(value);
        }
    }

    async function exchangeBtnHandler() {

        if (exchangeDCTW == '' || exchangeDCTW <= 0) {
            alert(t('onlinemallexchangeerror1-web3exchange'));
            return;
        }
        else if (exchangeBTC < lowestBTC) {
            alert(t('onlinemallexchangeerror2-web3exchange', {lowest_BTC: lowestBTC}));
            return;
        }

        setShowExchangeSpinner(true);

        // 換匯api比對網頁匯率，並讓使用者確認
        let resultData = await quotationAPI.fetch_BTCtoDCTWQt_API(exchangeDCTW);

        if (resultData.rCode != '0001') {
            alert(resultData.rCodeDesc);
        } else {
            setExchangeRedisKey(resultData.data.ID);
            setNewBTCAmount(resultData.data.BTC_Amount);
            setVisibleModal(!visibleModal);
            setShowExchangeSpinner(false);
        }

    }

    async function modalCancelHandler() {
        await initailState();
    }

    async function modalSubmitHandler() {

        // 檢查所有參數
        if (btcwalletSelect == '') {
            setModalErrMsg(t('onlinemallexchangeerror3-web3exchange'));
            setErrorMessageVisible(true);
        }
        else if (btcphraseInput == '') {
            setModalErrMsg(t('onlinemallexchangeerror4-web3exchange'));
            setErrorMessageVisible(true);
        }
        else if (ethwalletSelect == '') {
            setModalErrMsg(t('onlinemallexchangeerror5-web3exchange'));
            setErrorMessageVisible(true);
        }
        else {
            setLoading(true);


            // 沒錯誤執行換匯
            let apiParam = {
                exchangeRate_id: exchangeRedisKey,
                BTC_fromAddr: btcwalletSelect,
                BTC_fromPassphrass: btcphraseInput,
                BTC_amount: newBTCAmount,

                DCTW_toAddr: ethwalletSelect,
                DCTW_amount: exchangeDCTW
            }
            let resultData = await btc_api.exchangeBTCtoDCTW(apiParam);
            if (resultData.rCode != '0001') {
                alert(`${resultData.rCodeDesc}(${resultData.data})`);
            }
            alert(t('onlinemallexchangecomplete-web3exchange'));
            await initailState();

        }

    }

    async function initailState() {
        await liveQuotation();

        setExchangeBTC('');
        setExchangeDCTW('');
        setNewBTCAmount(0);
        setLiveQuoPrecision(0);
        setExchangeRedisKey('');

        setBtcwalletSelect('');
        setEthwalletSelect('');
        setBtcphraseInput('');

        setVisibleModal(false);
        setErrorMessageVisible(false);
        setModalErrMsg('');
        setShowExchangeSpinner(false);
    }

    return (
        <>
            <h4>{t('Web3-exchange-sidebar')}</h4>
            <hr />
            {
                loading ?
                    (
                        <div className="loader-container">
                            <div className="spinner"></div>
                        </div>
                    )
                    :
                    (
                        <div>
                            <CCard>
                                <CCardHeader className="text-center">{t('onlinemallexchangetext1-web3exchange', {quotation_Live: quotationLive})}</CCardHeader>
                                <CCardBody>

                                    <CContainer className="text-center">
                                        <CRow>
                                            <CCol sm={3} className="bg-light p-3 border">
                                                <CFormInput type="number" id="btc" value={exchangeBTC} onChange={(e) => btcValHandler(e.target.value)} />
                                            </CCol>
                                            <CCol sm={2} className="bg-light p-3 border">
                                                BTC
                                                <br />
                                                {t('onlinemallexchangetext2-web3exchange', {lowest_BTC: lowestBTC})}
                                            </CCol>
                                            <CCol sm={2} className="bg-light p-3 border">
                                                ➜
                                            </CCol>
                                            <CCol sm={3} className="bg-light p-3 border">
                                                <CFormInput type="number" id="dctw" value={exchangeDCTW} onChange={(e) => dctwValHandler(e.target.value)} />
                                            </CCol>
                                            <CCol sm={2} className="bg-light p-3 border">
                                                DCTW
                                            </CCol>
                                        </CRow>
                                    </CContainer>

                                </CCardBody>
                                <CCardFooter className="text-medium-emphasis">

                                    {showExchangeSpinner ?

                                        (<WaitSpinner></WaitSpinner>)
                                        :
                                        (<CButton onClick={exchangeBtnHandler} color="primary" variant="outline">{t('onlinemallexchangebtn1-web3exchange')}</CButton>)
                                    }

                                </CCardFooter>
                            </CCard>

                            <CModal size="lg" visible={visibleModal} onClose={modalCancelHandler}>
                                <CModalHeader>
                                    <CModalTitle>{t('onlinemallexchangebtn1-web3exchange')}</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <CContainer>
                                        <ErrorMessage_new msg={modalErrMsg} visible={errorMessageVisible} setVisible={setErrorMessageVisible}></ErrorMessage_new>
                                        <div>
                                            {t('onlinemallexchangetext3-web3exchange', {newBTC_Amount: newBTCAmount, exchange_DCTW: exchangeDCTW})}
                                        </div>
                                        <hr />
                                        <div>
                                            {t('onlinemallexchangetext4-web3exchange')}
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>{t('onlinemallexchangetext5-web3exchange')}</CInputGroupText>
                                                <CFormSelect id="BTCwallet" onChange={e => setBtcwalletSelect(e.target.value)}>
                                                    <option>-- {t('onlinemallexchangeselectdefalut-web3exchange')} --</option>
                                                    {
                                                        userWalletsList.BTC.map((walletInfo, idx) => {
                                                            return (
                                                                <Fragment key={idx}>
                                                                    <option value={walletInfo.ADDRESS}>{walletInfo.ADDRESS}</option>:
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                </CFormSelect>
                                                <CFormInput aria-label="phrase_key" placeholder="phrase_key" onChange={(e) => setBtcphraseInput(e.target.value)} />
                                            </CInputGroup>
                                        </div>
                                        <div>
                                            {t('onlinemallexchangetext6-web3exchange')}
                                            <CInputGroup className="mb-3">
                                                <CFormSelect id="DCTWwallet" onChange={e => setEthwalletSelect(e.target.value)}>
                                                    <option>-- {t('onlinemallexchangeselectdefalut-web3exchange')} --</option>
                                                    {
                                                        userWalletsList.ETH.map((walletInfo, idx) => {
                                                            return (
                                                                <Fragment key={idx}>
                                                                    <option value={walletInfo.ADDRESS}>{walletInfo.ADDRESS}</option>:
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                </CFormSelect>
                                            </CInputGroup>
                                        </div>
                                    </CContainer>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton onClick={modalSubmitHandler}>{t('onlinemallexchangebtn2-web3exchange')}</CButton>
                                    <CButton onClick={modalCancelHandler}>{t('onlinemallexchangebtn3-web3exchange')}</CButton>
                                </CModalFooter>
                            </CModal>

                        </div>
                    )
            }

        </>
    );
}