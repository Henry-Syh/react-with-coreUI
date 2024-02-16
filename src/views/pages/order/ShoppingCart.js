import { CCard, CCardBody, CCol, CContainer, CRow, CCardHeader } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, Fragment } from 'react'

export default function ShoppingCart(props) {
  const [currentCount, setCount] = useState(1);
  const MINUTE_MS = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every minute');
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  const timer = () => {
    setCount(currentCount + 1);
  }
  console.log(currentCount);
  // const orderList = useSelector((state) => state.orderList);
  // const [isbuy, setIsbuy] = useState(false);
  // const [totalprice, setTotalprice] = useState(0);
  // let cartTitle = ["#", "購買NFT產品", "購買數量"]

  // function ChkOrderList() {
  //   if (orderList.length !== 0) {
  //     PriceCompute()
  //     setIsbuy(true)
  //   } else {
  //     setIsbuy(false)
  //   }
  // }

  // 依照訂單價格加總計算總價錢(尚未寫完)
  // function PriceCompute() {
    // orderList.map(((order, idx) => {

    // }))
    // setTotalprice()
  // }

  // useEffect(() => {
  //   ChkOrderList()
  // 
  // });

  return (
    <div>
      shoppingcart
      Count : {currentCount}
      {/* <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="mx-1">
              <CCardHeader>ShoppingCart</CCardHeader>
              <CCardBody className="p-3">
                {
                  isbuy ? 
                  (
                    <div style={{ marginBottom: "30px",marginTop: "40px"}}>
                      <table className="table table-hover table-sm">
                        <thead className="table-info">
                          <tr>
                            {cartTitle.map((columnName, idx) => {
                              return (
                                <Fragment key={idx + 1}>
                                  <th scope="col">{columnName}</th>
                                </Fragment>
                              )
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {orderList.map((order, idx) => {
                            return (
                              <Fragment key={idx + 1}>
                                <tr>
                                  <th scope="row">{idx + 1}</th>
                                  <td>{order['BuyProdName']}</td>
                                  <td>{order['Amount']}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-outline-info"
                                      onClick={() => {
                                        // SearchProdDetail(assets['ASSETS_PRODUCTID'])
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              </Fragment>
                            )
                          })}
                          <tr></tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td>{totalprice}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : 
                  (
                    <h5 style={{ marginTop: "18px" }}>
                      You didn't Buy Anything!!
                    </h5>
                  )
                }
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <p style={{ marginBottom: "30px"}}></p> */}
    </div>
  );
}