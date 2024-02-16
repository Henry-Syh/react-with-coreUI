import {
  cilAccountLogout,
  cilArrowCircleRight,
  cilBlurCircular,
  cilExitToApp,
  cilHome,
  cilContact,
  cilWallet,
  cilCart,
  cilTransfer,
  cilDollar,
  cilBank,
  cilGift,
  cilAsteriskCircle,
  cilDevices,
  cilBuilding,
  cilSettings,
  cilCopy,
  cilSearch,
  cilBoltCircle,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

export const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    to: '/',
  },
  {
    component: CNavTitle,
    name: "Personal",
  },
  {
    component: CNavGroup,
    name: "Account",
    icon: <CIcon icon={cilBlurCircular} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Personal data",
        to: "/account/info",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Wallet",
        to: "/account/wallet",
        icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Production",
        to: "/account/production",
        icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "NFT Asset",
        to: "/account/asset",
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Transfer",
        to: "/account/transfer",
        icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "5G Station",
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "5GManagement",
        to: "/5G/management",
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "5GMaintenance Record",
        to: "/5G/maintenance/record",
        icon: <CIcon icon={cilCopy} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "PowerBox",
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "PBManagement",
        to: "/PB/management",
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "PBMaintenance Record",
        to: "/PB/maintenance/record",
        icon: <CIcon icon={cilCopy} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "PowerBox Bill",
        to: "/PB/bill",
        icon: <CIcon icon={cilCopy} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "ChargeStation",
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Receipt",
        to: "/CS/receipt",
        icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
      }
    ],
  },
  {
    component: CNavTitle,
    name: "Buy",
  },
  {
    component: CNavItem,
    name: 'Main Product',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
    to: '/production',
  },
  {
    component: CNavGroup,
    name: "Web3",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Quotation",
        to: "/quotation",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "Exchange",
        to: "/web3/Exchange",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "NFT",
        to: "/web3/nft",
        icon: <CIcon icon={cilAsteriskCircle} customClassName="nav-icon" />
      },
    ]
  },
  {
    component: CNavTitle,
    name: "Other System",
  },
  {
    component: CNavItem,
    name: 'ChargeStation Front',
    icon: <CIcon icon={cilBoltCircle} customClassName="nav-icon" />,
    to: '/CSFront',
  },
];

export const logout_nav = [
  {
    component: CNavItem,
    name: 'Home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    to: '/',
  },
];

export const notVerify_nav = [
  {
    component: CNavItem,
    name: 'Home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    to: '/',
  },
  {
    component: CNavTitle,
    name: "Personal",
  },
  {
    component: CNavGroup,
    name: "Account",
    icon: <CIcon icon={cilBlurCircular} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Personal data",
        to: "/account/info",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
      },
    ],
  },
];

export const NFT_nav = [
  {
    component: CNavItem,
    name: 'Home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    to: '/',
  },
  {
    component: CNavTitle,
    name: "Personal",
  },
  {
    component: CNavGroup,
    name: "Account",
    icon: <CIcon icon={cilBlurCircular} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Personal data",
        to: "/account/info",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Wallet",
        to: "/account/wallet",
        icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Production",
        to: "/account/production",
        icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "NFT Asset",
        to: "/account/asset",
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Transfer",
        to: "/account/transfer",
        icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: "Buy",
  },
  {
    component: CNavItem,
    name: 'Main Product',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
    to: '/production',
  },
  {
    component: CNavGroup,
    name: "Web3",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Quotation",
        to: "/quotation",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "Exchange",
        to: "/web3/Exchange",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "NFT",
        to: "/web3/nft",
        icon: <CIcon icon={cilAsteriskCircle} customClassName="nav-icon" />
      },
    ]
  }
];

export const FiveG_nav = [
  {
    component: CNavItem,
    name: 'Home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    to: '/',
  },
  {
    component: CNavTitle,
    name: "Personal",
  },
  {
    component: CNavGroup,
    name: "Account",
    icon: <CIcon icon={cilBlurCircular} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Personal data",
        to: "/account/info",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Wallet",
        to: "/account/wallet",
        icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "NFT Asset",
        to: "/account/asset",
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Transfer",
        to: "/account/transfer",
        icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "5G Station",
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "5GManagement",
        to: "/5G/management",
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "5GMaintenance Record",
        to: "/5G/maintenance/record",
        icon: <CIcon icon={cilCopy} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: "Buy",
  },
  {
    component: CNavGroup,
    name: "Web3",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Quotation",
        to: "/quotation",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "Exchange",
        to: "/web3/Exchange",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "NFT",
        to: "/web3/nft",
        icon: <CIcon icon={cilAsteriskCircle} customClassName="nav-icon" />
      },
    ]
  }
];

export const PowerBox_nav = [
  {
    component: CNavItem,
    name: 'Home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    to: '/',
  },
  {
    component: CNavTitle,
    name: "Personal",
  },
  {
    component: CNavGroup,
    name: "Account",
    icon: <CIcon icon={cilBlurCircular} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Personal data",
        to: "/account/info",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Wallet",
        to: "/account/wallet",
        icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Transfer",
        to: "/account/transfer",
        icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "PowerBox",
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "PBManagement",
        to: "/PB/management",
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "PBMaintenance Record",
        to: "/PB/maintenance/record",
        icon: <CIcon icon={cilCopy} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "PowerBox Bill",
        to: "/PB/bill",
        icon: <CIcon icon={cilCopy} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: "Buy",
  },
  {
    component: CNavGroup,
    name: "Web3",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Quotation",
        to: "/quotation",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "Exchange",
        to: "/web3/Exchange",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "NFT",
        to: "/web3/nft",
        icon: <CIcon icon={cilAsteriskCircle} customClassName="nav-icon" />
      },
    ]
  }
];

export const ChargeStation_nav = [
  {
    component: CNavItem,
    name: 'Home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    to: '/',
  },
  {
    component: CNavTitle,
    name: "Personal",
  },
  {
    component: CNavGroup,
    name: "Account",
    icon: <CIcon icon={cilBlurCircular} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Personal data",
        to: "/account/info",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Wallet",
        to: "/account/wallet",
        icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Transfer",
        to: "/account/transfer",
        icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "ChargeStation",
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Receipt",
        to: "/CS/receipt",
        icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
      }
    ],
  },
  {
    component: CNavTitle,
    name: "Buy",
  },
  {
    component: CNavGroup,
    name: "Web3",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Quotation",
        to: "/quotation",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "Exchange",
        to: "/web3/Exchange",
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />
      }
    ]
  },
  {
    component: CNavTitle,
    name: "Other System",
  },
  {
    component: CNavItem,
    name: 'ChargeStation Front',
    icon: <CIcon icon={cilBoltCircle} customClassName="nav-icon" />,
    to: '/CSFront',
  },
];
