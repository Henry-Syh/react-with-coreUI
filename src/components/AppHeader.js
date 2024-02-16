import {
  cilAccountLogout,
  cilArrowCircleRight,
  cilExitToApp,
  cilMenu,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, Fragment } from 'react'
import { storge } from "src/utils";

import { logo } from "src/assets/brand/logo";
import { LoginHeader, UnLoginHeader } from "src/components/header/loginOut"
import useGlobalSaveALL from "./GlobalSave";

const AppHeader = () => {
  // const [order, setOrder] = useState(false);
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const token = useSelector((state) => state.token);
  const username = useSelector((state) => state.userName);
  const pb_bought = useSelector((state) => state.pb_bought === 'true');
  const isLineBind = useSelector((state) => state.lineBind === 'true');
  
  const showLine = (isLineBind) => {
    if (isLineBind === true) {
      return false
    } else {
      return true
    };
  }
  
  useGlobalSaveALL();

  // function ChkOrderList() {
  //   if (orderList.length !== 0) {
  //     setOrder(true)
  //   } else {
  //     setOrder(false)
  //   }
  // }
  
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        {token ? <LoginHeader userName={username} showLine={showLine(isLineBind)}/> : <UnLoginHeader />}
      </CContainer>
    </CHeader>
  );
};

export default React.memo(AppHeader);
