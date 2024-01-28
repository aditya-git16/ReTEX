const hre = require("hardhat");

async function main() {
    const deployedContract = await hre.ethers.deployContract("ReTEX");
    console.log("Contract deployed to address:", deployedContract);
    console.log(
        `Contract Deployed to ${deployedContract.address}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});