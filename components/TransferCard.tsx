import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react'
import { TRANSFER_CONTRACT_ADDRESS } from '../const/addresses'
import { Box, Card, Flex, Heading, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import TokenSelection from './TokenSelection'
import TokenBalance from './TokenBalance'
import TransferButton from './TransferButton'

export default function TransferCard() {
  const address = useAddress()
  const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS)
  const { data: verifiedTokens, isLoading: isVerifiedTokensLoading } =
    useContractRead(contract, 'getVerifiedTokens')

  const [selectedToken, setSelectedToken] = useState('')
  const handleTokenSelection = (tokenAddress: string) => {
    setSelectedToken(tokenAddress)
  }

  const [formData, setFormData] = useState({
    receiver: '',
    amount: '',
    message: '',
  })
  const handleChange = (e: any, name: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }))
  }

  return (
    <Card w={'50%'} p={20}>
      <Heading>Transfer</Heading>

      <Text mt={4}>Select Token:</Text>
      <Flex flexDirection={'row'} mt={4}>
        {!isVerifiedTokensLoading &&
          verifiedTokens.map((tokenAddress: string) => (
            <Box
              key={tokenAddress}
              onClick={() => handleTokenSelection(tokenAddress)}
            >
              <TokenSelection
                tokenAddress={tokenAddress}
                isSelected={selectedToken === tokenAddress}
              />
            </Box>
          ))}
      </Flex>
      <TokenBalance tokenAddress={selectedToken} />
      <Text mt={4} fontWeight={'bold'}>
        Send To:
      </Text>
      <Input
        placeholder="0x0000000"
        type="text"
        value={formData.receiver}
        onChange={(event) => handleChange(event, 'receiver')}
      />
      <Text mt={4} fontWeight={'bold'}>
        Amount:
      </Text>
      <Input
        placeholder="0.0"
        type="number"
        value={formData.amount}
        onChange={(event) => handleChange(event, 'amount')}
      />
      <Text mt={4} fontWeight={'bold'}>
        Message:
      </Text>
      <Input
        placeholder="Add short message here."
        type="text"
        value={formData.message}
        onChange={(event) => handleChange(event, 'message')}
      />
      <Box mt={8}>
        {address ? (
          <TransferButton
            tokenAddress={selectedToken}
            receiver={formData.receiver}
            amount={formData.amount.toString()}
            message={formData.message}
          />
        ) : (
          <Text>Please connect your wallet to continue.</Text>
        )}
      </Box>
    </Card>
  )
}
