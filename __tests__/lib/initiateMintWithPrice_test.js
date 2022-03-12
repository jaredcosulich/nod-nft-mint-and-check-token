import initiateMintWithPrice from "../../lib/initiateMintWithPrice.js";
    
describe('initiateMintWithPrice', () => {
    const mockSigner = jest.fn()
    const mockProvider = {
      getSigner: jest.fn(() => mockSigner)
    }

    const pendingTransaction = jest.fn()
    const mockContract = {
      connect: jest.fn(() => mockContract),
      mint: jest.fn(() => pendingTransaction)
    }

    const mintPriceInWei = '1000000';

    let transaction;
    beforeEach(async () => {
      transaction = await initiateMintWithPrice(
        mockContract, 
        mockProvider, 
        mintPriceInWei
      );        
    })

    it('connects to the contract', async () => {
      expect(mockContract.connect).lastCalledWith(mockSigner)
    })

    it('should pass ether to mint', async () => {
      expect(mockContract.mint).lastCalledWith({ "value": mintPriceInWei });
    });

    it('should return a pending minting transaction', async () => {
      expect(transaction).toBe(pendingTransaction);
    });

    it('should throw an error if the contract does not implement balanceOf', async () => {
      mockContract.mint = null;

      await expect(initiateMintWithPrice(mockContract, mintPriceInWei)).rejects.toEqual(
        'Contract must implement mint().',
      );
    })
});