import detectEthereumProvider from '@metamask/detect-provider';
import { getAuthToken } from "../utils";
import { BaseURL, geth_provider, Company_address } from "../webAPI/config";
const Web3 = require("web3");

export class contractCls {
  static fetchAddress = { url: BaseURL + "/contract/allAddress", method: "GET" };

  BTC_ADDRESS;
  BTC_ABI;
  DCTW_ADDRESS;
  DCTW_ABI;
  NFT_ADDRESS;
  NFT_ABI;

  constructor() { }

  static async init() {
    let cls = new contractCls()
    let token = getAuthToken();

    let resp = await fetch(contractCls.fetchAddress.url, {
      method: contractCls.fetchAddress.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    });

    if (resp.ok) {
      let data = (await resp.json()).data;

      if (typeof(data.DCTW) != "undefined"){
        cls.DCTW_ADDRESS = data.DCTW.address;
        cls.DCTW_ABI = data.DCTW.abi;
      } else {
        cls.DCTW_ADDRESS = "None";
        cls.DCTW_ABI = "None";
      }
      
      if (typeof(data.NFT) != "undefined"){
        cls.NFT_ADDRESS = data.NFT.address;
        cls.NFT_ABI = data.NFT.abi;
      } else {
        cls.NFT_ADDRESS = "None";
        cls.NFT_ABI = "None";
      }

    }
    else { resp.text().then(() => { console.log("Error Reading data " + resp.text()); }) }


    return cls;
  }

}

export const provider = {
  geth: geth_provider,
  metamask: window.ethereum
}

export class _web3 {

  constructor(_provider) {
    this.provider = _provider;
    this.w3 = new Web3(_provider);
    this.contractAddr = null;
    this.contractABI = null;

    this.Company = Company_address;
  }

  static init(_provider) {
    return (async function () {
      // 如果不是geth則初始化metamask
      if (_provider != provider.geth) { await maskInit(); }
      let w3 = new _web3(_provider);
      return w3;
    }())
  }

  /**取合約實例 */
  async getContractInst() {
    if (this.contractAddr == null) {
      console.error("未設定contractAddr");
      return null;
    }
    if (this.contractABI == null) {
      console.error("未設定contractABI");
      return null;
    }
    return new this.w3.eth.Contract(this.contractABI, this.contractAddr);
  }

  async toWei(amount) { return this.w3.utils.toWei(amount, 'ether') }
  async fromWei(amount) { return this.w3.utils.fromWei(amount, 'ether') }
  async toCheckSum(address) { return this.w3.utils.toChecksumAddress(address); }
  async getBalance(walletAddr) {
    let balance = 0;

    await this.w3.eth.getBalance(walletAddr).then(
      (_balance) => {
        balance = _balance;
      },
      (_err) => {
        alert(_err);
      },
    );

    return balance;
  };

  async createWallet() {
    let info = await this.w3.eth.accounts.create()
    console.log(info);
    return info;
  };

}

/*****************************************/
/* 取得目前指定錢包                            */
/*****************************************/
let currentAccount = null;
export const get_currentAccount = async () => {
  return currentAccount;
}

export const addNetwork = async () => {
  let result = await window.ethereum.request({
    "method": 'wallet_addEthereumChain',
    "params": [
      {
        "chainId": "0x469c",
        "chainName": "Company_https",
        "rpcUrls": ["https://192.168.0.148"],
        "iconUrls": [
          "https://static.104.com.tw/b_profile/cust_picture/1881/130000000151881/logo.jpg?v=20220721120316",
        ],
        "nativeCurrency": {
          "name": "ETH",
          "symbol": "ETH",
          "decimals": 18
        }
      }
    ]
  });
  if (result == null) alert("Add network success");
}



/****************private area**************/

// const get_contract_abi = async (contractAddr) => {
//   const contents = require('./contract/' + contractAddr + '.json');
//   return contents.abi;
// }

/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

const maskInit = async () => {
  const provider = await detectEthereumProvider();

  if (provider) {
    await startApp(provider); // Initialize your app
    await connect();

    currentAccount = await get_wallet();
    console.log("currentAccount:" + currentAccount);

  } else {
    console.log('Please install MetaMask!');
  }
}

const startApp = async (provider) => {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }
  // Access the decentralized web!
}

const get_wallet = async () => {
  return ethereum
    .request({ method: 'eth_accounts' })
    .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    });
}

const handleAccountsChanged = async (accounts) => {

  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  }
  else if (accounts[0] !== currentAccount) {
    console.log('handleAccountsChanged: ' + accounts);
    currentAccount = accounts[0];
    // Do any other work!
  }
}

const connect = async () => {
  await ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
}