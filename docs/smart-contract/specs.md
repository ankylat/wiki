---
sidebar_position: 2
---

# Specs

As I pose myself the challenge of writing this smart contract, I saw the following items as necessary:

- The collections consists of 8888 characters.
- Once you have an Anky in your wallet, you can't mint more.
- Each character has its image pinned to IPFS using pinata.
- Each character has its metadata pinned to IPFS with the link to the image pinned inside.
- The contract will be called from the react frontend.
- The NFTs need to be minted randomly (I added the randomness part before uploading the collection to ipfs)
- Add a custom text at the beginning of the smart contract, so that it will stay in there forever:

```
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
// the mind's essential peace is disturbed to no avail.
//
// Hsin Hsin Ming - Third Patriarch of Zen
//
// welcome to the ankyverse
//
// [ in memory of david foster wallace and all the victims of depression ]
```
