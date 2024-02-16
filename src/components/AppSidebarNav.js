import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import { useTranslation } from "react-i18next";

export const AppSidebarNav = ({ items }) => {
  const { t } = useTranslation();
  const location = useLocation()
  const SidebarTitle = {
    'Home': t('home-sidebar'),
    'Personal': t('personal-sidebartitle'),
    'Account': t('account-sidebar'),
    'Personal data': t('account-personaldata-sidebar'),
    'Wallet': t('account-wallet-sidebar'),
    'Production': t('account-production-sidebar'),
    'NFT Asset': t('account-nftasset-sidebar'),
    'Transfer': t('account-transfer-sidebar'),
    '5G Station': t('5G-sidebar'),
    '5GManagement': t('5G-management-sidebar'),
    '5GMaintenance Record': t('5G-maintenance-sidebar'),
    'PowerBox': t('PowerBox-sidebar'),
    'PBManagement': t('PowerBox-management-sidebar'),
    'PBMaintenance Record': t('PowerBox-maintenance-sidebar'),
    'PowerBox Bill': t('PowerBox-bill-sidebar'),
    'ChargeStation': t('ChargeStation-sidebar'),
    'Receipt': t('ChargeStation-receipt-sidebar'),
    'Buy': t('buy-sidebartitle'),
    'Main Product': t('MainProduct-sidebar'),
    'Web3': t('Web3-sidebar'),
    'Quotation': t('Web3-quotation-sidebar'),
    'Exchange': t('Web3-exchange-sidebar'),
    'NFT': t('Web3-nft-sidebar'),
    'Other System': t('Other-sidebartitle'),
    'ChargeStation Front': t('ChargeStationFront-sidebar')
  }

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && SidebarTitle[`${name}`]}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
