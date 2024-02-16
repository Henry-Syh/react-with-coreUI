import { storge, getAuthToken } from "../utils";
import { BaseURL } from "./config";

export class quotationAPI {
    // static fetch_quotation_by_date = { url: BaseURL + "/quotation/fetch?date=", method: "GET" };
    static fetch_quotation = { url: BaseURL + "/quotation/fetchQuotation/", method: "GET" };
    static fetch_BTCtoDCTWQt = { url: BaseURL + "/quotation/calculate/BTCtoDCTW?dctw=", method: "GET" };
    static fetch_currentAllQt = { url: BaseURL + "/quotation/fetch/currentAllQt", method: "GET" };


    static async fetch_price_API(currency) {
        let token = getAuthToken();
        let resp = await fetch(quotationAPI.fetch_quotation.url + currency, {
            method: quotationAPI.fetch_quotation.method,
            headers: {
                "Content-Type": "application/json",
                "Language": storge.getStorge(storge.LANG),
                Authorization: "Bearer " + token,
            }
        });

        if (resp.ok) {
            let result = resp.json()
            return result
        }
        else { console.log("Error Reading data " + resp.text); }
    }

    static async fetch_current_all_quotation_API() {
        let token = getAuthToken();
        let resp = await fetch(quotationAPI.fetch_currentAllQt.url, {
            method: quotationAPI.fetch_currentAllQt.method,
            headers: {
                "Content-Type": "application/json",
                "Language": storge.getStorge(storge.LANG),
                Authorization: "Bearer " + token,
            }
        });

        if (resp.ok) {
            let result = resp.json()
            return result
        }
        else { console.log("Error Reading data " + resp.text); }
    }

    static async fetch_BTCtoDCTWQt_API(DCTW_Amount) {
        let token = getAuthToken();
        let resp = await fetch(quotationAPI.fetch_BTCtoDCTWQt.url + DCTW_Amount, {
            method: quotationAPI.fetch_BTCtoDCTWQt.method,
            headers: {
                "Content-Type": "application/json",
                "Language": storge.getStorge(storge.LANG),
                Authorization: "Bearer " + token,
            }
        });

        if (resp.ok) {
            let result = resp.json()
            return result
        }
        else { console.log("Error Reading data " + resp.text); }
    }
}