import { 
  CCard, 
  CCardBody, 
  CCol, 
  CContainer, 
  CRow, 
  CCardHeader,
  CCardTitle,
  CCardText,
  CCardImage,
  CButton,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody, 
  CModalFooter,
  CPopover,
  CAlert} from "@coreui/react";

import T1 from 'src/assets/images/onlineMall/1t.jpg'
import T2 from 'src/assets/images/onlineMall/2t.jpg'
import T3 from 'src/assets/images/onlineMall/3t.jpg'
import T4 from 'src/assets/images/onlineMall/4t.jpg'
import T5 from 'src/assets/images/onlineMall/5t.jpg'
import PSjpg from 'src/assets/images/onlineMall/powerstation.jpg'

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, Fragment } from "react";
import { WaitSpinner } from 'src/components/Waiting'
import Pagination from 'src/components/pagination/Pagination'
import { pageTopScroll } from "src/utils";
import { SearchProductListAPI, SearchProductDetailAPI } from "src/webAPI/productionAPI";
import { useTranslation } from "react-i18next";

export default function OnlineMall() {
  // // 線上購買的訂單list
  // const dispatch = useDispatch();
  // const orderList = useSelector((state) => state.orderList);
  // // 線上購買的訂單list

  // 翻譯用hook
  const { t } = useTranslation();

  const [showDetail, setShowDetail] = useState(false);
  const [searchCPBtnOn, setSearchCPBtnOn] = useState(false);
  const [productdata, setProductdata] = useState([]);
  const [detailtitle, setDetailTitle] = useState([]);
  const [detailvalue, setDetailValue] = useState();
  const [buyamount, setBuyAmount] = useState("1");

  const [loading, setLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  // Pagination 按鈕操作
  const [showPerPage, setShowPerPage] = useState(6);
  const [nowPage, setNowPage] = useState(1);
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

  let pic = [T1, T2, T3, T4, T5]

  async function getProductionData(type) {
    setLoading(true);

    // clear err msg
    setErrormsg("");
    setShowErrorMsg(false)

    setProductdata([])
    
    SearchProductListAPI(type).then((result) => {
      if (result.rCode == "0001") {
        setProductdata(result.data)
        setLoading(false);
      } else {
        setErrormsg(result.rCodeDesc);
        setLoading(false); 
        setShowErrorMsg(true)
        return;
      }
    })
  }

  async function SearchProdDetail(prodID) {
    let detail = await SearchProductDetailAPI(prodID)
    setDetailTitle(Object.keys(detail.data))
    setDetailValue(Object.values(detail.data))

    setShowDetail(!showDetail)
  }

  // 線上購買流程
  async function BuyProd() {
    let price = parseInt(`${detailvalue[2]}`) * buyamount
    let newOrder = {"BuyProdName": `礦機算力: ${detailvalue[1]}`,
                    "Amount": buyamount,
                    "Price": price}

    // dispatch({
    //   type: "BUY",
    //   orderList: orderList.push(newOrder)
    // });
    
    setBuyAmount(1)
    setShowDetail(false)
  }

  // useEffect(() => {
  //   getProductionData();
  // }, [])

  return (
    <>
      <div className="border bg-light text-center">
        <CRow xs={{ gutterX: 5 }}>
          <CCol>
            <div id="SearchCP" className="text-center">
              <CButton
                id="SearchCP_Btn"
                style={{ marginBottom: "10px",marginTop: "10px"}}
                variant="outline"
                onClick={() => {
                  setSearchCPBtnOn(true);
                  getProductionData('ComputingPower');
                }}
              >
                {t('onlinemallbtn1-mainprod')}
              </CButton>
              </div>
          </CCol>
          <CCol>
            <div id="SearchPS" className="text-center">
              <CButton
                id="SearchPS_Btn"
                style={{ marginBottom: "10px",marginTop: "10px"}}
                variant="outline"
                onClick={() => {
                  setSearchCPBtnOn(false);
                  getProductionData('PowerStation');
                }}
              >
                {t('onlinemallbtn2-mainprod')}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </div>
      <p style={{ marginBottom: "50px"}}></p>
      <CAlert
        color="danger"
        dismissible
        visible={showErrorMsg}
        onClose={() => setShowErrorMsg(false)}
      >
        {errormsg}
      </CAlert>
      {
        loading ?
        (
          <div style={{ marginBottom: "30px",marginTop: "40px"}}>
            <WaitSpinner></WaitSpinner>
          </div>
        ) :
        (
          <Fragment>
            <CRow className="justify-content-start">
            {
              searchCPBtnOn ?
              (
                <Fragment>
                  {productdata.map((product, idx) => {
                    // 一排顯示3個
                    if ((idx+1) % 3 === 0) {
                      return (
                        <Fragment key={idx + 1}>
                          <CCard style={{ width: '15rem' }}>
                            <CCardImage orientation="top" src={pic[idx]} />
                              <CCardBody>
                                <CCardTitle>{t('prodmodaltitle1-production')}: {product["PRODUCTION_NAME"]}</CCardTitle>
                                <CCardText>
                                  {t('onlinemalltext1-mainprod')}<br />{t('prodmodaltitle2-production')}: {product["PRODUCTION_PRICE"]} TWD
                                </CCardText>
                                <CButton
                                  color="info" 
                                  variant="outline"
                                  onClick={() => {
                                    SearchProdDetail(product["PRODUCTION_ID"])
                                  }}
                                  // style={{ marginLeft: "160px" }}
                                >
                                  {t('searchdetailbtn-production')}
                                </CButton>
                              </CCardBody>
                          </CCard>
                          <p style={{ marginBottom: "80px"}}></p>
                        </Fragment>
                      )
                    } else {
                      return (
                        <Fragment key={idx + 1}>
                          <CCard style={{ width: '15rem', marginRight: "130px", marginLeft: "13px" }}>
                            <CCardImage orientation="top" src={pic[idx]} />
                              <CCardBody>
                                <CCardTitle>{t('prodmodaltitle1-production')}: {product["PRODUCTION_NAME"]}</CCardTitle>
                                <CCardText>
                                  {t('onlinemalltext1-mainprod')}<br />{t('prodmodaltitle2-production')}: {product["PRODUCTION_PRICE"]} TWD
                                </CCardText>
                                <CButton
                                  color="info" 
                                  variant="outline"
                                  onClick={() => {
                                    SearchProdDetail(product["PRODUCTION_ID"])
                                  }}
                                  // style={{ marginLeft: "160px" }}
                                >
                                  {t('searchdetailbtn-production')}
                                </CButton>
                              </CCardBody>
                          </CCard>
                        </Fragment>
                      )
                    }
                  })}
                </Fragment>
              ) : 
              (
                <Fragment>
                  {productdata.map((product, idx) => {
                    // 一排顯示3個
                    if ((idx+1) % 3 === 0) {
                      return (
                        <Fragment key={idx + 1}>
                          <CCard style={{ width: '16rem' }}>
                            <CCardImage orientation="top" src={PSjpg} />
                              <CCardBody>
                                <CCardTitle>{t('onlinemallbtn2-mainprod')}:<br />{product["PRODUCTION_NAME"]}</CCardTitle>
                                <CCardText>
                                  {t('onlinemalltext2-mainprod')}<br />{t('prodmodaltitle2-production')}: {product["PRODUCTION_PRICE"]} TWD
                                </CCardText>
                                <CButton
                                  color="info" 
                                  variant="outline"
                                  onClick={() => {
                                    SearchProdDetail(product["PRODUCTION_ID"])
                                  }}
                                  // style={{ marginLeft: "180px" }}
                                >
                                  {t('searchdetailbtn-production')}
                                </CButton>
                              </CCardBody>
                          </CCard>
                          <p style={{ marginBottom: "80px"}}></p>
                        </Fragment>
                      )
                    } else {
                      return (
                        <Fragment key={idx + 1}>
                          <CCard style={{ width: '16rem', marginRight: "130px", marginLeft: "13px" }}>
                            <CCardImage orientation="top" src={PSjpg} />
                              <CCardBody>
                                <CCardTitle>{t('onlinemallbtn2-mainprod')}:<br />{product["PRODUCTION_NAME"]}</CCardTitle>
                                <CCardText>
                                  {t('onlinemalltext2-mainprod')}<br />{t('prodmodaltitle2-production')}: {product["PRODUCTION_PRICE"]} TWD
                                </CCardText>
                                <CButton
                                  color="info" 
                                  variant="outline"
                                  onClick={() => {
                                    SearchProdDetail(product["PRODUCTION_ID"])
                                  }}
                                  // style={{ marginLeft: "180px" }}
                                >
                                  {t('searchdetailbtn-production')}
                                </CButton>
                              </CCardBody>
                          </CCard>
                        </Fragment>
                      )
                    }
                  })}
                </Fragment>
              )
            }
            </CRow>
            <div style={{ marginTop: "20px" }}></div>
            <Pagination 
              perPage={showPerPage} 
              totalPost={productdata.length} 
              PreNext={PreNexPage}
              numchange={numChangePage}/>
          </Fragment>
        )
      }
      <CModal
        alignment="center"
        visible={showDetail}
        onClose={() => setShowDetail(false)}>
      <CModalHeader>
        <CModalTitle>{t('searchdetailbtn-production')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {
          searchCPBtnOn ?
          (
            detailtitle.map((titleName, idx) => {
              let showData = [
                'PRODUCTION_NAME', 'PRODUCTION_PRICE', 'ISSUED',
                'NFT_NAME', 'DENOMINATION', 'INTEREST'
              ]
              if (showData.includes(titleName)) {
                switch (titleName) {
                  case 'PRODUCTION_NAME': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle1-production')} : {detailvalue[idx]}</div>
                      </Fragment>
                    )
                  }
                  case 'PRODUCTION_PRICE': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle2-production')} : {detailvalue[idx]} TWD</div>
                      </Fragment>
                    )
                  }
                  case 'ISSUED': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle3-production')} : {detailvalue[idx]}</div>
                      </Fragment>
                    )
                  }
                  case 'NFT_NAME': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle4-production')} : {detailvalue[idx]}</div>
                      </Fragment>
                    )
                  }
                  case 'DENOMINATION': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle5-production')} : {detailvalue[idx]} DCTW</div>
                      </Fragment>
                    )
                  }
                  case 'INTEREST': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle6-production')} : {detailvalue[idx]} %</div>
                      </Fragment>
                    )
                  }
                }
              }
            })
          ) : 
          (
            detailtitle.map((titleName, idx) => {
              // 用來判斷要此次要顯示的項目
              let showData = [
                'PRODUCTION_NAME', 'PRODUCTION_PRICE', 'TOTAL_ENERGY',
                'NOW_ENERGY', 'OUTPUT_POWER', 'OPERATE_DURABILITY',
                'EQUITMENT_DATA'
              ]
              if (showData.includes(titleName)) {
                switch (titleName) {
                  case 'PRODUCTION_NAME': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle7-production')} : {detailvalue[idx]}</div>
                      </Fragment>
                    )
                  }
                  case 'PRODUCTION_PRICE': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle2-production')} : {detailvalue[idx]} TWD</div>
                      </Fragment>
                    )
                  }
                  case 'TOTAL_ENERGY': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle8-production')} : {detailvalue[idx]} kw</div>
                      </Fragment>
                    )
                  }
                  case 'NOW_ENERGY': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle9-production')} : {detailvalue[idx]} kw/h</div>
                      </Fragment>
                    )
                  }
                  case 'OUTPUT_POWER': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle10-production')} : {detailvalue[idx]} W</div>
                      </Fragment>
                    )
                  }
                  case 'OPERATE_DURABILITY': {
                    return (
                      <Fragment key={idx + 1}>
                        <div>{t('prodmodaltitle11-production')} : {detailvalue[idx]} Days</div>
                      </Fragment>
                    )
                  }
                  case 'EQUITMENT_DATA': {
                    return (
                      <Fragment key={idx + 1}>
                        <p></p>
                        <div>{t('prodmodaltitle12-production')}:</div>
                        <div>{t('prodmodaltitle13-production')} = {detailvalue[idx]['L']} m</div>
                        <div>{t('prodmodaltitle14-production')} = {detailvalue[idx]['W']} m</div>
                        <div>{t('prodmodaltitle15-production')} = {detailvalue[idx]['H']} m</div>
                        <div>{t('prodmodaltitle16-production')} = {detailvalue[idx]['Volume']} m^3</div>
                        <div>{t('prodmodaltitle17-production')} = {detailvalue[idx]['Weight']} kg</div>
                      </Fragment>
                    )
                  }
                }
              }
            })
          )
        }
      </CModalBody>
      <CModalFooter>
        {/* <label htmlFor="buyAmountInput" className="col-sm-2 col-form-label">Amount</label>
        <CFormInput
          type="number"
          id="buyAmountInput"
          value={buyamount}
          min="1"
          max="5"
          style={{ width: '8rem', marginRight: "25px" }}
          onChange={(e) => setBuyAmount(e.target.value)}>

        </CFormInput>
        <CButton
          color="info"
          variant="outline"
          onClick={() => {
            BuyProd()
          }}
        >
          Buy
        </CButton> */}
        <CPopover
          title={t('Companyname')}
          data-html="true"
          content={<span>{t('addressinput')}:<br/>{t('onlinemalladdress-mainprod')}<br/><br/>{t('emailinput')}:<br/>info@Company.com</span>}
          placement="top"
        >
          <CButton
            color="info"
            variant="outline"
          >
            {t('onlinemallcontractbtn-mainprod')}
          </CButton>
        </CPopover>
      </CModalFooter>
      </CModal>
    </>
  )
}