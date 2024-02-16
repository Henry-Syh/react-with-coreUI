import { 
  CCard, 
  CCardBody, 
  CCol, 
  CContainer, 
  CRow, 
  CCardHeader,
  CAlert, } from "@coreui/react";

// 可擴展Row Table套件+CSS
// 參考：
// https://www.youtube.com/watch?v=j-DLQ48mFNc
// https://ant.design/components/table/#components-table-demo-expand
import { Table } from "antd";
import "src/scss/ant-pagination-table.css"

import { useState, useEffect, Fragment } from "react";
import { WaitSpinner } from 'src/components/Waiting'
import { SearchMaintenanceLogAPI } from "src/webAPI/PowerBoxAPI";

import { pageTopScroll, JSXString } from "src/utils";
import { useTranslation } from "react-i18next";

export default function MaintenanceRecord() {
  // 翻譯用hook
  const { t } = useTranslation();

  // log Table
  const [mainlogdata, setMainLogData] = useState([]);  // 主要維修紀錄Table的Data
  const mainLogColumn = [  // 主要維修紀錄Table的Column
    {
      title: t('pbmanagecolumn1-pbmanage'),
      dataIndex: 'serialNo',
      key: 'serialNo'
    },
    {
      title: t('5gmaintaincolumn1-5gmaintenance'),
      dataIndex: 'fixTimes',
      key: 'fixTimes'
    }
  ]
  const subLogColumn = [  // 擴展的維修詳細紀錄Table的Column
    {
      title: t('5gmaintaincolumn2-5gmaintenance'),
      dataIndex: 'logid',
      key: 'logid'
    },
    {
      title: t('5gmaintaincolumn3-5gmaintenance'),
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: t('5gcolumn6-5gmanage'),
      dataIndex: 'maintainer',
      key: 'maintainer'
    },
    {
      title: t('5gmaintaincolumn4-5gmaintenance'),
      dataIndex: 'item',
      key: 'item'
    },
    {
      title: t('5gmaintaincolumn5-5gmaintenance'),
      dataIndex: 'content',
      key: 'content'
    },
  ]

  // 各種頁面狀態
  const [loading, setLoading] = useState(false);  // 讀取資料
  const [errormsg, setErrormsg] = useState("");  // 錯誤訊息
  const [showErrorMsg, setShowErrorMsg] = useState(false);  // 顯示錯誤訊息

  // 一開始進入此畫面就用useEffect抓取5G更改資料
  useEffect(() => {
    // 初始化Table資料
    setLoading(true);
    setMainLogData([]);

    // fetch 獲取PowerBox維修資料api
    SearchMaintenanceLogAPI().then((result) => {
      if (result.rCode == "0001") {
        // 製作Main 維修紀錄Table data
        const maindata = [];
        for (let index = 0; index < result.data.length; index++) {
          maindata.push(
            {
              key: index,
              serialNo: result.data[index]['SerialNo'],
              fixTimes: result.data[index]['Times'],
              maintainDetail: result.data[index]['maintain']
            }
          )
        }
        setMainLogData(maindata);

        // loading finish
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
        <CCard className="mx-3" style={{ width: '65rem' }}>
          <CCardHeader>{t('pbmaintaintitle-pbmaintenance')}</CCardHeader>
            <CCardBody className="p-3">
              <CRow>
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
                      <Table 
                        columns={mainLogColumn} 
                        dataSource={mainlogdata}
                        expandable={{
                          rowExpandable: (record) => record.fixTimes !== 0,
                          expandedRowRender: (record) => {
                            // 製作擴展的維修詳細紀錄Table的Data
                            const sublogdata = []
                            for (let index = 0; index < record.maintainDetail.length; index++) {
                              sublogdata.push(
                                {
                                  key: index,
                                  logid: record.maintainDetail[index]['LOGID'],
                                  date: record.maintainDetail[index]['MAINTAIN_DATE'],
                                  maintainer: record.maintainDetail[index]['MAINTAINER'],
                                  item: record.maintainDetail[index]['MAINTAIN_ITEM'],
                                  content: JSXString(record.maintainDetail[index]['MAINTAIN_LOG'])
                                }
                              )
                            }
                            return <Table columns={subLogColumn} dataSource={sublogdata}/>
                          }
                        }}>
                      </Table>
                    </div>
                  )
                }
              </CRow>
            </CCardBody>
        </CCard>
      </CRow>
      <p style={{ marginBottom: "20px"}}></p>
    </div>
  )
}
