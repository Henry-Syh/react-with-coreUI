import { storge } from "src/utils";

/**
 * EC2
 * **/
export const BaseURL = process.env.REACT_APP_API_BASE_URL;

/**
 * blockchain
 * **/
export const geth_provider = process.env.REACT_APP_GETH_PROVIDER;
export const Company_address = process.env.REACT_APP_GETH_ADDRESS;

// language
export const language = storge.getStorge(storge.LANG)

// System for SideBar access(根據不同環境建立不同的SideBar nav)
export const nowSystem = process.env.REACT_APP_SYSTEM