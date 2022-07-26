// hardhat and localhost doesn't have any pricefeeds

// if were on a network that doesn't have any establsiehd pricefeed contracts we'll create mocks
const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // This is the set up to deploy something/contracts

    if (developmentChains.includes(network.name)) {
        console.log("Local Netowork detected! Deploying mocks.....")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER]
        })
        console.log("Mocks Deployed!")
        console.log(
            "-------------------------------------------------------------"
        )
    }
}

module.exports.tags = ["all", "mocks"]
