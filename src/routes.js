import React from "react";

// Home
const Home = React.lazy(() => import("./views/pages/home/Home"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Logout = React.lazy(() => import("./views/pages/logout/Logout"));
const LostPWD = React.lazy(() => import("./views/pages/login/lostpwd"));

// accounts
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Psernal = React.lazy(() => import("./views/pages/account/Personal"));
const Production = React.lazy(() => import("./views/pages/account/Production"));
const Asset = React.lazy(() => import("./views/pages/account/Asset"));
const Wallet = React.lazy(() => import("./views/pages/account/Wallet"));
const Transfer = React.lazy(() => import("./views/pages/account/Transfer"));

// 5GStation
const Management = React.lazy(() => import("./views/pages/5gStation/Management"));
const MaintenanceRecord = React.lazy(() => import("./views/pages/5gStation/MaintenanceRecord"));

// PowerBox
const Management_PB = React.lazy(() => import("./views/pages/PowerBox/Management"));
const MaintenanceRecord_PB = React.lazy(() => import("./views/pages/PowerBox/MaintenanceRecord"));
const Bill_PB = React.lazy(() => import("./views/pages/PowerBox/BillSearch"));

// ChargerStation
const Receipt_CS = React.lazy(() => import("./views/pages/ChargeStation/ReceiptSearch"));

// ChargeStation Front
const Front_CSF = React.lazy(() => import("./views/pages/ChargeStation_Front/Front"));

// Order
const ShoppingCart = React.lazy(() => import("./views/pages/order/ShoppingCart"));
const OrderList = React.lazy(() => import("./views/pages/order/orderList"));

// Main Product
const MainProduct = React.lazy(() => import("./views/pages/MainProduct/MainProduction"));

// exchange
const quotation = React.lazy(() => import("./views/pages/onlinemall_web3/quotation"));
const Exchange = React.lazy(() => import("./views/pages/onlinemall_web3/Exchange"));
const NFT = React.lazy(() => import("./views/pages/onlinemall_web3/NFT"));

const routes = [
  // accounts
  { path: "/", exact: true, name: "Home", element: Home },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/login", exact: true, name: "login", element: Login },
  { path: "/logout", exact: true, name: "logout", element: Logout },
  { path: "/lost", exact: true, name: "lostpwd", element: LostPWD },
  { path: "/register", exact: true, name: "register", element: Register },
  { path: "/account/info", name: "personaldata", element: Psernal },
  { path: "/account/wallet", name: "wallet", element: Wallet },
  { path: "/account/production", name: "production", element: Production },
  { path: "/account/asset", name: "asset", element: Asset },
  { path: "/account/transfer", name: "transfer", element: Transfer },
  // 5GStation
  { path: "/5G/management", name: "Management", element: Management },
  { path: "/5G/maintenance/record", name: "MaintenanceRecord", element: MaintenanceRecord },
  // PowerBox
  { path: "/PB/management", name: "Management_PB", element: Management_PB },
  { path: "/PB/maintenance/record", name: "MaintenanceRecord_PB", element: MaintenanceRecord_PB },
  { path: "/PB/bill", name: "Bill_PB", element: Bill_PB },
  // ChargeStation
  { path: "/CS/receipt", name: "Receipt_CS", element: Receipt_CS },
  // Order
  { path: "/orderlist", name: "orderlist", element: OrderList },
  { path: "/shoppingcart", name: "shoppingcart", element: ShoppingCart },
  // Main Product
  { path: "/production", name: "production", element: MainProduct },
  // ChargeStation Front
  { path: "/CSFront", name: "Front_CSF", element: Front_CSF },
  // exchange
  { path: "/web3/exchange", name: "exchange", element: Exchange },
  { path: "/web3/nft", name: "nft", element: NFT },
  { path: "/quotation", name: "quotation", element: quotation },
];

export default routes;
