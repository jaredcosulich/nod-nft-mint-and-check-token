import {
  instantiateContract,
  instantiateWeb3Modal,
  initiateMintWithURIAndPrice,
  humanReadableMetamaskError,
  providerSignerHasToken,
  waitForContractTransactionToComplete,
  mintWithLifecycleHooks
} from '.'

import {
  SimpleURIAndPriceNFTWithWithdrawalRoyalty
} from '../contracts'

const NFTMintAndCheckToken = {
  lib: {
    instantiateContract,
    instantiateWeb3Modal,
    initiateMintWithURIAndPrice,
    humanReadableMetamaskError,
    providerSignerHasToken,
    waitForContractTransactionToComplete,
    mintWithLifecycleHooks
  },
  contracts: {
    SimpleURIAndPriceNFTWithWithdrawalRoyalty
  }
}

export default NFTMintAndCheckToken;