import { 
  CCard, 
  CCardBody, 
  CCol, 
  CContainer, 
  CRow, 
  CCardHeader,
  CAlert,} from "@coreui/react";

import { Table } from "antd";
import "src/scss/ant-pagination-table.css"

import { useState, useEffect, Fragment } from "react";
import { WaitSpinner } from 'src/components/Waiting'
import { JSXString } from "src/utils";
import { SearchPBManagementAPI } from "src/webAPI/PowerBoxAPI";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


export default function Management() {
  // 翻譯用hook
  const { t } = useTranslation();
  const languageChange = useSelector((state) => state.languageChange); // 當語言改變時PowerBox供電狀況也要改

  // 各種頁面狀態
  const [loading, setLoading] = useState(false);  // 讀取資料
  const [errormsg, setErrormsg] = useState("");  // 錯誤訊息
  const [showErrorMsg, setShowErrorMsg] = useState(false);  // 顯示錯誤訊息

  // PowerBox Table
  const [manageData, setManageData] = useState([])  // PowerBox Table的Data
  const tableColumn = [  // PowerBox Table的Column
    {
      title: t('pbmanagecolumn1-pbmanage'),
      dataIndex: 'serialNo',
      key: 'serialNo'
    },
    {
      title: t('5gcolumn2-5gmanage'),
      dataIndex: 'startDate',
      key: 'startDate'
    },
    {
      title: t('5gcolumn3-5gmanage'),
      dataIndex: 'accountDay',
      key: 'accountDay'
    },
    {
      title: `${t('pbmanagecolumn2-pbmanage')}(W)`,
      dataIndex: 'usedPower',
      key: 'usedPower'
    },
    {
      title: t('pbmanagecolumn3-pbmanage'),
      dataIndex: 'status',
      key: 'status'
    }
  ]
  const subTableColumn = [  // 擴展的詳細PowerBox資料Table的Column
    {
      title: t('5gcolumn6-5gmanage'),
      dataIndex: 'maintainer',
      key: 'maintainer'
    },
    {
      title: t('5gcolumn7-5gmanage'),
      dataIndex: 'setupDate',
      key: 'setupDate'
    },
    {
      title: `${t('5gcolumn8-5gmanage')}(DCTW)`,
      dataIndex: 'baseRate',
      key: 'baseRate'
    },
    {
      title: `${t('5gcolumn5-5gmanage')}(DCTW)`,
      dataIndex: 'electric',
      key: 'electric'
    },
    {
      title: `${t('pbmanagecolumn4-pbmanage')}(W)`,
      dataIndex: 'totalPower',
      key: 'totalPower'
    }
  ]

  function StatusText(status_DB) {
    switch (status_DB) {
      case 0:
        return t('pbstatus1-pbmanage')
      case 1:
        return t('pbstatus2-pbmanage')
      case 2:
        return t('pbstatus3-pbmanage')
      case 3:
        return t('pbstatus4-pbmanage')
    };
  };

  // 一開始進入此畫面就用useEffect抓取5G管理資料
  useEffect(() => {
    // 初始化Table資料
    setLoading(true);
    setManageData([]);

    SearchPBManagementAPI().then((result) => {
      if (result.rCode == "0001") {
        // 製作Main PowerBox管理Table data
        const maindata = [];
        for (let index = 0; index < result.data.length; index++) {
          maindata.push(
            {
              key: index,
              serialNo: result.data[index]['SerialNo'],
              startDate: result.data[index]['START_DATE'],
              accountDay: result.data[index]['ACCOUNT_DAY'],
              usedPower: result.data[index]['USED_POWER'],
              status: StatusText(result.data[index]['STATUS']),
              detail: result.data[index]['detail']
            }
          )
        }
        setManageData(maindata);
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
  }, [languageChange])

  return (
    <div>
      <CRow className="justify-content-center">
        <CCard className="mx-3" style={{ width: '70rem' }}>
          <CCardHeader>{t('pbmanagetitle-pbmanage')}</CCardHeader>
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
                        columns={tableColumn} 
                        dataSource={manageData}
                        expandable={{
                          rowExpandable: (record) => true,
                          expandedRowRender: (record) => {
                            // 製作擴展PowerBox詳細紀錄Table的Data
                            const subdetaildata = []
                            subdetaildata.push(
                              {
                                key: 0,
                                maintainer: record.detail.MAINTAINER,
                                setupDate: record.detail.SETUP_DATE,
                                baseRate: record.detail.BASE_POWER_RATE,
                                electric: record.detail.ELECTRIC_BILL,
                                totalPower: record.detail.TOTAL_USED_POWER
                              }
                            )
                            return <Table columns={subTableColumn} dataSource={subdetaildata}/>
                          }
                        }}
                      >
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