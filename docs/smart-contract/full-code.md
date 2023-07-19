---
sidebar_position: 4
---

# Smart Contract Code

You can find the smart contract code deployed on etherscan here: [https://www.anky.lat](https://www.anky.lat)

```
// SPDX-License-Identifier: GPL-3.0-only
// The above specifies a software license and keeps the compiler happy.
// The below specifies the versions of Solidity supported by this contract.
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// .............................................................................
// The Great Way is not difficult
// for those who have no preferences.
// When love and hate are both absent
// everything becomes clear and undisguised.
// Make the smallest distinction, however,
// and heaven and earth are set infinitely apart.
//
// If you wish to see the truth
// then hold no opinions for or against anything.
// To set up what you like against what you dislike
// is the disease of the mind.
// When the deep meaning of things is not understood,
// the mind’s essential peace is disturbed to no avail.
//
// [ In memory of David Foster Wallace and all of those who didn't make it through depression]
// .............................................................................

contract Anky Genesis is ERC721 {
    string immutable public name;
    string immutable public symbol;
    // Addresses
    address public _w1 = 0xed21735DC192dC4eeAFd71b4Dc023bC53fE4DF15;
    address public _systemAddress = address(0);
    address immutable deployer;

    // Token Mint
    uint256 public constant MAX_SUPPLY = 8888;
    uint256 public constant _price = 0.01618 ether;
    uint256 public _currentMintedId     = 0;


    // For giveaways, staff and partnerships
    uint256 public _reserved = 88;

    // Handle public mint access
    enum EPublicMintStatus {
        CLOSED,
        RESERVED_MINT,
        ALLOW_LIST,
        OPEN
    }
    EPublicMintStatus public _publicMintStatus;

    // For tracking if address has minted
    mapping(address => bool) public _minted;

    constructor (string memory baseURI, address ccContractAddress) ERC721 ("Anky Genesis", "ANKYGEN") {
        _baseTokenURI = baseURI;
        _ccAddress    = ccContractAddress;
        deployer = msg.sender;
        name = _name;
        symbol = _symbol;
    }

      /// @dev Signature to help avoid bot minting
      /// @notice Adopt via public minting
      /// @param salt Some simple salting for the signature

    function publicAdopt(uint256 salt, bytes memory signature) external payable {
        uint256 currentMintedId = _currentMintedId;
        require(msg.sender == tx.origin, "CP: I'm sorry, dear robot. We like humans in here.");
        require(_publicMintStatus == EPublicMintStatus.OPEN, "CP: Minting closed");
        require(currentMintedId < MAX_SUPPLY, "CP: Exceeds the amount of Ankys available");
        require(msg.value == _price, "CP: Invalid ETH Sent");
        require(_minted[msg.sender] == false, "CP: Address already minted an Anky Genesis");

        // Mark address as minted
        _minted[msg.sender] = true;

        // Verify
        require(_isValidSignature(keccak256(abi.encodePacked(msg.sender, salt)), signature), "CP: Invalid Signature");

        // Ankys bought will have a token id increasing from 1
        _mint(msg.sender, currentMintedId)

        unchecked {
          currentMintedId++;
        }
        _currentMintedId = currentMintedId
    }

    /// @notice Let Admin mint out 100 pets for giveaways and collabs
    function reservedMint() external onlyOwner {
        uint256 currentMintedId = _currentMintedId;
        uint256 reserved = _reserved;

        require(_publicMintStatus == EPublicMintStatus.RESERVED_MINT, "CP: Reserved Mint Closed");
        require(reserved > 0, "CP: No more reserve mints left");

        for (uint256 i; i < 20; i++){
            _mint(msg.sender, currentMintedId++);
        }

        _currentMintedId = currentMintedId;
        reserved -= 20;
        _reserved = reserved;
    }

    function _mint(uint256 _to, uint256 _tokenId) external {
        require(_currentMintedId < MAX_SUPPLY, "No more supply of Ankys");

    }

    /// @notice Change the public minting status
    /// @param status Status to change to
    function setPublicMintStatus(uint256 status) external onlyOwner {
        require(status <= uint256(EPublicMintStatus.OPEN), "CP: Out of bounds!");
        _publicMintStatus = EPublicMintStatus(status);
    }


    /// @notice Get uri of tokens
    /// @return string Uri
    function _baseURI() internal pure virtual override returns (string memory) {
        return "ipfs://CID FOR THE JSON FOLDER/";
    }

    /// @notice Set the purchase price of ankys
    /// @param newPrice In wei - 10 ** 18
    function setPrice(uint256 newPrice) external onlyOwner {
        _price = newPrice;
    }

      /// @notice Set the system address
    /// @param systemAddress Address to set as systemAddress
    function setSystemAddress(address systemAddress) external onlyOwner {
        _systemAddress = systemAddress;
    }

      /// @notice Set withdrawal address
    /// @param wallet Address of withdrawal target
    function setWithdrawalWallet(address wallet) external onlyOwner {
        _w1 = wallet;
    }

    /// @notice Verify hashed data
    /// param hash Hashed data bundle
    /// @param signature Signature to check hash against
    /// @return bool Is verified or not
    function _isValidSignature(bytes32 hash, bytes memory signature) internal view returns (bool) {
        require(_systemAddress != address(0), "CP: Invalid system address");
        bytes32 signedHash = hash.toEthSignedMessageHash();
        return signedHash.recover(signature) == _systemAddress;
    }

    /// @notice Withdraw funds from contract
    function withdraw() external {
        payable(deployer).transfer(address(this).balance);
    }

}

```
