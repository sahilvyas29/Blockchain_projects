const {ethers} = require("hardhat");



async function main(){
    const[deployer] = await ethers.getSigners();

    const ERC20TOKEN = await ethers.getContractFactory("ERC20Token");

    const erc20token = await ERC20TOKEN.deploy();

   // await erc20token.deployed();

    console.log("deployed on address",erc20token.address);

}

main()
.then(()=>process.exit(0))
.catch((error)=>{ console.error(error);
process.exit(1);
});