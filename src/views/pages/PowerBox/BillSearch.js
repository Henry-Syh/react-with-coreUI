import { 
  CCard, 
  CCardBody, 
  CCol,
  CRow, 
  CCardHeader,
  CAlert,
  CButton,} from "@coreui/react";

import { Table, Button, Input, Space } from "antd";
import "src/scss/ant-pagination-table.css"

import { useState, useEffect, Fragment, useRef } from "react";
import { WaitSpinner } from 'src/components/Waiting'

import { JSXString } from "src/utils";

import { SearchPersonalBillAPI } from "src/webAPI/PowerBoxAPI";
import PayModal from "./PayModal"
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


export default function BillSearch() {
  // 翻譯用hook
  const { t } = useTranslation();
  const languageChange = useSelector((state) => state.languageChange); // 當語言改變時PowerBox繳費狀況也要改

  // 各種頁面狀態
  const [loading, setLoading] = useState(false);  // 讀取資料
  const [errormsg, setErrormsg] = useState("");  // 錯誤訊息
  const [showErrorMsg, setShowErrorMsg] = useState(false);  // 顯示錯誤訊息
  const [reloadList, setReloadList] = useState(false);  // 重新抓取個人PowerBox資料

  // Modal 繳費彈窗
  const [showDetail, setShowDetail] = useState(false);  // 顯示繳費彈窗
  const [modalData, setModalData] = useState(false);  // 給繳費彈窗的資料

  // Table Search(https://4x.ant.design/components/table/#components-table-demo-filter-search)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  // Table Search button event(https://4x.ant.design/components/table/#components-table-demo-filter-search)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Table Reset button event(https://4x.ant.design/components/table/#components-table-demo-filter-search)
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  // Table Search box(https://4x.ant.design/components/table/#components-table-demo-filter-search)
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div 
        style={{padding: 8}}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={"2022-11"}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{marginBottom: 8, display: 'block'}} />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{width: 90}}
          >
            {t('tablefilterbtn1')}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{width: 90}}
          >
            {t('tablefilterbtn2')}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            {t('tablefilterbtn3')}
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  })

  // PowerBox Table
  const [billData, setBillData] = useState([])  // PowerBox Table的Data
  const billColumn = [  // PowerBox Table的Column
    {
      title: t('pbbillcolumn1-pbbillrec'),
      dataIndex: 'billID',
      key: 'billID',
    },
    {
      title: t('pbbillcolumn2-pbbillrec'),
      dataIndex: 'billYM',
      key: 'billYM',
      ...getColumnSearchProps('billYM'),
    },
    {
      title: t('pbmanagecolumn1-pbmanage'),
      dataIndex: 'prodSN',
      key: 'prodSN'
    },
    {
      title: t('pbbillcolumn3-pbbillrec'),
      dataIndex: 'deadLine',
      key: 'deadLine',
    },
    {
      title: t('pbbillcolumn4-pbbillrec'),
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: t('pbbillcolumn5-pbbillrec'),
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: t('pbbillstatus1-pbbillrec'),
          value: t('pbbillstatus1-pbbillrec'),
        },
        {
          text: t('pbbillstatus2-pbbillrec'),
          value: t('pbbillstatus2-pbbillrec'),
        }
      ],
      onFilter: (value, record) => record.status.props.children.props.children.startsWith(value),
    }
  ]

  function StatusModal(status, data) {
    switch (status) {
      case 0:
        return (
          <Fragment>
            <CButton
              color="danger"
              onClick={() => {
                setShowDetail(true),
                setModalData(data)
              }}
              shape="rounded-pill"
              size="sm"
            >
              {t('pbbillstatus1-pbbillrec')}
            </CButton>
          </Fragment>
        )
      case 1:
        return (
          <Fragment>
            <CButton
              color="success"
              size="sm"
              shape="rounded-pill"
              disabled
            >
              {t('pbbillstatus2-pbbillrec')}
            </CButton>
          </Fragment>
        )
    };
  };

  // 一開始進入此畫面就用useEffect抓取帳單資料
  useEffect(() => {
    // 初始化Table資料
    setLoading(true);
    setBillData([]);

    // fetch 獲取PowerBox帳單資料api
    SearchPersonalBillAPI().then((result) => {
      if (result.rCode == "0001") {
        // 製作Main PowerBox帳單Table data
        const maindata = [];
        for (let index = 0; index < result.data.length; index++) {
          maindata.push(
            {
              key: index,
              billID: result.data[index]['BILL_ID'],
              billYM: result.data[index]['PAYMENT_YM'],
              prodSN: result.data[index]['PRODUCTION_SERIALNO'],
              deadLine: result.data[index]['DEADLINE'],
              total: result.data[index]['TOTAL_AMOUNT'],
              status: StatusModal(
                result.data[index]['STATUS'], 
                {
                  'BillID': result.data[index]['BILL_ID'],
                  'BillYM': result.data[index]['PAYMENT_YM'],
                  'ProdSN': result.data[index]['PRODUCTION_SERIALNO'],
                  'Total': result.data[index]['TOTAL_AMOUNT']
                }
                )
            }
          )
        }
        setBillData(maindata);

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
  }, [reloadList, languageChange])

  return (
    <div>
      <CRow className="justify-content-center">
        <CCard className="mx-3" style={{ width: '70rem' }}>
          <CCardHeader>{t('pbbilltitle-pbbillrec')}</CCardHeader>
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
                    <div style={{ marginTop: "30px"}}>
                      <Table 
                        columns={billColumn} 
                        dataSource={billData}
                      >
                      </Table>
                    </div>
                  )
                }
            </CRow>
          </CCardBody>
        </CCard>
        {
          showDetail ?
          (
            <PayModal 
              showDetail={showDetail}
              setShowDetail={setShowDetail}
              Data={modalData}
              reloadList={reloadList}
              setReloadList={setReloadList}/>
          ) : null
        }
        
      </CRow>
      <p style={{ marginBottom: "20px"}}></p>
    </div>
  )
}