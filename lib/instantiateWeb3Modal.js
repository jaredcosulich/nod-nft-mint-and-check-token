import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const instantiateWeb3Modal = (infuraId, network="rinkeby") => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, 
      options: {
        infuraId: infuraId
      }
    }
  };

  return new Web3Modal({
    providerOptions,
    network: network,
    cacheProvider: false,
    disableInjectedProvider: false
  })
}

export default instantiateWeb3Modal;