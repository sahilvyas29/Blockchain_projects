//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract createNFT1155 is ERC1155, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenID;
   event log(string message,uint id);
    constructor() ERC1155("") {}

    function mint(address account,uint256 amount, bytes memory data,string memory URI)
        public
        onlyOwner
    {
        _tokenID.increment();
        uint tokenID=_tokenID.current();
        _mint(account, tokenID, amount, data);
        _setURI(URI);
        emit log("Your ID: ",tokenID);
    }

}
