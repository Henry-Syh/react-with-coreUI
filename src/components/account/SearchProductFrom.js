import { 
  CContainer,
  CRow,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormInput,
  CAlert,
} from '@coreui/react'

import { useState, useEffect, Fragment } from "react";
import { WaitSpinner } from 'src/components/Waiting'
import Pagination from 'src/components/pagination/Pagination'
import { pageTopScroll } from "src/utils";
import { 
  SearchPersonalAssetsListAPI, 
  SearchProductDetailAPI, 
  SearchPersonalTransListAPI, 
  SearchTransDetailAPI} from "src/webAPI/productionAPI";

import { useTranslation } from "react-i18next";

export default function SearchProductFrom() {
  // 翻譯用hook
  const { t } = useTranslation();

  const [errormsg, setErrormsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchAssetsBtnOn, setSearchAssetsBtnOn] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [assetsColumn, setAssetsColumn] = useState([]);
  const [personalassetslist, setPersonalAssetsList] = useState([]);
  const [proddetailTitle, setProdDetailTitle] = useState([]);
  const [prodDetailValue, setProductDetailValue] = useState([]);
  const [transColumn, setTransColumn] = useState([]);
  const [personaltranslist, setPersonalTransList] = useState([]);
  const [transdetailTitle, setTransDetailTitle] = useState([]);
  const [transDetailValue, setTransDetailValue] = useState([]);

  // Pagination 按鈕操作
  const [showPerPage, setShowPerPage] = useState(10);
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

  useEffect(() => {
    setAssetsColumn(["#", t('prodcolumntitle1-production'), 
                    t('prodcolumntitle2-production'), t('prodcolumntitle3-production'),
                    t('searchdetailbtn-production')])
    setTransColumn(["#", t('prodcolumntitle4-production'),
                  t('prodcolumntitle2-production'), t('searchdetailbtn-production')])
  });


  async function SearchProdAssetsList() {
    // fetchProdAssetsData
    setIsSearch(true);
    setLoading(true);

    let assetsList = await SearchPersonalAssetsListAPI()
    if (assetsList.rCode == "0001") {
      setPersonalAssetsList(assetsList.data)

      setLoading(false);
      setAssetsColumn(["#", t('prodcolumntitle1-production'), 
                      t('prodcolumntitle2-production'), t('prodcolumntitle3-production'),
                      t('searchdetailbtn-production')])
    } else {
      setErrormsg(assetsList.rCodeDesc + "\n" + assetsList.msg);
      setLoading(false); 
      setShowErrorMsg(true);
    }
    
  }

  async function SearchProdDetail(prodID) {
    let proddetail = await SearchProductDetailAPI(prodID);

    setProdDetailTitle(Object.keys(proddetail.data))
    setProductDetailValue(Object.values(proddetail.data))
    setShowDetail(!showDetail)
  }

  async function SearchTransList() {
    // fetchTransData
    setIsSearch(true);
    setLoading(true);

    let transList = await SearchPersonalTransListAPI();
    if (transList.rCode == "0001") {
      setPersonalTransList(transList.data)

      setLoading(false);
      setTransColumn(["#", t('prodcolumntitle4-production'),
                    t('prodcolumntitle2-production'), t('searchdetailbtn-production')])
    } else {
      setErrormsg(transList.rCodeDesc + "\n" + transList.msg);
      setLoading(false); 
      setShowErrorMsg(true);
    }
    
  }

  async function SearchTransDetail(tradeSN) {
    // fetchTransDetailData
    let transdetail = await SearchTransDetailAPI(tradeSN);

    setTransDetailTitle(Object.keys(transdetail.data))
    setTransDetailValue(Object.values(transdetail.data))
    setShowDetail(!showDetail)
  };

  return (
    <CContainer>
      <CRow xs={{ gutterX: 5 }}>
        <CCol>
          <div id="SearchProdAssets" className="text-center">
            <CButton
              id="SearchProdAssets_Btn"
              style={{ marginBottom: "10px",marginTop: "10px"}}
              variant="outline"
              onClick={() => {
                setSearchAssetsBtnOn(true);
                SearchProdAssetsList();
              }}
            >
              {t('searchprodbtn-production')}
            </CButton>
            </div>
        </CCol>
        <CCol>
          <div id="SearchProdTransaction" className="text-center">
            <CButton
              id="SearchProdTransaction_Btn"
              style={{ marginBottom: "10px",marginTop: "10px"}}
              variant="outline"
              onClick={() => {
                setSearchAssetsBtnOn(false)
                SearchTransList();
              }}
            >
              {t('searchtranbtn-production')}
            </CButton>
          </div>
        </CCol>
      </CRow>
      {
        isSearch ? 
        (
          <CRow>
            <div className="text-center" style={{ marginBottom: "30px",marginTop: "40px"}}>
              <h5 className='bg-light'>{t('searchtext1-production')}</h5>
              <CAlert 
                color="danger" 
                dismissible 
                visible={showErrorMsg} 
                onClose={() => setShowErrorMsg(false)}
                style={{ marginTop: "30px"}}
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
                  <div style={{ marginBottom: "30px",marginTop: "40px"}}>
                    <table className="table table-bordered">
                      <thead className="table-info">
                        <tr>
                          {
                            searchAssetsBtnOn ? 
                            (
                              assetsColumn.map((columnName, idx) => {
                                return (
                                  <Fragment key={idx + 1}>
                                    <th scope="col">{columnName}</th>
                                  </Fragment>
                                )
                              })
                            ) : 
                            (
                              transColumn.map((columnName, idx) => {
                                return (
                                  <Fragment key={idx + 1}>
                                    <th scope="col">{columnName}</th>
                                  </Fragment>
                                )
                              })
                            )
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {
                          searchAssetsBtnOn ?
                          (
                            personalassetslist.slice(indexFirstShow, indexLastShow).map((assets, idx) => {
                              return (
                                <Fragment key={idx + 1}>
                                  <tr>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{assets['ASSETS_PRODUCTIONSN']}</td>
                                    <td>{assets['ASSETS_PRODUCTNAME']}</td>
                                    <td>{assets['ASSETS_AMOUNT']}</td>
                                    <td>
                                      <button
                                        type="button" 
                                        className="btn btn-outline-info"
                                        onClick={() => {
                                          SearchProdDetail(assets['ASSETS_PRODUCTID'])
                                        }}
                                      >
                                        {t('searchdetailbtn-production')}
                                      </button>
                                    </td>
                                  </tr>
                                </Fragment>
                              )
                            })
                          ) :
                          (
                            personaltranslist.slice(indexFirstShow, indexLastShow).map((trans, idx) => {
                              return (
                                <Fragment key={idx + 1}>
                                  <tr>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{trans['TRADE_SN']}</td>
                                    <td>{trans['PRODUCTION_NAME']}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-outline-info"
                                        onClick={() => {
                                          SearchTransDetail(trans['TRADE_SN'])
                                        }}
                                      >
                                        {t('searchdetailbtn-production')}
                                      </button>
                                    </td>
                                  </tr>
                                </Fragment>
                              )
                            })
                          )
                        }
                      </tbody>
                    </table>
                    {/* 導入分頁component元件 */}
                    {
                      searchAssetsBtnOn ?
                      (
                        <Pagination 
                          perPage={showPerPage} 
                          totalPost={personalassetslist.length} 
                          PreNext={PreNexPage}
                          numchange={numChangePage}/>
                      ) : 
                      (
                        <Pagination 
                          perPage={showPerPage} 
                          totalPost={personaltranslist.length} 
                          PreNext={PreNexPage}
                          numchange={numChangePage}/>
                      )
                    }
                  </div>
                )
              }
            </div>
            {/* show detail */}
            <CModal
              visible={showDetail}
              onClose={() => setShowDetail(false)}
            >
              <CModalHeader>
                <CModalTitle>
                  {t('searchdetailbtn-production')}
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                {
                  searchAssetsBtnOn ? 
                  (
                    proddetailTitle.map((titleName, idx) => {
                      if (prodDetailValue[1] == 'ComputingPower') {
                        var showData = [
                          'PRODUCTION_NAME', 'PRODUCTION_PRICE', 'ISSUED',
                          'NFT_NAME', 'DENOMINATION', 'INTEREST'
                        ]
                        if (showData.includes(titleName)) {
                          switch (titleName) {
                            case 'PRODUCTION_NAME': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle1-production')} : {prodDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'PRODUCTION_PRICE': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle2-production')} : {prodDetailValue[idx]} TWD</div>
                                </Fragment>
                              )
                            }
                            case 'ISSUED': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle3-production')} : {prodDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'NFT_NAME': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle4-production')} : {prodDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'DENOMINATION': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle5-production')} : {prodDetailValue[idx]} DCTW</div>
                                </Fragment>
                              )
                            }
                            case 'INTEREST': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle6-production')} : {prodDetailValue[idx]} %</div>
                                </Fragment>
                              )
                            }
                          }
                        }
                      } else if (prodDetailValue[1] == 'PowerStation') {
                        var showData = [
                          'PRODUCTION_NAME', 'PRODUCTION_PRICE', 'TOTAL_ENERGY',
                          'NOW_ENERGY', 'OUTPUT_POWER', 'OPERATE_DURABILITY',
                          'EQUITMENT_DATA'
                        ]
                        if (showData.includes(titleName)) {
                          switch (titleName) {
                            case 'PRODUCTION_NAME': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle7-production')} : {prodDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'PRODUCTION_PRICE': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle2-production')} : {prodDetailValue[idx]} TWD</div>
                                </Fragment>
                              )
                            }
                            case 'TOTAL_ENERGY': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle8-production')} : {prodDetailValue[idx]} kw</div>
                                </Fragment>
                              )
                            }
                            case 'NOW_ENERGY': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle9-production')} : {prodDetailValue[idx]} kw/h</div>
                                </Fragment>
                              )
                            }
                            case 'OUTPUT_POWER': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle10-production')} : {prodDetailValue[idx]} W</div>
                                </Fragment>
                              )
                            }
                            case 'OPERATE_DURABILITY': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle11-production')} : {prodDetailValue[idx]} Days/per</div>
                                </Fragment>
                              )
                            }
                            case 'EQUITMENT_DATA': {
                              return (
                                <Fragment key={idx + 1}>
                                  <p></p>
                                  <div>{t('prodmodaltitle12-production')}:</div>
                                  <div>{t('prodmodaltitle13-production')} = {prodDetailValue[idx]['L']} m</div>
                                  <div>{t('prodmodaltitle14-production')} = {prodDetailValue[idx]['W']} m</div>
                                  <div>{t('prodmodaltitle15-production')} = {prodDetailValue[idx]['H']} m</div>
                                  <div>{t('prodmodaltitle16-production')} = {prodDetailValue[idx]['Volume']} m^3</div>
                                  <div>{t('prodmodaltitle17-production')} = {prodDetailValue[idx]['Weight']} kg</div>
                                </Fragment>
                              )
                            }
                          }
                        }
                      }
                    })
                  ) : 
                  (
                    transdetailTitle.map((titleName, idx) => {
                      if (transDetailValue[3] == 'ComputingPower') {
                        var showData = [
                          'TRADE_SN', 'PRODUCTION_SN', 'BUY_TIME', 'ACCOUNT_NAME',
                          'PRODUCTION_NAME', 'AMOUNT'
                        ]
                        if (showData.includes(titleName)) {
                          switch (titleName) {
                            case 'PRODUCTION_NAME': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle1-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'TRADE_SN': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('tracmodaltitle1-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'PRODUCTION_SN': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('tracmodaltitle2-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'BUY_TIME': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('tracmodaltitle3-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'ACCOUNT_NAME': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('tracmodaltitle4-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'AMOUNT': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodcolumntitle3-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                          }
                        }
                      } else if (transDetailValue[3] == 'PowerStation') {
                        var showData = [
                          'TRADE_SN', 'PRODUCTION_SN', 'BUY_TIME', 'ACCOUNT_NAME',
                          'PRODUCTION_NAME', 'AMOUNT'
                        ]
                        if (showData.includes(titleName)) {
                          switch (titleName) {
                            case 'PRODUCTION_NAME': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodmodaltitle7-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'TRADE_SN': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('tracmodaltitle1-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'PRODUCTION_SN': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('tracmodaltitle2-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'BUY_TIME': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('tracmodaltitle3-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'ACCOUNT_NAME': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('tracmodaltitle4-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                            case 'AMOUNT': {
                              return (
                                <Fragment key={idx + 1}>
                                  <div>{t('prodcolumntitle3-production')} : {transDetailValue[idx]}</div>
                                </Fragment>
                              )
                            }
                          }
                        }
                      }
                    })
                  )
                }
              </CModalBody>
            </CModal>
          </CRow>
        ) : null
      }
    </CContainer>
  )
}