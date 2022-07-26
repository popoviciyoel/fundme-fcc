const { getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Funding...")
    const transactionReponse = await fundMe.withdraw()
    await transactionReponse.wait(1)
    console.log("Got it back")
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
