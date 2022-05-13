//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract NFT_Exchange{
    mapping(uint=>address) NFT721Sellers;
    mapping(uint=>address) NFT1155Sellers;
    mapping(uint=>uint) NFTPrice;
    mapping(uint=>uint) NFTPrice1155;
    mapping(uint=>uint) NFTAmount1155;
    mapping(uint=>uint) auctionTime;
    mapping(uint=>uint) auctionTime1155;
    uint highest_bid721;
    uint highest_bid1155;
    mapping(uint=>address) bidders721;
    mapping(uint=>address) bidders1155;
    uint[] bids721;
    uint[] bids1155;
    address public TokenContract721;
    address public TokenContract1155;
    address public USDTContract;
    

     constructor(address _TokenContract721,address _TokenContract1155,address _USDTContract)
     {
         TokenContract721=_TokenContract721;
         TokenContract1155=_TokenContract1155;
         USDTContract=_USDTContract;
     }

    function sendFunds721(uint getFund,uint ID) internal  //returns(bool)
    {
         uint ownerFund= getFund-((getFund*25)/1000);

         IERC20(USDTContract).transfer(NFT721Sellers[ID],ownerFund);
        //returns balanceOf();
    }

   function sendFunds1155(uint getFund,uint ID) internal  //returns(bool)
    {
         uint ownerFund= getFund-((getFund*25)/1000);

         IERC20(USDTContract).transfer(NFT721Sellers[ID],ownerFund);
        //returns balanceOf();
    }

    function sellNFT721(uint ID,uint price) external {
        
          require(IERC721(TokenContract721).ownerOf(ID)==msg.sender,"You are not owner of the NFT");
          IERC721(TokenContract721).transferFrom(msg.sender,address(this),ID);
          NFT721Sellers[ID]=msg.sender;
          NFTPrice[ID]=price;
    }

    function BuyNFT721(uint ID,uint Payment) external{
            require(NFTPrice[ID]>0,"NFT with this ID do not exist");
            require(NFTPrice[ID]<=Payment,"Your amount is lower than NFT Price");
            uint _Payment=Payment*10**18;
            IERC20(USDTContract).transferFrom(msg.sender,address(this),_Payment);
            IERC721(TokenContract721).transferFrom(address(this),msg.sender,ID);
            sendFunds721(_Payment,ID);
            NFT721Sellers[ID]=0x0000000000000000000000000000000000000000;
            NFTPrice[ID]=0;
    }

    function sellNFT1155(uint ID,uint amount,uint price) external
    {
        uint _amount = IERC1155(TokenContract1155).balanceOf(msg.sender,ID);
        require(amount<=_amount,"You are not the owner of NFT or you don't owe the amount of NFT");

        IERC1155(TokenContract1155).safeTransferFrom(msg.sender,address(this),ID,amount,"");
        NFT1155Sellers[ID]=msg.sender;
        NFTAmount1155[ID]=amount;
        NFTPrice1155[ID]=price;
        
    }

    function BuyNFT1155(uint ID,uint amount,uint payment) external
    {
                   require(NFTPrice1155[ID]>0,"NFT does not exist");
                   require((NFTPrice1155[ID]*amount)<=payment,"Your amount is lower than NFT price");
                   uint _payment=payment*10**18;
                   IERC20(USDTContract).transferFrom(msg.sender,address(this),_payment);
                   IERC1155(TokenContract1155).safeTransferFrom(address(this),msg.sender,ID,amount,"");
                    sendFunds1155(_payment,ID);

    }

    function Auction721(uint ID, uint minPrice,uint _time) external
    {
              require(IERC721(TokenContract721).ownerOf(ID)==msg.sender,"You are not owner of the NFT");
              require(NFTPrice[ID]==0,"this NFT is on sale");
              NFT721Sellers[ID]=msg.sender;
              auctionTime[ID]=block.timestamp+_time;
              NFTPrice[ID]=minPrice;
              highest_bid721=minPrice;
              IERC721(TokenContract721).transferFrom(msg.sender,address(this),ID);             

               
    }

    function Buy721Auction(uint ID,uint bid) external
    {
        require(block.timestamp<=auctionTime[ID],"Auction is over");
        require(bid>highest_bid721,"Your bid is lower than highest bid!");
            highest_bid721=bid;
            bidders721[bid]=msg.sender;
            bids721.push(bid);
            IERC20(USDTContract).transferFrom(bidders721[highest_bid721],address(this),highest_bid721*10**18);
            if(block.timestamp>auctionTime[ID])
            {
               IERC721(TokenContract721).transferFrom(address(this),bidders721[highest_bid721],ID);
               for(uint i=0; i<bids721.length-1;i++)
            {
                IERC20(USDTContract).transferFrom(address(this),bidders721[highest_bid721],bids721[i]*10**18);
                bidders721[bids721[i]]=0x0000000000000000000000000000000000000000;
                delete bids721[i];
            }
            sendFunds721(highest_bid721*10**18,ID);
            NFT721Sellers[ID]=0x0000000000000000000000000000000000000000;
            NFTPrice[ID]=0;
            }
     }

     function Auction1155(uint ID,uint amount,uint minPrice,uint _time) external{
      uint _amount = IERC1155(TokenContract1155).balanceOf(msg.sender,ID);
        require(amount<=_amount,"You are not the owner of NFT or you don't owe the amount of NFT");
        require(NFTPrice1155[ID]==0,"NFT is already on sale");
        NFT1155Sellers[ID]=msg.sender;
        auctionTime1155[ID]=block.timestamp+_time;
        highest_bid1155=minPrice*amount;
        NFTPrice1155[ID]=minPrice;
         IERC1155(TokenContract1155).safeTransferFrom(msg.sender,address(this),ID,amount,"");
     }
     
     function Buy1155Auction(uint ID,uint bid) external
     {
         require(bid>highest_bid1155,"Your bid is lower than highest bid!");
            highest_bid1155=bid;
            bidders1155[bid]=msg.sender;        
            bids1155.push(bid);
            IERC20(USDTContract).transferFrom(bidders1155[highest_bid1155],address(this),highest_bid1155*10**18);

            if(block.timestamp>auctionTime[ID])
            {
               IERC1155(TokenContract1155).safeTransferFrom(address(this),bidders1155[highest_bid1155],ID,IERC1155(TokenContract1155).balanceOf(address(this),ID),""); 
               for(uint i=0; i<bids1155.length-1;i++)
            {
                IERC20(USDTContract).transferFrom(address(this),bidders1155[highest_bid1155],bids1155[i]*10**18);
                bidders1155[bids1155[i]]=0x0000000000000000000000000000000000000000;
                delete bids1155[i];
            }
            sendFunds1155(highest_bid1155*10**18,ID);
            NFT1155Sellers[ID]=0x0000000000000000000000000000000000000000;
            NFTPrice1155[ID]=0;
            }
     }



}
