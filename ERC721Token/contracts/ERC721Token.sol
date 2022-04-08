//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import "hardhat/console.sol";
contract ERC721Token is ERC721URIStorage
{
    uint256  public tokenCounter;
    event SendID(uint256 newItemID);

    mapping(address=>uint256) public records;
    constructor(string memory name,string memory symbol) ERC721(name,symbol)
    {
        tokenCounter=0;
    }

    function createMyNFT(string memory tokenUri) public returns(uint256)
    {
        uint256 newItemId = tokenCounter;
    
        _safeMint(msg.sender,newItemId);
        _setTokenURI(newItemId,tokenUri);
        tokenCounter+=1;
        records[msg.sender]+=1;
        console.log("%s",records[msg.sender]);
        emit SendID(newItemId);
        return newItemId;
    }


}
