import { cibWindows } from "@coreui/icons";
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WaitingDisplay } from "../../../components/Waiting";
import { transferAPI } from "../../../webAPI/transferAPI";
import TransferDetail from "./TransferDetail";
import { useTranslation } from "react-i18next";


export default function Transfer(props) {
    // 翻譯用hook
    const { t } = useTranslation();

    const [logList, setLogList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState([]);
    const nav = useNavigate();

    const columns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' },
        },
        {
            key: 'TRADE_NO',
            label: t('transfercolumn1-transfer'),
            _props: { scope: 'col' },
        },
        {
            key: 'BUY_TYPE',
            label: t('transfercolumn2-transfer'),
            _props: { scope: 'col' },
        },
        {
            key: 'SELL_TYPE',
            label: t('transfercolumn3-transfer'),
            _props: { scope: 'col' },
        },
        {
            key: 'TRADE_TIME',
            label: t('transfercolumn4-transfer'),
            _props: { scope: 'col' },
        },
        {
            key: 'DETAIL',
            label: t('searchdetailbtn-production'),
            _props: { scope: 'col' },
        },
    ];

    async function call_api() {
        const api = new transferAPI();
        api.do_user_transfer_API().then((result) => {
            console.log(result);
            if(result.rCode !="0001"){
                alert(result.msg);

                //logout
                nav("/login");
            }
            setLogList(result.data);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        setLoading(true);
        call_api();
    }, [])

    async function detailBtnHandler(listIdx) {
        console.log(logList[listIdx]);
        setDetail(logList[listIdx]);
        setShowDetail(true);
    }

    return (
        <>
            <h4>{t('transfertitle1-transfer')}</h4>
            {
                loading
                    ?
                    (<WaitingDisplay></WaitingDisplay>)
                    :
                    (
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    {
                                        columns.map((c, idx) => {
                                            return (
                                                <Fragment key={idx + 1}><CTableHeaderCell scope="col">{c.label}</CTableHeaderCell></Fragment>)
                                        })
                                    }
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    logList.map((item, idx) => {
                                        return (
                                            <Fragment key={idx + 1}>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                                                    <CTableDataCell>{item.TRADE_NO}</CTableDataCell>
                                                    <CTableDataCell>{item.BUY_TYPE}</CTableDataCell>
                                                    <CTableDataCell>{item.SELL_TYPE}</CTableDataCell>
                                                    <CTableDataCell>{item.TRADE_TIME}</CTableDataCell>
                                                    <CTableDataCell>
                                                        <CButton onClick={() => detailBtnHandler(idx)}>{t('searchdetailbtn-production')}</CButton>
                                                    </CTableDataCell>
                                                </CTableRow>
                                            </Fragment>
                                        )
                                    })
                                }
                            </CTableBody>
                        </CTable>
                    )
            }

            {showDetail
                ?
                <TransferDetail detail={detail} showDetail={showDetail} setShowDetail={setShowDetail}></TransferDetail>
                :
                null}
        </>
    );
}