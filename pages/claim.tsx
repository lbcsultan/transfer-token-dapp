import {
  MediaRenderer,
  Web3Button,
  useContract,
  useContractMetadata,
} from '@thirdweb-dev/react'
import {
  CLAIM_TOKEN_CONTRACT_ADDRESS,
  CLAIM_TOKEN_IMAGE,
} from '../const/addresses'
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'

export default function ClaimPage() {
  const { contract } = useContract(CLAIM_TOKEN_CONTRACT_ADDRESS)
  const { data: contractMetadata } = useContractMetadata(contract)

  const claimAmount = 10 // Claim amount At a time
  const toast = useToast()

  return (
    <Container maxW={'1440px'} h={'80vh'}>
      <SimpleGrid columns={2} spacing={10}>
        <Flex>
          <MediaRenderer src={CLAIM_TOKEN_IMAGE} height="60%" width="60%" />
        </Flex>
        <Flex flexDirection={'column'} justifyContent={'center'}>
          <Stack spacing={4}>
            <Heading>Claim ${contractMetadata?.symbol}</Heading>
            <Text fontSize={'xl'}>
              Claim your FREE ${contractMetadata?.symbol}. Just pay for the gas
              fee to claim your {contractMetadata?.symbol}. Use this token to
              test and try the transfer feature of this dApp.
            </Text>
            <Text fontWeight={'bold'}>
              Claim {claimAmount} ${contractMetadata?.symbol} Tokens
            </Text>
            <Box>
              <Web3Button
                contractAddress={CLAIM_TOKEN_CONTRACT_ADDRESS}
                action={(contract) => contract.erc20.claim(claimAmount)}
                onSuccess={() =>
                  toast({
                    title: 'Claim Successful',
                    description: 'You have successfully claimed tokens!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                }
              >
                Claim Tokens
              </Web3Button>
            </Box>
          </Stack>
        </Flex>
      </SimpleGrid>
    </Container>
  )
}
