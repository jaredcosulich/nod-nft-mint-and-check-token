import mintWithLifecycleHooks from '../../lib/mintWithLifecycleHooks.js'
import initiateMintWithPrice from '../../lib/initiateMintWithPrice.js'
jest.mock('../../lib/initiateMintWithPrice')

describe("mintWithLifecycleHooks", () => {
  const contract = jest.fn()
  const provider = jest.fn()
  const pendingTransaction = {
    wait: jest.fn(() => ({}))
  }
  const onMint = jest.fn()
  const onTransaction = jest.fn()
  const onFailure = jest.fn()
  const mintPriceInWei = Math.pow(10, 16).toString()

  describe("with successful mint", () => {
    beforeEach(async () => {
      initiateMintWithPrice.mockReturnValueOnce(
        pendingTransaction
      )

      await mintWithLifecycleHooks({
        contract,
        provider,
        mintPriceInWei,
        onTransaction,
        onMint,
        onFailure
      })
    })

    afterEach(() => {
      [contract, provider, pendingTransaction.wait,
      onTransaction, onMint, onFailure].forEach(
        (mockFn) => mockFn.mockReset() 
      )
    })

    it("should initialize the minting process", () => {
      expect(initiateMintWithPrice.mock.calls).toHaveLength(1)
    })

    it('should call onTransaction when the transaction is pending', () => {
      expect(onTransaction).toHaveBeenCalledTimes(1)
    })

    it('should call onMint when complete', () => {
      expect(onMint).toHaveBeenCalledTimes(1)
    })
  })
  
  it('should report status and failure on error', async () => {
    initiateMintWithPrice.mockImplementation(() => {
      throw {code: 4001}
    });

    await mintWithLifecycleHooks({
      contract,
      provider,
      mintPriceInWei,
      onTransaction,
      onMint,
      onFailure
    })

    expect(onFailure).toHaveBeenCalledTimes(1)
  })

})