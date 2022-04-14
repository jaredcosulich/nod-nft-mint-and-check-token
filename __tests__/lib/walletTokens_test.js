import walletTokens from "../../lib/walletTokens.js";
    
describe('walletTokens', () => {
  const addressWithNoTokens = 'WALLET_WITH_NO_TOKENS'
  const addressWithToken = 'WALLET_WITH_TOKEN'
  const addressWithMultipleTokens = 'WALLET_WITH_MULTIPLE_TOKENS'
  const addressWithMultipleTokensAndOneSold = 'WALLET_WITH_MULTIPLE_TOKENS_AND_ONE_WITHDRAWN'
  const addressWithMultipleTokensAndOneSoldAndBoughtBack = 'WALLET_WITH_MULTIPLE_TOKENS_AND_ONE_WITHDRAWN_AND_ONE_BOUGHT_BACK'
  
  const transfer = (blockNumber, from, to, tokenId) => ({ 
    blockNumber, 
    args: {
      from, 
      to, 
      tokenId 
    }
  })

  let mockContract = {
    queryFilter: jest.fn(
      (filter) => {
        let result = [];
        switch (filter.to) {
          case addressWithToken:
            result = [transfer(1, null, addressWithToken, '1')];
            break;
          case addressWithMultipleTokens:
            result = [1, 2, 3].map(
              i => transfer(i, null, addressWithMultipleTokens, i.toString())
            );
            break;
          case addressWithMultipleTokensAndOneSold:
            result = [1, 2, 3].map(
              i => transfer(i*2, null, addressWithMultipleTokensAndOneSold, i.toString())
            );
            break;
          case addressWithMultipleTokensAndOneSoldAndBoughtBack:
            result = [1, 2, 3].map(
              i => transfer(i*2, null, addressWithMultipleTokensAndOneSoldAndBoughtBack, i.toString())
            );
            result.push(transfer(8, 'OTHER_ADDRESS', addressWithMultipleTokensAndOneSoldAndBoughtBack, '1'));
            break;
          default:
            break;
        }

        switch (filter.from) {
          case addressWithMultipleTokensAndOneSold:
            result.push(transfer(5, addressWithMultipleTokensAndOneSold, 'OTHER_ADDRESS', '1'))
            break;
          case addressWithMultipleTokensAndOneSoldAndBoughtBack:
            result.push(transfer(5, addressWithMultipleTokensAndOneSoldAndBoughtBack, 'OTHER_ADDRESS', '1'))
            break;
          default:
            break;
        }

        return Promise.resolve(result);
      }
    ),
    filters: {
      Transfer: (toWalletAddress, fromWalletAddress) => {
        return {
          to: toWalletAddress,
          from: fromWalletAddress
        }
      }
    }
  }

  it('should return an empty array if the wallet has no token', async () => {
    const result = await walletTokens(mockContract, addressWithNoTokens);
    expect(result).toEqual([]);
  });

  it('should return the token id that is in the users wallet', async () => {
    const result = await walletTokens(mockContract, addressWithToken);
    expect(result).toEqual(['1']);
  });

  it('should return multiple token ids if the user has multiple tokens in their wallet', async () => {
    const result = await walletTokens(mockContract, addressWithMultipleTokens);
    expect(result).toEqual(['1', '2', '3']);
  });

  it('should recognize if a token has been sold', async () => {
    const result = await walletTokens(mockContract, addressWithMultipleTokensAndOneSold);
    expect(result).toEqual(['2', '3']);
  });

  it('should recognize if a token has been sold and purchased back', async () => {
    const result = await walletTokens(mockContract, addressWithMultipleTokensAndOneSoldAndBoughtBack);
    expect(result).toEqual(['1', '2', '3']);
  });
});