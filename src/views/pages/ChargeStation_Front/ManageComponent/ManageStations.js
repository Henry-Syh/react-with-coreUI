import { 
  CCard, CCardBody, CCol, CRow, 
  CCardHeader, CCardImage, CCardTitle, CCardText} from "@coreui/react";

import { EditTwoTone, PlusSquareTwoTone } from '@ant-design/icons';
import { Collapse, Tag, Button, Space, Descriptions, Badge } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import './ManageStation.css';
import ChargingStation from 'src/assets/images/ChargeStation/chargingStation.png';
import { useState, Fragment, useEffect } from "react";

import ChargeSet from './Modal/ChargeSet/ChargeSet'
import NoDataPage from "src/components/NoDataPage"
import { useTranslation } from "react-i18next";

export default function ManageStations(props) {
  // 翻譯用hook
  const { t } = useTranslation();

  // 顯示單一充電站資料
  const { 
    Data, setErrormsg, setShowErrorMsg
  } = props;
  const { Panel } = Collapse;
  
  const [showCharger, setShowCharger] = useState(false);  // 顯示編輯充電槍小視窗

  const [StationID, setStationID] = useState(Data['STATION_ID']);  // 業者充電站編號
  const [StationName, setStationName] = useState(Data['STATION_NAME']);  // 業者充電站名稱
  const [TotalPower, setTotalPower] = useState(Data['TOTAL_POWER']);  // 業者充電站總電量
  const [Price, setPrice] = useState(Data['PER_ELECTRIC']);  // 業者充電站電價(DCTW/度)
  const [ChargerAmount, setChargerAmount] = useState(Data['AMOUNT']);  // 業者充電樁數量
  const [ChargerData, setChargerData] = useState(Data['CHARGING_STATION']);  // 業者充電站內充電樁資訊 [{充電樁1}, {充電樁2}]
  const [dataBefore, setDataBefore] = useState([]);  // 要更改事項其尚未更改的值
  
  const DataAnalyse = () => {
    // 計算充電樁資料[每排2個共需要幾排]與[每排與上面一排的距離]
    const showData = [];  // 顯示資料([2個充電樁資料, 2個充電樁資料])
    const topPX = [];  // 每排與上面一排的距離
    let chargerRows = Math.floor(Data['AMOUNT'] / 2);  // 計算整數
    let rem = Data['AMOUNT'] % 2;  // 計算餘數
    if (rem != 0) ++chargerRows;  // 如果餘數不等於0表示需要增加一排
    // 按照每排2個塞資料
    for (let i = 0; i < chargerRows; i++) {
      if (i != chargerRows-1) {
        showData.push(Data["CHARGING_STATION"].slice(2*i, (2*i)+2));
      } else {
        if (rem != 0) {
          // 如果餘數不為0表示多出一個所以直接塞最後一筆資料
          showData.push(Data["CHARGING_STATION"].slice(Data["CHARGING_STATION"].length-1))
        } else {
          showData.push(Data["CHARGING_STATION"].slice(2*i, (2*i)+2))
        }
      }
    };
    // 計算每排與上一排的距離
    for (let x = 0; x < showData.length; x++) {
      if (x == 0) topPX.push("0px");
      if (x != 0) topPX.push("20px");
    }
    return [showData, topPX]
  };

  const BadgeSelect = (status) => {
    switch (status) {
      case 0:
        return (
          <Fragment>
            <Badge status="error" text={t('managestationbadge1-chargefront')} />
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <Badge status="success" text={t('managestationbadge2-chargefront')} />
          </Fragment>
        )
    }
  };

  const ChargerModify = (data) => {
    setDataBefore(data);
    setShowCharger(true);
  };
  
  const GenerateCharger = () => {
    // 按照資料生成充電樁
    const [showData, topPX] = DataAnalyse();
    if (showData.length != 0) {
      // 資料庫內有充電站資料+充電樁資料
      return (
        <Fragment>
          {
            showData.map((datasRow, idx) => {
              // 如果該排充電樁數量=2，直接列出兩個充電樁資料
              if (datasRow.length == 2) {
                return (
                  <Fragment key={idx}>
                    <CRow className="justify-content-around">
                      <CCard style={{ width: '35rem', marginTop: `${topPX[idx]}` }}>
                        <CCardImage orientation="top" src={ChargingStation} />
                        <CCardBody>
                          <CCardTitle>{t('managestationtext1-chargefront')}: {datasRow[0]['CHARGE_ID']}</CCardTitle>
                          <Space
                            direction="vertical"
                            size="middle"
                            style={{
                              display: 'flex',
                            }}>
                            <Descriptions title={t('managestationtext3-chargefront')} bordered>
                              <Descriptions.Item label={t('5gcolumn7-5gmanage')} span={3}>{datasRow[0]['SETUP_DATE']}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext4-chargefront')}>{`${datasRow[0]['ALLOCATED_POWER']} kW`}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext5-chargefront')} span={2}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-remainedPower`}>
                                  {`${datasRow[0]['REMAINED_POWER']} kW`}
                                </div>
                              </Descriptions.Item>
                            </Descriptions>
                          </Space>
                          <p></p>
                          <Space
                            direction="vertical"
                            size="middle"
                            style={{
                              display: 'flex',
                            }}>
                            <Descriptions title={`${t('managestationtext6-chargefront')}A`} bordered>
                              <Descriptions.Item label={t('managestationtext7-chargefront')}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-A-status`}>
                                  {BadgeSelect(datasRow[0]['DISABLE']['A'])}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext8-chargefront')} span={2}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-A-time`}>
                                  0 {t('managestationtext2-chargefront')}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext9-chargefront')} span={3}>{`${datasRow[0]['OUTPUT_SETTING_A']['Voltage']} V`}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext10-chargefront')} span={3}>{`${datasRow[0]['OUTPUT_SETTING_A']['Current']} A`}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions title={`${t('managestationtext6-chargefront')}B`} bordered size={"small"}>
                              <Descriptions.Item label={t('managestationtext7-chargefront')}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-B-status`}>
                                  {BadgeSelect(datasRow[0]['DISABLE']['B'])}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext8-chargefront')} span={2}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-B-time`}>
                                  0 {t('managestationtext2-chargefront')}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext9-chargefront')} span={3}>{`${datasRow[0]['OUTPUT_SETTING_B']['Voltage']} V`}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext10-chargefront')} span={3}>{`${datasRow[0]['OUTPUT_SETTING_B']['Current']} A`}</Descriptions.Item>
                            </Descriptions>
                            <div className="text-center">
                              <Button 
                                size={"large"} 
                                icon={<EditTwoTone />}
                                onClick={() => 
                                  ChargerModify(
                                    [
                                      datasRow[0]['CHARGE_ID'],
                                      datasRow[0]['DISABLE'],
                                      datasRow[0]['OUTPUT_SETTING_A'],
                                      datasRow[0]['OUTPUT_SETTING_B'],
                                      StationName,
                                      Price,
                                      StationID
                                    ]
                                  )
                                }>
                                {t('managestationbtn1-chargefront')}
                              </Button>
                            </div>
                          </Space>
                        </CCardBody>
                      </CCard>
                      <CCard style={{ width: '35rem', marginTop: `${topPX[idx]}` }}>
                      <CCardImage orientation="top" src={ChargingStation} />
                        <CCardBody>
                          <CCardTitle>{t('managestationtext1-chargefront')}: {datasRow[1]['CHARGE_ID']}</CCardTitle>
                          <Space
                            direction="vertical"
                            size="middle"
                            style={{
                              display: 'flex',
                            }}>
                            <Descriptions title={t('managestationtext3-chargefront')} bordered>
                              <Descriptions.Item label={t('5gcolumn7-5gmanage')} span={3}>{datasRow[1]['SETUP_DATE']}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext4-chargefront')}>{`${datasRow[1]['ALLOCATED_POWER']} kW`}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext5-chargefront')} span={2}>
                                <div className={`${StationID}-${datasRow[1]['CHARGE_ID']}-remainedPower`}>
                                  {`${datasRow[1]['REMAINED_POWER']} kW`}
                                </div>
                              </Descriptions.Item>
                            </Descriptions>
                          </Space>
                          <p></p>
                          <Space
                            direction="vertical"
                            size="middle"
                            style={{
                              display: 'flex',
                            }}>
                            <Descriptions title={`${t('managestationtext6-chargefront')}A`} bordered>
                              <Descriptions.Item label={t('managestationtext7-chargefront')}>
                                <div className={`${StationID}-${datasRow[1]['CHARGE_ID']}-A-status`}>
                                  {BadgeSelect(datasRow[1]['DISABLE']['A'])}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext8-chargefront')} span={2}>
                                <div className={`${StationID}-${datasRow[1]['CHARGE_ID']}-A-time`}>
                                  0 {t('managestationtext2-chargefront')}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext9-chargefront')} span={3}>{`${datasRow[1]['OUTPUT_SETTING_A']['Voltage']} V`}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext10-chargefront')} span={3}>{`${datasRow[1]['OUTPUT_SETTING_A']['Current']} A`}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions title={`${t('managestationtext6-chargefront')}B`} bordered size={"small"}>
                              <Descriptions.Item label={t('managestationtext7-chargefront')}>
                                <div className={`${StationID}-${datasRow[1]['CHARGE_ID']}-B-status`}>
                                  {BadgeSelect(datasRow[1]['DISABLE']['B'])}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext8-chargefront')} span={2}>
                                <div className={`${StationID}-${datasRow[1]['CHARGE_ID']}-B-time`}>
                                  0 {t('managestationtext2-chargefront')}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext9-chargefront')} span={3}>{`${datasRow[1]['OUTPUT_SETTING_B']['Voltage']} V`}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext10-chargefront')} span={3}>{`${datasRow[1]['OUTPUT_SETTING_B']['Current']} A`}</Descriptions.Item>
                            </Descriptions>
                            <div className="text-center">
                              <Button 
                                size={"large"} 
                                icon={<EditTwoTone />}
                                onClick={() => 
                                  ChargerModify(
                                    [
                                      datasRow[1]['CHARGE_ID'],
                                      datasRow[1]['DISABLE'],
                                      datasRow[1]['OUTPUT_SETTING_A'],
                                      datasRow[1]['OUTPUT_SETTING_B'],
                                      StationName,
                                      Price,
                                      StationID
                                    ]
                                  )
                                }>
                                {t('managestationbtn1-chargefront')}
                              </Button>
                            </div>
                          </Space>
                        </CCardBody>
                      </CCard>
                    </CRow>
                  </Fragment>
                )
              } else {
                // 如果該排充電樁數量=1，只需要列出一個充電樁資料
                return (
                  <Fragment key={idx}>
                    <CRow className="justify-content-around">
                      <CCard style={{ width: '35rem', marginTop: `${topPX[idx]}` }}>
                        <CCardImage orientation="top" src={ChargingStation} />
                        <CCardBody>
                          <CCardTitle>{t('managestationtext1-chargefront')}: {datasRow[0]['CHARGE_ID']}</CCardTitle>
                          <Space
                            direction="vertical"
                            size="middle"
                            style={{
                              display: 'flex',
                            }}>
                            <Descriptions title={t('managestationtext3-chargefront')} bordered>
                              <Descriptions.Item label={t('5gcolumn7-5gmanage')} span={3}>{datasRow[0]['SETUP_DATE']}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext4-chargefront')}>{`${datasRow[0]['ALLOCATED_POWER']} kW`}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext5-chargefront')} span={2}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-remainedPower`}>
                                  {`${datasRow[0]['REMAINED_POWER']} kW`}
                                </div>
                              </Descriptions.Item>
                            </Descriptions>
                          </Space>
                          <p></p>
                          <Space
                            direction="vertical"
                            size="middle"
                            style={{
                              display: 'flex',
                            }}>
                            <Descriptions title={`${t('managestationtext6-chargefront')}A`} bordered>
                              <Descriptions.Item label={t('managestationtext7-chargefront')}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-A-status`}>
                                  {BadgeSelect(datasRow[0]['DISABLE']['A'])}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext8-chargefront')} span={2}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-A-time`}>
                                  0 {t('managestationtext2-chargefront')}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext9-chargefront')} span={3}>{`${datasRow[0]['OUTPUT_SETTING_A']['Voltage']} V`}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext10-chargefront')} span={3}>{`${datasRow[0]['OUTPUT_SETTING_A']['Current']} A`}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions title={`${t('managestationtext6-chargefront')}B`} bordered size={"small"}>
                              <Descriptions.Item label={t('managestationtext7-chargefront')}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-B-status`}>
                                  {BadgeSelect(datasRow[0]['DISABLE']['B'])}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext8-chargefront')} span={2}>
                                <div className={`${StationID}-${datasRow[0]['CHARGE_ID']}-B-time`}>
                                  0 {t('managestationtext2-chargefront')}
                                </div>
                              </Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext9-chargefront')} span={3}>{`${datasRow[0]['OUTPUT_SETTING_B']['Voltage']} V`}</Descriptions.Item>
                              <Descriptions.Item label={t('managestationtext10-chargefront')} span={3}>{`${datasRow[0]['OUTPUT_SETTING_B']['Current']} A`}</Descriptions.Item>
                            </Descriptions>
                            <div className="text-center">
                              <Button 
                                size={"large"} 
                                icon={<EditTwoTone />}
                                onClick={() => 
                                  ChargerModify(
                                    [
                                      datasRow[0]['CHARGE_ID'],
                                      datasRow[0]['DISABLE'],
                                      datasRow[0]['OUTPUT_SETTING_A'],
                                      datasRow[0]['OUTPUT_SETTING_B'],
                                      StationName,
                                      Price,
                                      StationID
                                    ]
                                  )
                                }>
                                {t('managestationbtn1-chargefront')}
                              </Button>
                            </div>
                          </Space>
                        </CCardBody>
                      </CCard>
                    </CRow>
                  </Fragment>
                )
              }
            })
          }
        </Fragment>
      )
    } else {
      return (
        // 資料庫內只有充電站資料尚未有充電樁資料
        <Fragment>
          <NoDataPage text={t('managestationnodatatext-chargefront')}/>
        </Fragment>
      )
    };
  };

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header={t('managestationtext11-chargefront', {Station_Name: StationName})} key="1">
          <PageHeader
            title={StationName}
            className="station-header"
            subTitle={StationID}
            tags={[
              <Tag key="0" color="#108ee9">{t('managestationtag1-chargefront', {Total_Power: TotalPower})}</Tag>,
              <Tag key="1" color="#108ee9">{t('managestationtag2-chargefront', {Price_: Price})}</Tag>,
            ]}
            >
            {GenerateCharger()}
          </PageHeader>
        </Panel>
      </Collapse>
      {
        showCharger ?
        (
          <Fragment>
            <ChargeSet 
              showModify={showCharger} setShowModify={setShowCharger}
              dataBefore={dataBefore}
              />
          </Fragment>
        ):null
      }
    </div>
  )
}