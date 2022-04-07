//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
contract ERC20Token is ERC20,Ownable
{
      constructor() ERC20("Mytoken", "MT") {
        
    }

      function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function transferto(address to, uint256 amount) public
    {
         //payable(to).transfer(amount);
         transfer(to,amount);
    }

    function burn(address account,uint256 amount) public
    {
           _burn(account,amount);
    }

    function setSpendAllowance(address from,address to, uint256 amount) public
    {
            _spendAllowance(from, to, amount);
           
    }

         

}
