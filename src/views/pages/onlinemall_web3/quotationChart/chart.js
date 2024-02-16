import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import mqtt from "precompiled-mqtt"
import { useSelector } from "react-redux";
const QuotationChart = (props) => {

  const { chartName, chartX, chartY, setChartX, setChartY } = props;
  const username = useSelector((state) => state.userName);

  useEffect(() => {
    let options = {
      path: '/ws',
      clientId: `account-${username}`
    }
    // let client = mqtt.connect("ws://54.150.153.244:15675", options);
    let client = mqtt.connect("wss://02.taiwanone.net/ws", options);

    client.on('connect', (e) => { console.log('connect', e) });
    client.on('message', (topic, message, err) => {
      let obj = JSON.parse(message.toString());

      let datetime = new Date(parseInt(obj['ts']));

      let price = obj['quo'] //parseFloat(obj['data'][0].idxPx);
      let time = `${datetime.getHours()}:${(datetime.getMinutes() < 10 ? '0' : '')}${datetime.getMinutes()}:${(datetime.getSeconds() < 10 ? '0' : '')}${datetime.getSeconds()}:${datetime.getMilliseconds()}`;

      setChartX(chartX => [...chartX, time].slice(-50));
      setChartY(chartY => [...chartY, price].slice(-50));
    });
    client.subscribe(chartName, (e) => { console.log('topic', e); });


    return () => {
      console.log("disconnction");
      client.unsubscribe(chartName);
      client.end();
    }
  }, [, chartName])

  return (
    <>
      <Plot
        data={[
          {
            x: chartX,
            y: chartY,
            marker: { color: 'red' },
          },
          // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 1124, height: 768, title: chartName }} config={{ scrollZoom: true }} />
    </>
  )
}

export default QuotationChart