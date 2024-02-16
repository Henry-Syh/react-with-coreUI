import { CButton } from "@coreui/react";
import { Fragment, useState } from "react";
import { _web3, provider } from "../../../web3/tools";
import { addWalletAPI, getWalletAPI, updateWalletAPI } from "../../../webAPI/walletAPI";
import { btcAPI } from "../../../webAPI/btcAPI";
import { useTranslation } from "react-i18next";

export default function Wallet() {
	// 翻譯用hook
  const { t } = useTranslation();

	const [myWallet, setMyWallet] = useState([]);
	const [newWallet, setNewWallet] = useState("");
	const [loading, setLoading] = useState(false);

	const shbtnHandler = async () => {
		setLoading(true);
		let result = await getWalletAPI();

		if (result.rCode == '0001') { setMyWallet(result.data); }
		else
			alert(result.rCodeDesc + '.' + result.msg);
		setLoading(false);
	};

	const addbtnHandler = async () => {
		setLoading(true);
		let _w3 = await _web3.init(provider.geth);
		let info = await _w3.createWallet();

		let param = { type: 'ETH', address: info.address, pk: info.privateKey }
		let result = await addWalletAPI(param);

		console.log(result);

		setNewWallet({ ...info });

		if (result.rCode == '0001') { setMyWallet(result.data); }
		else { alert(result.rCodeDesc + '.' + result.msg); }

		setLoading(false);
	};

	const delBtnHandler = async (addr) => {
		setLoading(true);
		let param = { address: addr, enable: false }
		let result = await updateWalletAPI(param)
		if (result.rCode == '0001') { setMyWallet(result.data); }
		else { alert(result.rCodeDesc + '.' + result.msg); }
		setLoading(false);
	}

	const networkHandler = async () => {
		let _w3 = await _web3.init(provider.metamask);
	}

	const newBtcBtnHandler = async () => {
		const api = new btcAPI();
		let result = await api.createWallet();

		if (result.rCode != '0001') { alert(result.rCodeDesc + '.' + result.msg); return; }

		let data = result.data.result;
		let passphrase = data.passphrase;
		let wallet_addr = data.wallet_addr;
		let wallet_name = data.wallet_name;

		setNewWallet({address:data.wallet_addr, privateKey:data.passphrase});
	}

	return (
		<div>
			<div>
				{/* <button onClick={networkHandler}>Network</button> */}
				<h3>{t('wallettitle-wallet')}</h3>
				<CButton color="primary" variant="outline" className="me-md-2" onClick={addbtnHandler}>{t('newethbtn-wallet')}</CButton>
				<CButton color="primary" variant="outline" className="me-md-2" onClick={newBtcBtnHandler}>{t('newbtcbtn-wallet')}</CButton>
				<p>{t('address-wallet')}: {newWallet == "" ? "" : newWallet.address}</p>
				<p color="red">{t('privatekey-wallet')}: {newWallet == "" ? "" : newWallet.privateKey}</p>
			</div>
			{/* <div>
				<h3>My wallet</h3>
				<button onClick={shbtnHandler}>show my wallet</button>
				{
					loading ?
						(
							<div className="loader-container">
								<div className="spinner"></div>
							</div>
						)
						:
						(
							myWallet.map((wallet, idx) => {
								if (wallet.enable) {
									return (
										<Fragment key={idx}>
											<div>
												<label>錢包{idx + 1}</label>
												<p>Type: {wallet.type}</p>
												<p>Address: {wallet.address}</p>
												<p>balance: {wallet.balance}</p>
												<button color="red" onClick={() => delBtnHandler(wallet.address)}>DELETE</button>
												<hr />
											</div>
										</Fragment>
									)
								}
							})
						)
				}

			</div> */}
		</div>
	);
}
