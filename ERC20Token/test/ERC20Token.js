const { inputToConfig } = require("@ethereum-waffle/compiler");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Token Contract", function () {
    let owner, ERC20Token, erc20token, addr1;

    it("Only deploy our contract", async function () {
        ERC20Token = await ethers.getContractFactory("ERC20Token");
        [owner, addr1] = await ethers.getSigners();

        erc20token = await ERC20Token.deploy();

        console.log("Deployed on ", erc20token.address);
    });

    describe("Deployment check", function () {

        it("should check the right owner", async function () {
            expect(await erc20token.owner()).to.equal(owner.address);                       //to check if the right owner is assigned

        });

        it("should supply tokens to owner", async function () {
            erc20token.mint(owner.address, 250);
            expect(await erc20token.balanceOf(owner.address)).to.equal(250);                  //to check whether owner is getting his tokens or not

        });
    });

    describe("Transfer token check", function () {

        it("Should check if tokens are getting transfer from owner to other contract", async function () {


            erc20token.transferto(addr1.address, 100);                                         //transfering balance from owner to other account

            expect(await erc20token.balanceOf(addr1.address)).to.equal(100);
            console.log(addr1.address);

        });

        it("TransferFrom Function check", async function () {
            //Transfer from function
            const addr1previousBalance = await erc20token.balanceOf(addr1.address);
            erc20token.approve(addr1.address, 50);
            await erc20token.connect(addr1).transferFrom(owner.address, addr1.address, 50);
            expect(await erc20token.balanceOf(addr1)).to.equal(addr1previousBalance + 50);
        });

        it("Burn tokens check", async function () {
            const previousBalance = await erc20token.balanceOf(owner.address);
            erc20token.burn(owner.address, 20);

            expect(await erc20token.balanceOf(owner.address)).to.equal(previousBalance - 20);
        });


    });
});