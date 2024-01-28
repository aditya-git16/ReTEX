import { useMetaMask } from '../hooks/useMetaMask'
import { formatChainAsNum } from '../utils/index'

export const Display = () => {

  const { wallet } = useMetaMask()

  return (
    <div className="display flex flex-col items-center justify-center">
      {wallet.accounts.length > 0 && (
        <>
          <div className="mb-4">Wallet Accounts: {wallet.accounts[0]}</div>
          <div className="mb-4">Wallet Balance: {wallet.balance}</div>
          <div className="mb-4">Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      )}
    </div>
  )
}