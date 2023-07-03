import { ConnectWallet, MediaRenderer } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import {
  Container,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Box,
  SimpleGrid,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FEATURES_IMAGE_URL, HERO_IMAGE_URL } from '../const/addresses'
import FeatureCard from '../components/FeatureCard'
import Events from '../components/Events'

const Home: NextPage = () => {
  return (
    <Container maxW={'1440px'} py={4}>
      <Flex flexDirection={'row'} h={'75vh'}>
        <Flex flexDirection={'column'} justifyContent={'center'} w={'60%'}>
          <Stack spacing={4}>
            <Heading fontSize={'xl'}>Transfer Token</Heading>
            <Heading fontSize={'6xl'}>
              Send tokens to your friends and family with ease.
            </Heading>
            <Text fontSize={'xl'}>
              Select from a selection of tokens to transfer to your friends and
              family. Write a message to go along with your token transfer.
              Connect your wallet to get started now!
            </Text>
            <Link href={'/transfer'}>
              <Button colorScheme={'blue'}>Make a Transfer</Button>
            </Link>
          </Stack>
        </Flex>
        <Box>
          <MediaRenderer src={HERO_IMAGE_URL} height="100%" width="100%" />
        </Box>
      </Flex>

      <SimpleGrid columns={2} spacing={4} mt={4}>
        <Box>
          <MediaRenderer src={FEATURES_IMAGE_URL} height="100%" width="80%" />
        </Box>
        <Flex
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Stack spacing={4}>
            <FeatureCard
              step={'01'}
              title={'Select a token'}
              description={'Select from a list of verified tokens'}
            />
            <FeatureCard
              step={'02'}
              title={'Who to send to'}
              description={'Enter the wallet address of the recipient'}
            />
            <FeatureCard
              step={'03'}
              title={'Write a message'}
              description={'Write a message to go along with'}
            />
          </Stack>
        </Flex>
      </SimpleGrid>
      <Events />
    </Container>
  )
}

export default Home
