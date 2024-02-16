import { 
  CCard, 
  CCardBody, 
  CCol, 
  CContainer, 
  CRow, 
  CCardHeader,
  CButton,
  CAlert, 
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect} from "@coreui/react";

import { useState, useEffect, Fragment } from "react";
import { WaitSpinner } from 'src/components/Waiting'
import Pagination from 'src/components/pagination/Pagination'
import { pageTopScroll, JSXString } from "src/utils";
import { 
  SearchNFTListAPI,
  SearchNFTDetailAPI, } from "src/webAPI/assetsAPI";
import { ChkToken } from "src/components/Token";
import { useTranslation } from "react-i18next";


export default function Asset(props) {
  // 翻譯用hook
  const { t } = useTranslation();
  
  const [nftAssetsdata, setNftAssetsData] = useState([]);
  const [nftAssetsColumn, setNftAssetsColumn] = useState([]);
  const [detailtitle, setDetailTitle] = useState([]);
  const [detailvalue, setDetailValue] = useState('');

  const [loading, setLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

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
  const nowShow = nftAssetsdata.slice(indexFirstShow, indexLastShow)

  function uuidList(uuid, select_id) {
    // 製作所有相同NFT代碼的uuid list下拉選單
    // 並按照給予select不同id，供後續按下Detail直接獲取此select選擇的value去搜尋該uuid的詳細NFT
    return (
      <Fragment>
        <CFormSelect 
          className='p-2'
          id={select_id}
        >
          <option value="0">{t('uuidselect-assets')}</option>
          {
            uuid.map((uuid_, idx) => {
              return (
                <Fragment key={idx + 1}>
                  <option value={uuid_}>{uuid_}</option>
                </Fragment>
              )
            })
          }
        </CFormSelect>
      </Fragment>
    )
  }

  function SearchUUIDDetail(select) {

    // clear err msg
    setErrormsg("");
    setShowErrorMsg(false)
    let warningWord = "";

    // chk parameters
    if (select.value == "" || select.value == "0") warningWord += t('searcherror-assets');

    if (warningWord != "") {
      setErrormsg(warningWord);
      setShowErrorMsg(true)
      return;
    };

    SearchNFTDetailAPI(select.value).then((detail_result) => {
      setDetailTitle([])
      setDetailValue('')

      if (detail_result.rCode == "0001") {
        setDetailTitle(Object.keys(detail_result.data))
        setDetailValue(Object.values(detail_result.data))

        setShowDetail(!showDetail)
      } else {
        setErrormsg(detail_result.rCodeDesc + "\n" + detail_result.msg);
        setLoading(false); 
        setShowErrorMsg(true)
        return;
      }
    })
  }

  useEffect(() => {
    // fetch AssetsList
    setLoading(true);
    setNftAssetsData([]);
    setNftAssetsColumn([]);

    SearchNFTListAPI().then((result) => {
      if (result.rCode == "0001") {
        // setNftAssetsColumn(
        //   ['#', '實體產品衍生之NFT', '憑證類型', '面額', '數量', 'UUID列表', 'OPERATE']
        // )
        setNftAssetsData(result.data);
        setLoading(false);
        return;
      } else {
        setErrormsg(result.rCodeDesc);
        setLoading(false); 
        setShowErrorMsg(true)
        return;
      }
    })
  }, [])


  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="mx-3" style={{ width: '60rem' }}>
              <CCardHeader>{t('assetstitle-assets')}</CCardHeader>
              <CCardBody className="p-3">
                <CRow xs={{ gutterX: 5 }}>
                  <CCol style={{ marginLeft: "10px" }}>
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
                      <div style={{ marginBottom: "30px", marginTop: "30px"}}>
                        <table className="table table-bordered">
                          <thead className="table-info">
                            <tr>
                              {
                                [
                                  '#', t('nftassetstitle1-assets'), 
                                  t('prodmodaltitle4-production'), t('prodmodaltitle5-production'),
                                  t('prodcolumntitle3-production'), t('nftassetstitle2-assets'), 
                                  t('nftassetstitle3-assets')
                                ].map((columnName, idx) => {
                                  return (
                                    <Fragment key={idx + 1}>
                                      <th scope="col">{columnName}</th>
                                    </Fragment>
                                  )
                                })
                              }
                            </tr>
                          </thead>
                          <tbody>
                            {
                              nowShow.map((nft, idx) => {
                                return (
                                  <Fragment key={idx + 1}>
                                    <tr>
                                      <th scope="row">{idx + 1}</th>
                                      <td>{nft['Detail']['PRODUCTION_NAME']}</td>
                                      <td>{nft['Detail']['NAME']}</td>
                                      <td>{nft['DENOMINATION']}</td>
                                      <td>{nft['Amount']}</td>
                                      <td>{uuidList(nft['UUID'], 'UUID_Select'+idx+1)}</td>
                                      <td>
                                        <button
                                          type="button" 
                                          className="btn btn-outline-info"
                                          onClick={() => {
                                            SearchUUIDDetail(document.getElementById('UUID_Select'+idx+1))
                                          }}
                                        >
                                          {t('searchdetailbtn-production')}
                                        </button>
                                      </td>
                                    </tr>
                                  </Fragment>
                                )
                              })
                            }
                          </tbody>
                        </table>
                        {/* 導入分頁component元件 */}
                        <Pagination 
                          perPage={showPerPage} 
                          totalPost={nftAssetsdata.length} 
                          PreNext={PreNexPage}
                          numchange={numChangePage}/>
                      </div>
                    )
                  }
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CModal
          alignment="center"
          size="xl"
          visible={showDetail}
          onClose={() => setShowDetail(false)}
        >
          <CModalHeader>
            <CModalTitle>{t('searchdetailbtn-production')}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {
              detailtitle.map((titleName, idx) => {
                let showData = [
                  'NFT_NO', 'UUID', 'IMAGE', 'DENOMINATION',
                  'PRICE', 'DEADLINE', 'RELEASE_DATE',
                  'STATE', 'OWNER', 'OWNER_WALLET'
                ]
                if (showData.includes(titleName)) {
                  switch (titleName) {
                    case 'NFT_NO': {
                      return (
                        <Fragment key={idx + 1}>
                          <div>{t('nftmodaltitle1-assets')} : {detailvalue[idx]}</div>
                        </Fragment>
                      )
                    }
                    case 'UUID': {
                      return (
                        <Fragment key={idx + 1}>
                          <div>{t('nftmodaltitle2-assets')} : {detailvalue[idx]}</div>
                        </Fragment>
                      )
                    }
                    case 'IMAGE': {
                      return (
                        <Fragment key={idx + 1}>
                          <div>{t('nftmodaltitle3-assets')} : {detailvalue[idx]}</div>
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
                    case 'PRICE': {
                      return (
                        <Fragment key={idx + 1}>
                          <div>{t('prodmodaltitle2-production')} : {detailvalue[idx]} DCTW</div>
                        </Fragment>
                      )
                    }
                    case 'RELEASE_DATE': {
                      return (
                        <Fragment key={idx + 1}>
                          <div>{t('nftmodaltitle4-assets')} : {detailvalue[idx]}</div>
                        </Fragment>
                      )
                    }
                    case 'DEADLINE': {
                      return (
                        <Fragment key={idx + 1}>
                          <div>{t('nftmodaltitle5-assets')} : {detailvalue[idx]}</div>
                        </Fragment>
                      )
                    }
                    case 'STATE': {
                      return (
                        <Fragment key={idx + 1}>
                          <div>{t('nftmodaltitle6-assets')} : {detailvalue[idx].toString()}</div>
                        </Fragment>
                      )
                    }
                    case 'OWNER': {
                      return (
                        <Fragment key={idx + 1}>
                          <div>{t('nftmodaltitle7-assets')} : {detailvalue[idx]}</div>
                        </Fragment>
                      )
                    }
                    case 'OWNER_WALLET': {
                      return (
                        <Fragment key={idx + 1}>
                          <div>{t('address-wallet')} : {detailvalue[idx]}</div>
                        </Fragment>
                      )
                    }
                  }
                }
              })
            }
          </CModalBody>
        </CModal>
      </CContainer>
      <p style={{ marginBottom: "20px"}}></p>
    </div>
  );
}