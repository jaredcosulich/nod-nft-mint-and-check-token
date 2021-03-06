import initiateMintWithPrice from './initiateMintWithPrice.js';
import waitForContractTransactionToComplete from './waitForContractTransactionToComplete.js';

const mintWithLifecycleHooks = async ({
  contract,
  provider,
  mintPriceInWei,
  onTransaction,
  onMint,
  onFailure
}) => {
  try {
    const mintTxn = await initiateMintWithPrice(
      contract,
      provider,
      mintPriceInWei
    );

    if (onTransaction) {
      onTransaction(mintTxn);
    }
    
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