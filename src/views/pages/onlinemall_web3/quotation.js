import React, { useState } from 'react'
import { quotationAPI } from 'src/webAPI/quotationAPI';
import QuotationChart from './quotationChart/chart'
import { CButtonGroup, CFormCheck } from "@coreui/react";

const quotation = props => {

  const [chartX, setChartX] = useState([])
  const [chartY, setChartY] = useState([])
  const [chartTitle, setChartTitle] = useState('initial')
  

  async function btnHandler(title) {
    await quotationAPI.fetch_price_API(title).then(result => {

      setChartTitle(title);
      setChartX([]);
      setChartY([]);

      // 取後50筆資料
      (result.data.slice(-50)).forEach(element => {
        if (title == "USD-TWD") {
          setChartX(chartX => [...chartX, (element.DATETIME).split(' ')[1]]);
          setChartY(chartY => [...chartY, parseFloat(element.RATE_BUY)]);
          debugger;
        } else {
          setChartX(chartX => [...chartX, (element.DATETIME).split(' ')[1]]);
          setChartY(chartY => [...chartY, parseFloat(element.PRICE)]);
        }
      });
    });
  }

  return (
    <>
      <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
        <CFormCheck
          type="radio"
          button={{ color: 'primary', variant: 'outline' }}
          name="BTC-USD"
          id="BTC-USD"
          autoComplete="off"
          label="BTC-USD"
          onClick={() => btnHandler('BTC-USD')}
        />
        <CFormCheck
          type="radio"
          button={{ color: 'primary', variant: 'outline' }}
          name="ETH-USD"
          id="ETH-USD"
          autoComplete="off"
          label="ETH-USD"
          onClick={() => btnHandler('ETH-USD')}
        />
        <CFormCheck
          type="radio"
          button={{ color: 'primary', variant: 'outline' }}
          name="USD-TWD"
          id="USD-TWD"
          autoComplete="off"
          label="USD-TWD"
          onClick={() => btnHandler('USD-TWD')}
        />
      </CButtonGroup>
      <QuotationChart chartName={chartTitle} chartX={chartX} chartY={chartY} setChartX={setChartX} setChartY={setChartY}></QuotationChart>
    </>
  )
}

quotation.propTypes = {}

export default quotation
