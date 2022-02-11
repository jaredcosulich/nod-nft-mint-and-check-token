## Overview

This is an NPM package that wraps up a number of javascripts functions that are useful helpers to:

- Connect to a user's wallet
- Check that the user is on the correct network
- Instantiate a contract using the contrat's address and ABI
- Mint a token
- Check if a user already has a token

This functionality is used in this [simple demo](https://jaredcosulich.github.io/SimpleNFTGatedContent/) (checkout the [github](https://github.com/jaredcosulich/NFTMintAndCheckTokenDemo) repository to see usage - specifically the file [WalletHasTokenFlowAPI](https://github.com/jaredcosulich/NFTMintAndCheckTokenDemo/blob/main/components/WalletHasTokenFlowAPI.jsx) contains most of the usage) that allows a user to connect their wallet, checks to see if their wallet already contains an NFT, and, if it does allows the user to access some placeholder gated content. If the user does not already have the NFT then they can mint one.

## Primary Functions

### instantiateContract

instantiateContract(contractJSON, provider)

instantiateContract takes an object containing the contract json (contract network, contract address, and contract ABI) and a [ethers provider](https://docs.ethers.io/v5/api/providers/) which can be obtained using [ethers.js](https://www.npmjs.com/package/ethers) or [web3modal](https://www.npmjs.com/package/web3modal).

It will then instantiate a contract that can be read from (queried) or written to (which will require paying gas).

### mintWithLifecycleHooks

await mintWithLifecycleHooks = ({
contract,
provider,
metadataUri,
mintPriceInWei,
onTransaction,
onMint,
onFailure
})

mintWithLifecycleHooks takes a contract, a provider, a uri that points to artwork or the metadata for artwork, and the price in Wei that will be provided to the minting contract. It also takes callbacks that will be triggered during the minting lifecycle.

It encapsulates the full lifecycle of minting. The callbacks onTransaction, onMint, and onFailure are called when the minting is in progress, when it succeeds, or when it fails. onTransaction is called with the in progress transaction.

### providerSignerHasToken

await providerSignerHasToken(provider, contract)

providerSignerHasToken takes a provider and a contract and checks the wallet of the user to see if they have the token in their wallet.

## Secondary Functions

These functions are used by the primary functions and can be used separately if necessary.

### humanReadableMetamaskError

humanReadableMetamaskError(code)

Takes a metamask error code and returns a human-readable error message.

### initiateMintWithURIAndPrice

await initiateMintWithURIAndPrice(contract, provider, metadataUri, mintPriceInWei)

initiateMintWithURIAndPrice takes a contract, a provider, a uri that points to artwork or the metadata for artwork, and the price in Wei that will be provided to the minting contract.

It will then mint the NFT and pass back the pending transaction.

### waitForContractTransactionToComplete

await waitForContractTransactionToComplete()

A very simple helper method that takes a contract transactionn and waits for it to complete.
