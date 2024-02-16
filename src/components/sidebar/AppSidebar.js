import React from 'react'
import "./sidebar.scss";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { storge } from "src/utils";
import { nowSystem } from "src/webAPI/config";

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from '../AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
// import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import { 
  _nav, notVerify_nav, logout_nav,
  NFT_nav, FiveG_nav, PowerBox_nav, ChargeStation_nav
} from '../../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const token = useSelector((state) => state.token)
  const isverify = useSelector((state) => state.verify)

  useEffect(() => {
    dispatch({
      type: "UPDATE_TOKEN",
      token: storge.getStorge(storge.TOKEN_NAME),
      type: "ISVERIFY",
      verify: storge.getStorge(storge.VERIFY),
    });
  });

  function navSelector(token, isverify) {
    if ((token != "" | token != null) && isverify == "true") {
      // console.log("登入");
      switch (nowSystem) {
        case 'NFT': {
          return NFT_nav
        }
        case '5G': {
          return FiveG_nav
        }
        case 'POWERBOX': {
          return PowerBox_nav
        }
        case 'CHARGESTATION':{
          return ChargeStation_nav
        }
        default: {
          return _nav
        }
      }
    } else if (isverify == "false") {
      // console.log("已登入但未驗證");
      return notVerify_nav
    } else {
      // console.log("未登入");
      return logout_nav
    };
  };

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navSelector(token, isverify)} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
      {/* <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
      </div> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
