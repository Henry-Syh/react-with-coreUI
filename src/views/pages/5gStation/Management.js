import { 
  CCard, 
  CCardBody, 
  CCol, 
  CContainer, 
  CRow, 
  CCardHeader,
  CAlert,} from "@coreui/react";

import { useState, useEffect, Fragment } from "react";
import { WaitSpinner } from 'src/components/Waiting'

import Pagination from 'src/components/pagination/Pagination'
import { pageTopScroll, JSXString } from "src/utils";

import { Search5GManagementAPI } from "src/webAPI/5GStationAPI";
import { useTranslation } from "react-i18next";


export default function Management() {
  // 翻譯用hook
  const { t } = useTranslation();
  
  // 各種頁面狀態
  const [loading, setLoading] = useState(false);  // 讀取資料
  const [errormsg, setErrormsg] = useState("");  // 錯誤訊息
  const [showErrorMsg, setShowErrorMsg] = useState(false);  // 顯示錯誤訊息

  // 基站管理Table
  const [manageData, setManageData] = useState([])  // 基站管理Table的Data
  const tableColumn = [
    '#', t('5gcolumn1-5gmanage'), t('5gcolumn2-5gmanage'), t('5gcolumn3-5gmanage'),
    t('5gcolumn4-5gmanage'), t('5gcolumn5-5gmanage'), t('5gcolumn6-5gmanage'), 
    t('5gcolumn7-5gmanage'), t('5gcolumn8-5gmanage')
  ];  // 基站管理Table的Column

  // Pagination 按鈕操作
  const [showPerPage, setShowPerPage] = useState(10);  // 一頁顯示多少筆
  const [nowPage, setNowPage] = useState(1);  // 現在是第幾頁



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
  const nowShow = manageData.slice(indexFirstShow, indexLastShow)

  // 一開始進入此畫面就用useEffect抓取5G管理資料
  useEffect(() => {
    // 初始化Table資料
    setLoading(true);
    setManageData([]);
    // setTableColumn([]);

    // fetch 獲取5G基站管理資料api
    Search5GManagementAPI().then((result) => {
      if (result.rCode == "0001") {
        // setTableColumn(
        //   [
        //     '#', '發電機電號', '計費開始', '結算日期', '使用電量', 
        //     '每度電費', '維護人員', '安裝日期', '基本費率'
        //   ]
        // );
        setManageData(result.data);
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
      <CRow className="justify-content-center">
        <CCol>
          <CCard className="mx-3">
            <CCardHeader>{t('5gtitle-5gmanage')}</CCardHeader>
            <CCardBody className="p-3">
              <CRow>
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
                                  tableColumn.map((columnName, idx) => {
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
                                manageData.map((data, idx) => {
                                  return (
                                    <Fragment key={idx + 1}>
                                      <tr>
                                        <th scope="row" width="10px">
                                          {
                                            ((nowPage - 1) * 10) + (idx + 1)
                                          }
                                          {/* <div style={{wordWrap:'break-word', wordBreak: 'break-word'}}>要顯示的資料</div>
                                          這樣即可在Table內自動換行 */}
                                        </th>
                                        <td width="40px"><div style={{wordWrap:'break-word', wordBreak: 'break-word'}}>{data['PRODUCTION_SERIALNO']}</div></td>
                                        <td width="45px"><div style={{wordWrap:'break-word', wordBreak: 'break-word'}}>{data['START_DATE'].toString()}</div></td>
                                        <td width="45px"><div style={{wordWrap:'break-word', wordBreak: 'break-word'}}>{data['END_DATE'].toString()}</div></td>
                                        <td width="40px"><div style={{wordWrap:'break-word', wordBreak: 'break-word'}}>{data['USED_POWER']}</div></td>
                                        <td width="10px"><div style={{wordWrap:'break-word', wordBreak: 'break-word'}}>{data['ELECTRIC_BILL']}</div></td>
                                        <td width="40px"><div style={{wordWrap:'break-word', wordBreak: 'break-word'}}>{data['MAINTAINER']}</div></td>
                                        <td width="45px"><div style={{wordWrap:'break-word', wordBreak: 'break-word'}}>{data['SETUP_DATE'].toString()}</div></td>
                                        <td width="10px"><div style={{wordWrap:'break-word', wordBreak: 'break-word'}}>{data['BASE_POWER_RATE']}</div></td>
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
                            totalPost={manageData.length} 
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
      <p style={{ marginBottom: "20px"}}></p>
    </div>
  )
}