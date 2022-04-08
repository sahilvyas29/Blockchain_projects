const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("ERC721 Token", function () {
  let owner, addr1, addr2, NFTToken, nfttoken, ItemId;

  // to get value from events
  async function getPastEventsFromReceipt(receipt, event) {
    const logs = receipt.events;
    let value;
    logs.forEach((log) => {
      if (log.event === event) {
        value = log.args;
      }
    });
    return value;

  }


  it("Should deploy contract", async function () {

    NFTToken = await ethers.getContractFactory("ERC721Token");

    [owner, addr1, addr2] = await ethers.getSigners();

    nfttoken = await NFTToken.deploy("White Tiger", "WHT");

    console.log("Deployed on address", nfttoken.address);

  });

  describe("Minting NFT", function () {
    it("Should mint NFT for owner", async function () {


      ItemId = await nfttoken.createMyNFT("https://jsonkeeper.com/b/H4ZU");  //saving the event value in ItemID
      ItemId = await ItemId.wait();
      //console.log("Item id",ItemId); 

      let eventId = await getPastEventsFromReceipt(ItemId, "SendID");
      //console.log("Event ID", Number(eventId.newItemID));

      NFTID = Number(eventId.newItemID);
      console.log(NFTID);


      // const getTokenName =  await nfttoken.name();  //await nfttoken.createMyNFT("https://jsonkeeper.com/b/H4ZU");
      // expect(getTokenId).to.equal(0);
    });
    it("Should check NFT name, symbol and URI", async function () {
      const getTokenName = await nfttoken.name();
      expect(getTokenName).to.equal("White Tiger");
      const tUri = await nfttoken.tokenURI(0);
      expect(tUri).to.equal("https://jsonkeeper.com/b/H4ZU");
      expect(await nfttoken.symbol()).to.equal("WHT");
    });
  });

  describe("Balance, Owner", function () {
    it("Should check balance of Address", async function () {
      const balanceOfUser = await nfttoken.records(owner.address);
      expect(await nfttoken.balanceOf(owner.address)).to.equal(balanceOfUser);


      //console.log("Item id 2",await getPastEventsFromReceipt(ItemId,"SendID"));

    });

    it("Should check owner of NFT", async function () {

      //console.log("ID", await nfttoken);
      expect(await nfttoken.ownerOf(NFTID)).to.equal(owner.address);
    });
  });


  describe("Transfer NFT function", function () {
    it("Should check if token is getting transferred", async function () {
      await nfttoken.transferFrom(owner.address, addr1.address, 0);
      expect(await nfttoken.ownerOf(0)).to.equal(addr1.address);
    });

    it("minting One more nft", async function () {
      await nfttoken.createMyNFT("https://jsonkeeper.com/b/H4ZU");
    });

    it("TranferFrom function", async function () {
      await nfttoken.approve(addr2.address, 1);
      await nfttoken.connect(addr2)["safeTransferFrom(address,address,uint256)"](owner.address, addr2.address, 1);           //Problem solved. 
      expect(await nfttoken.ownerOf(1)).to.equal(addr2.address);                                                       //safeTransferFrom is a overloaded function. 
                                                                                                                      //In ethers, the syntax to call an 
                                                                                                                      //overloaded contract function is different from the non-overloaded function.
    });


  });

});