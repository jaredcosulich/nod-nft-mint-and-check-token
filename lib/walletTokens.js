const walletTokens = async (contract, walletAddress) => {
  const walletTransfersFrom = await contract.queryFilter(contract.filters.Transfer(walletAddress))
  const walletTransfersTo = await contract.queryFilter(contract.filters.Transfer(null, walletAddress))
  const allWalletTransfers = [...walletTransfersFrom, ...walletTransfersTo].sort(
    (a, b) => a.blockNumber - b.blockNumber
  )
  const tokenIdsMap = {}
  for (const transfer of allWalletTransfers) {
    if (transfer.args.to === walletAddress) {
      tokenIdsMap[transfer.args.tokenId] = true
    } else {
      delete tokenIdsMap[transfer.args.tokenId]
    }
  }
  return Object.keys(tokenIdsMap)
}

export default walletTokens;