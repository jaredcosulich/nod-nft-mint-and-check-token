import initiateMintWithURIAndPrice from './initiateMintWithURIAndPrice.js';
import waitForContractTransactionToComplete from './waitForContractTransactionToComplete.js';

const mintWithLifecycleHooks = async ({
  contract,
  provider,
  metadataUri,
  mintPriceInWei,
  onTransaction,
  onMint,
  onFailure
}) => {
  try {
    const mintTxn = await initiateMintWithURIAndPrice(
      contract,
      provider,
      metadataUri, 
      mintPriceInWei
    );

    onTransaction(mintTxn);

    await waitForContractTransactionToComplete(mintTxn);

    if (onMint) {
      onMint()
    }
  } catch (error) {
    let code = (error.error || error).code
    
    if (!code) {
      throw error;
    }    
    
    onFailure(code)
  }
}

export default mintWithLifecycleHooks;