const { assert } = require("chai")
const { ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", async function () {
          let fundMe, deployer
          const sendValue = ethers.utils.parseEther("1")
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })
          it("allows people to fund and withdraw", async function () {
              console.log("Value", sendValue.toString())
              await fundMe.fund({ value: sendValue })
              const startingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  "Starting funding balance should be should " +
                      startingFundMeBalance.toString()
              )
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })

// staging we're assuming we're on a testnet
