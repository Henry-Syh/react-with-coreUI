import { 
  CCard, CCardBody, CCol, 
  CRow, CCardHeader, CAlert, 
} from "@coreui/react";

import { useState, useEffect, Fragment, useRef } from "react";
import { Table, Button, Input, Space } from "antd";
import { WaitSpinner } from 'src/components/Waiting'
import { JSXString, makeColumnCell } from "src/utils";

import { SearchReceiptDataAPI } from "src/webAPI/ChargeStationAPI";
import { useTranslation } from "react-i18next";

export default function ReceiptSearch() {
  // 翻譯用hook
  const { t } = useTranslation();

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
  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div 
        style={{padding: 8}}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{marginBottom: 8, display: 'block'}} />
        <Space size={"large"}>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{width: 90}}
          >
            {t('tablefilterbtn1')}
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters)
              handleSearch(selectedKeys, confirm, dataIndex)
            }}
            size="small"
            style={{width: 90}}
          >
            {t('tablefilterbtn2')}
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

  // log Table
  const [logdata, setLogData] = useState([]);  // log Table的Data
  const logColumn = [  // log Table的Column
    makeColumnCell(t('chargecolumn1-chargerecipt'), 50, 'receiptid'),
    {
      title: t('chargecolumn2-chargerecipt'),
      dataIndex: 'stationName',
      key: 'stationName',
      width: 100,
      ...getColumnSearchProps('stationName', t('chargesearch-chargerecipt'))
    },
    makeColumnCell(t('chargecolumn3-chargerecipt'), 100, 'chargeTime'),
    makeColumnCell(t('chargecolumn4-chargerecipt'), 15, 'startTime'),
    makeColumnCell(t('chargecolumn5-chargerecipt'), 15, 'endTime'),
    makeColumnCell(`${t('chargecolumn6-chargerecipt')}(W)`, 80, 'chargePower'),
    makeColumnCell(t('chargecolumn8-chargerecipt'), 100, 'perElectric'),
    makeColumnCell(`${t('chargecolumn9-chargerecipt')}(DCTW)`, 100, 'total'),
  ];
  const subColumn = [
    makeColumnCell(t('chargecolumn10-chargerecipt'), 100, 'paymentSN'),
    makeColumnCell(t('chargecolumn11-chargerecipt'), 100, 'date'),
    makeColumnCell(`${t('chargecolumn12-chargerecipt')}(DCTW)`, 100, 'payAmount'),
    makeColumnCell('GasFee(ETH)', 100, 'gassFee')
  ]  // MataMask詳細資料Table的Column

  // 各種頁面狀態
  const [loading, setLoading] = useState(false);  // 讀取資料
  const [errormsg, setErrormsg] = useState("");  // 錯誤訊息
  const [showErrorMsg, setShowErrorMsg] = useState(false);  // 顯示錯誤訊息

  // 一開始進入此畫面就用useEffect抓取更改資料
  useEffect(() => {
    // 初始化Table資料
    setLoading(true);
    setLogData([]);

    // fetch 獲取充電收據api
    SearchReceiptDataAPI().then((result) => {
      if (result.rCode == "0001") {
        // Table data
        const maindata = [];
        for (let index = 0; index < result.data.length; index++) {
          maindata.push(
            {
              key: index,
              receiptid: result.data[index]['RECEIPT_ID'],
              stationName: result.data[index]['STATION_NAME'],
              chargeTime: result.data[index]['DATE_SHOW'],
              startTime: result.data[index]['CHARGE_START'],
              endTime: result.data[index]['CHARGE_END'],
              chargePower: result.data[index]['USED_POWER'],
              perElectric: result.data[index]['PER_ELECTRIC'],
              total: result.data[index]['TOTAL_AMOUNT'],
              detail: result.data[index]['TRANSACTION_DETAIL']
            }
          )
        }
        setLogData(maindata);
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
  }, []);

  return (
    <div>
      <CRow className="justify-content-center">
        <CCard className="mx-3" style={{ width: '70rem' }}>
          <CCardHeader>{t('chargetitle-chargerecipt')}</CCardHeader>
          <CCardBody className="p-3">
          <CRow>
            {
              loading ?
              (
                <div style={{ marginBottom: "30px",marginTop: "40px"}}>
                  <WaitSpinner></WaitSpinner>
                </div>
              ) : 
              (
                <Fragment>
                  <div style={{ marginTop: "30px"}} />
                  <Table
                    columns={logColumn} 
                    dataSource={logdata}
                    expandable={{
                      expandedRowRender: (record) => {
                        // 製作擴展的MetaMask繳費紀錄Table的Data
                        const subdata = []
                        subdata.push(
                          {
                            key: 'TranscationDetail',
                            paymentSN: record.detail['TransactionID'],
                            date: record.detail['PaymentTime'],
                            payAmount: record.detail['PaymentAmount'],
                            gassFee: record.detail['GasFee_ETH'],
                            // userWallet: record.detail['FromWallet']
                          }
                        )
                        return (
                          <div style={{ marginTop: "20px"}}>
                            <Table columns={subColumn} dataSource={subdata}/>
                          </div>
                        )
                      }
                    }}
                  >
                  </Table>
                </Fragment>
              )
            }
            <CAlert
              color="danger"
              dismissible
              visible={showErrorMsg}
              onClose={() => setShowErrorMsg(false)}
              style={{ marginTop: "30px"}}
            >
              {JSXString(errormsg)}
            </CAlert>
          </CRow>
          </CCardBody>
        </CCard>
      </CRow>
    </div>
  )
}
