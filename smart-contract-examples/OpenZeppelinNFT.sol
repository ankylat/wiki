// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/String.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract OpenZeppelinNFT is ERC721 {
    uint256 public tokenSupply = 0;
    unit256 public constant MAX_SUPPLY = 5;

    constructor() ERC721("Anky Genesis Test","ANKYGT"){

    }

    function mint() external {
        // Each time mint is called, the sequential id is minted.
        _mint(msg.sender, tokenSupply);
        tokenSupply++;
    }
}


