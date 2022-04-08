const {ethers} = require("hardhat");



async function main(){
    const[deployer] = await ethers.getSigners();

    const ERC721TOKEN = await ethers.getContractFactory("ERC721Token");

    const erc721token = await ERC721TOKEN.deploy();

   // await erc20token.deployed();

    console.log("deployed on address",erc721token.address);

}

main()
.then(()=>process.exit(0))
.catch((error)=>{ console.error(error);
process.exit(1);
});