// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/String.sol";

contract SimpleNFT {
    using Strings for uint256;

    event Transfer (address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event ApprovalForAll (address indexed _owner, address indexed _operator, bool _approved);

    mapping(uint256 => address) private _owners;

    //msg.sender => opensea => true
    mapping(address=>mapping(address => bool)) private _operators;
    //tracking the balances
    mapping(address => uint256) private _balances;

    string baseURL = "https://www.example.com";

    function mint(uint256 _tokenId) external {
        require(_owners[_tokenId] == address(0), "Token already has an owner");
        require(_tokenId < 100, "Token ID is out of bounds");

        emit Transfer(address(0), msg.sender, _tokenId);

        _owners[_tokenId] = msg.sender;
        _balances[msg.sender] += 1;
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        require(_owners[_tokenId] != address(0), "That token doesn't exist");
        return _owners[_tokenId];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
        require(_owners[_tokenId] != address(0), "Token does not exist");
        require(_owners[_tokenId] == _from, "Address is not the owner of the NFT");
        require(msg.sender == _from || _operators[_from][msg.sender], "Only who owns the token can transfer it");

        emit Transfer(_from, _to, _tokenId);
        _operators[_from][msg.sender] = false;
        _owners[_tokenId] = _to;
        _balances[_from] -= 1;
        _balances[_to] += 1;
    }

    function tokenURI(uint256 _tokenId) external view returns (string memory) {
        require(_owners[_tokenId] != address(0), "Token does not exist");

        return string(abi.encondePacked(baseURL, _tokenId.toString(), ".png"));
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        _operators[msg.sender][_operator] = _approved;

        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return _operators[_owner][_operator];
    }

    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0), "Address not valid");
        return(_balances[_owner]);
    }
}


