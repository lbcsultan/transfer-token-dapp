import { Card, Spinner, Stack, Text } from '@chakra-ui/react'
import {
  useAddress,
  useContract,
  useContractMetadata,
  useTokenBalance,
} from '@thirdweb-dev/react'

type Props = {
  tokenAddress: string
}

const BalanceCard: React.FC<Props> = ({ tokenAddress }) => {
  const address = useAddress()
  const { contract } = useContract(tokenAddress)
  const { data: contractMetadata, isLoading: isContractMetadataLoading } =
    useContractMetadata(contract)
  const { data: balance, isLoading: isBalanceLoading } = useTokenBalance(
    contract,
    address
  )

  return (
    <Card
      p={4}
      width={'100%'}
      height={'100%'}
      border={'1px solid '}
      borderColor={'gray.100'}
    >
      {!isContractMetadataLoading ? (
        <Stack textAlign={'center'}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            {contractMetadata?.symbol}
          </Text>
          <Text>Balance:</Text>
          {!isBalanceLoading ? (
            <Text fontSize={'3xl'} fontWeight={'bold'}>
              {balance?.displayValue}
            </Text>
          ) : (
            <Spinner />
          )}
        </Stack>
      ) : (
        <Spinner />
      )}
    </Card>
  )
}

export default BalanceCard
