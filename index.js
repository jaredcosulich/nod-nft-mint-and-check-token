import instantiateContract from './lib/instantiateContract.js';
import instantiateWeb3Modal from './lib/instantiateWeb3Modal.js';
import initiateMintWithURIAndPrice from './lib/initiateMintWithURIAndPrice.js';
import humanReadableMetamaskError from './lib/humanReadableMetamaskError.js';
import providerSignerHasToken from './lib/providerSignerHasToken.js';
import waitForContractTransactionToComplete from './lib/waitForContractTransactionToComplete.js';
import mintWithLifecycleHooks from './lib/mintWithLifecycleHooks.js';
import walletHasToken from './lib/walletHasToken.js';

import SimpleURIAndPriceNFTWithWithdrawalRoyalty from './contracts/SimpleURIAndPriceNFTWithWithdrawalRoyalty.js'

const NFTMintAndCheckToken = {
  lib: {
    instantiateContract,
    instantiateWeb3Modal,
    initiateMintWithURIAndPrice,
    humanReadableMetamaskError,
    mintWithLifecycleHooks,
    providerSignerHasToken,
    waitForContractTransactionToComplete,
    walletHasToken
  },
  contracts: {
    SimpleURIAndPriceNFTWithWithdrawalRoyalty
  }
}

export default NFTMintAndCheckToken;