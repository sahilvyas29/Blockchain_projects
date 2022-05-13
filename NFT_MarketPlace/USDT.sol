 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is ERC20 {
    constructor() ERC20("Dollar", "USD") {}

    function mint(address to,uint amount) external{
        uint _amount=amount*10**18;
          _mint(to,_amount);
    }
}
