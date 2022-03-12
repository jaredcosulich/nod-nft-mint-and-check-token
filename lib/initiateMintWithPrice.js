const initiateMintWithPrice = async (contract, provider, mintPriceInWei) => {
  if (!contract.mint) {
    throw "Contract must implement mint()."
  }

  const signer = provider.getSigner();
  const connectedContract = contract.connect(signer)
  return await connectedContract.mint(
    { value: mintPriceInWei }
  );
}

export default initiateMintWithPrice;