const hre = require("hardhat");

async function main() {
    const deployedContract = await hre.ethers.deployContract("ReTEX");
    await deployedContract.waitForDeployment();
    console.log(
        `${deployedContract.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});