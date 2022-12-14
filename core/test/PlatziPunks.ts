import type { PlatziPunks } from '../typechain-types'
import { ethers } from 'hardhat'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'

describe('PlatziPunks', () => {
  async function deployPlatziPunksFixture (): Promise<PlatziPunks> {
    const baseFee = '100000000000000000'
    const gasPriceLink = '1000000000'
    const keyHash =
      '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc'
    const maxSupply = 3

    const VRFCoordinatorV2MockFactory = await ethers.getContractFactory(
      'VRFCoordinatorV2Mock'
    )
    const VRFCoordinatorV2Mock = await VRFCoordinatorV2MockFactory.deploy(
      baseFee,
      gasPriceLink
    )

    const transaction = await VRFCoordinatorV2Mock.createSubscription()
    const { events } = await transaction.wait()

    if (events === undefined) {
      throw new Error('createSubscription transaction has not emitted events')
    }

    const subscriptionId = ethers.BigNumber.from(events[0].topics[1])
    const PlatziPunksFactory = await ethers.getContractFactory('PlatziPunks')
    const PlatziPunks = await PlatziPunksFactory.deploy(
      VRFCoordinatorV2Mock.address,
      subscriptionId,
      keyHash,
      maxSupply
    )

    await VRFCoordinatorV2Mock.addConsumer(subscriptionId, PlatziPunks.address)

    return PlatziPunks
  }

  describe('Deployment', () => {
    it('should set max supply', async () => {
      const contract = await loadFixture(deployPlatziPunksFixture)

      await Promise.all([contract.mint(), contract.mint(), contract.mint()])

      await expect(contract.mint()).to.be.revertedWith('No PlatziPunks left')
    })
  })

  describe('Minting', () => {
    it('should mint a new token and assign it to the creator', async () => {
      const contract = await loadFixture(deployPlatziPunksFixture)
      const [owner, user] = await ethers.getSigners()

      await contract.mint()
      await contract.connect(user).mint()

      const ownerOf1 = await contract.ownerOf(1)
      const ownerOf2 = await contract.ownerOf(2)

      expect(ownerOf1).to.equal(owner.address)
      expect(ownerOf2).to.equal(user.address)
    })

    it(
      'should emit an event with the token id each time a new token is minted',
      async () => {
        const contract = await loadFixture(deployPlatziPunksFixture)

        await expect(contract.mint()).to.emit(contract, 'Mint').withArgs(1)
      }
    )
  })

  describe('tokenURI', () => {
    it('should return valid metadata', async () => {
      const contract = await loadFixture(deployPlatziPunksFixture)

      await contract.mint()

      const tokenURI = await contract.tokenURI(1)
      const token = tokenURI.replace('data:application/json;base64,', '')
      const metadata = JSON.parse(
        Buffer.from(token, 'base64').toString('ascii')
      )

      expect(metadata).to.have.all.keys('name', 'description', 'image')
    })
  })
})
