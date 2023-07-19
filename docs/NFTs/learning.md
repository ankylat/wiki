---
sidebar_position: 1
---

# Learning NFTs (Technical Side)

Key resources:

- https://www.youtube.com/watch?v=LIoFbudNVZs

---

This is where I write what I learn in the road to understanding how to come up with smart contracts.

- The most important thing an NFT is the associative array between users and the token that they own: ``mapping(uint256 => address) private _owners`;
- The reason why we are going from tokenId to address is because I know in advance the tokenIds, but not know which addresses are going to own it.
- You can't iterate over mappings in solidity. But if I know that the tokenIds go from 1 to 8888 I can loop through that and see who are the owners. But not the other way around.
- If the contract has to store more data, it is more gas heavy.
- If you ask a mapping for a key that hasn't been specified, it defaults to the 0 value.
- What makes NFTs unique is the combination of the smart contract address, and the tokenId. Not the resources that they point to.
- Whenever I conduct a transfer, I am supposed to log that into the ethereum blockchain.
- Important: Events for logging the details and allowing opensea to know that there was a transaction that happened.
- Ethereum transactions are all or nothing. If you conduct a transfer and then revert it inside the function, the whole transaction is reverted.
- Pretty classic way is to specify the token supply manually.
- Constant variables are more gas efficient than regular variables.
- For withdrawing funds -> traditionally the contract is owned by the person who deployed address and then only withdrawing to that address.
- The Ownable library gives two functions that can end up being problematic: renounceOwnership and transferOwnership. This is popular and explained at 43:00 mins of the video.
- 1kb of data requires 0.014 eth to be stored on the blockchain. To save cost it's preferable to store images off-chain.
- Traditional HTTP protocols can cause the images to disappear.
- Create a hash that doubles as a way to address content on a network.
- IPFS: The hash of the content is the address.
- IPFS is very similar to bit torrent.
- IPFS supports the notion of folders. If I change the names of the files, add files, remove files, or change files, the folder hash will change.
- The content address is permanent even if someone stops paying their service provider.
- If the smart contract is hard coded to a certain IPFS address, then you can be sure the content will never change.
- IPFS only handles content addressing, it does not store the files. You still have to host the file yourself.
- You still have to host the content yourself, or pay a service to do it. This is called pinning.
- Drawbacks of IPFS: Content can still go missing if you stop hosting it.
- If you lose the original content, then you won't be able to reproduce the IPFS hash.
- IPFS works well for NFTs because of its permanence.
- Most NFT buyers expect content to be hosted on IPFS.
- I can run an IPFS node and pin my own content.
- Once all the images and metadata are uploaded to IPFS, you are ready to override the baseUri function which will then make tokenURI point to the correct location.
- When I deploy the contract turn on the optimizer to 10000 (see video at 1:08:00). The higher the number the more money people downstream is going to save money.
- Counters library keeps track of the IDs of the NFTs.
- 

IMPORTANT POINTS:

- **When the contract has to store more data, it becomes more gas heavy**
-
