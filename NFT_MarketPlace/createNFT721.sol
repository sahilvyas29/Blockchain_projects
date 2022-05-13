//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract createNFT721 is ERC721URIStorage,Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenID;
    event log(string message,uint id);
    constructor(string memory NFT_NAME,string memory NFT_SYMBOL) ERC721(NFT_NAME,NFT_SYMBOL)
    {
    }
    
    function mint(address MINT_TO,string memory URI) external onlyOwner{
        _tokenID.increment();
        uint tokenID=_tokenID.current();
         _mint(MINT_TO,tokenID);
         _setTokenURI(tokenID,URI);
         emit log("Token Id: ",tokenID);
         
    }

}
