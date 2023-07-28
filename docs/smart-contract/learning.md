---
sidebar_position: 3
---

# Learning Smart Contracts

Key resources:

- https://www.rareskills.io/learn-solidity

---

This is where I write what I learn in the road to understanding how to come up with smart contracts.

- Smart contracts are pieces of code that run within the constraints of the blockchain. In this case, the ethereum blockchain.
- A state variable is a fundamental element of a smart contract: All the data that is stored in a smart contract is stored in state variables.
- To define a state varialble, we combine three elements:
  - Type: Integer, string, address.
  - Visibility: Private or public
- When the smart contract is deployed, the Ethereum Virtual Machine looks for a constrcutor. This is the special function containing the code that is ran only when the contract is deployed. Only once.
- A variable is doomed to be useless unless we find a way to set or modify it.
- address type of variable represents an ethereum address. In ethereum, these can represent an Externally Owned Account (EOA) or a smart contract account. An address type can hold a balance of ether.
- Maintaining the 'owner' of a contract is a common pattern in smart contract development, similar to how apps have an 'admin' role.
- The keyword _msg.sender_ represents the address of the account that called the contract. This account can be another smart contract or a EOA. It is the equivalent to on-chain authentication.
- _msg.sender_ can be the address to a smart contract, since contracts can call contracts.
- Solidity expects semi-colons at the end of each line of code (";").
- Functions are used to execute functionalities inside the smart contract.
- Public functions allows interaction with the program. Public functions define the equivalent to the public API of the smart contract. They provide a way to interact with the contract.
- If a function is defined as private, only the contract can interact with it.
- The convention is to prepend function arguments and local variables with an underscore. This helps differentiate local variables from all-important state variables.
- _msg.sender_ can represent: The address of the EOA that initiated the current function call. The address of the smart contract that initiated the current function call.

---

- Solidity is a typed language: One variable can have only one type, and it must be explicitly declared as such.
- For functions also, you need to define the variable and return type.
- The three most used variable types are:
  - Unsigned integer: uint256
  - Boolean: bool
  - Address: address
- It is very important that the function signature matches the return type:

```
function getAddress() public pure returns (address) {
  address a = 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48;
  return a;
}
```

- Most of the times, you should use uint256. It can store numbers up to 256 bits large.
- Solidity does not have floats. Any division you do is an integer division.
- Floats are not always deterministic, and blockchains must be deterministic otherwise nodes won't agree on the outcomes of transactions.
- It does not underflow or overflow. It just stops the execution.
- Solidity doesn't throw exceptions. You can think of a revert as the equivalent of an uncaught exception.
- Overflown protection was added to solitity 0.8.0.
- In solidity, while loops are used very rarely.
- For declaring an array of uint256's, booleans and addresse's:

```
contract ExampleContract {

    function useArrayForUint256(uint256[] calldata input) public pure returns (uint256[] memory) {
        return input;
    }
     function booleanArrayExample(bool[] calldata input) public pure returns (bool[] memory) {
        return input;
    }

    function addressArrayExample(address[] calldata input) public pure returns (address[] memory) {
        return address;
    }
}

```

- Arrays can have unlimited size, so storing them on the execution stack could lead to a stackoverflow.
- Calldata is something unique to solidity, it is the actual 'transaction data' that is sent when someone transmits a transaction to the blockchain.
- Calldata means "refer to the data in the ethereum transaction itself".
- When in doubt: The function arguments for arrays and strings should be calldata and the function arguments for the return type should be memory.

```
contract ExampleContract {

    function helloWorld() public pure returns (string memory) {
        return "Hello, world!";
    }
}
```

- Smart contracts usually deal with numbers, not strings.
- Solidity does not support getting the length of a string. This is because unicode characters can make the length ambiguous, and solidity represents strings as a byte array, not a sequence of characters.
- Pure functions always return the same value if given the same argument. They are not aware of the blockchain status or what has happened in the past.
- Storage variables are variables that work like a miniature database.
- Variables stored outside of functions are storage variables. They keep their value after the transaction ends.
- When a function has the modifier view instead of pure, it views the blockchain state: What is stored in the variable x. View is read-only.
- If a function doesn't have a view or pure modifier, it means that it is a state changing function. Functions that change storage variables, or make some other lasting change to the blockchain, cannot have the view or pure modifier. This is because they are not read only and thus cannot be labelled as view, and certainly not pure.
- If a variable is defined as internal, other smart contracts cannot see the value of it.
- Just because a variable is internal does not mean it is hidden. It is still stored on the blockchain and anyone can parse the blockchain to get the value of a particular variable.
- Good practice is being intentional (and declaring!) what is the visibility of a defined variable.
- When a variable is defined as public, it means that other smart contracts can read the value but not modify it.
- Public functions can modify variables, but public variables cannot be modified unless there is a function to change their value.
- Storage variables are defined outside functions and serve as mini-databases.
- Public functions that don't have a view or pure modifier can change storage variables.
- Pure functions cannot access storage variables.
- When working with arrays, solidity cannot delete from the middle of the list and preserve the array's original order.
- Mapping is the keyword solidity uses.
- Mappings can only be declared as storage. You cannot declare them as a function.
- Mappings cannot be iterated over.
- Mappings cannot be returned.
- A mapping is a data structure that allows me to store information in key-value pairs.
- In a mapping:
  - Keys are not stored. You cannot access a list of keys in a mapping.
  - You cannot iterate over the contents of a mapping.
  - Because the keys aren't stored, you cannot determine the size of a mapping or wether a particular key is inside the mapping.
  - It is common to use mapping in combination with an array to track what data has been stored. This can help me iterate over the data and know what keys have been used.
  - Mappings are usually used to store the state of the smart contract. This may include the balance of each user's account, ownership of tokens, voting rights in a decentralized organization and other use cases.
- Solidity automatically declares getter functions when you declare a variable as public.
- Public nested mappings don't work.
- The solution to this problem is to make nested mappings private and wrap them in a public function that gets their value.
- Solidity has a mechanism for identifying who is calling the smart contract: msg.sender, which's value is the address that is invoking the smart contract function.
- By combining msg.sender with an if statement, you can give certain addresses special privileges.
- This is how a smart contract can know its own address:

```
contract ExampleContract {
    function whoami() public view returns (address) {
        return address(this);
    }
}
```

- The constructor function can't be modified with things like pure, public, view.
- The constructor function is only called when the contract is deployed.
- In constructors, it is very common
- In the constructor function, calldata cannot be used for arrays and strings. You must use memory.
- Constructors cannot return values.
- Using calldata instead of memory results in cheaper transactions for the users.
- The elegant method for checking if stuff is properly done in a function is to use the require statement. It forces a transaction to revert if some condition is not met.
- Always when using a require statement it is important to leave a message indicating why the call to the smart contract failed.
- It is the general practice that the function mint takes the to and amount as the parameter argument.
- By convention, sending a token to the zero address should reduce the totalSupply so we want to have a separate function for that.
- Allowance enables an address to spend someone else's tokens, up to a limit that they specify.
- When you want to transfer tokens to a smart contract, the typical method is to first approve the smart contract to withdraw a certain amount of tokens from your account. Then, you instruct the smart contract to withdraw the approved amount of tokens from your account.
- Whenever you call a smart contract, you are actually sending an ethereum transaction with some data attached so the smart contract knows which function to execute.
- When you call a function in a smart contract, you aren't actually doing a "function call" per se, you are sending data to the contract with some information about which function should be executed.
- When you 'call a smart contract' you are sending data to the contract with instructions on how to execute.
- There are many data encodings (json, xml, etc). Solidity uses abi.
- It always looks like a sequence of bytes.
- When you 'call a smart contract', you are sending data to the contract with instructions for how to execute.
- Abi encoding looks like a sequence of bytes.
- It is possible and desirable for smart contracts to be able to communicate with each other.
- View functions are read only. When you call the function of an arbitrary smart contract, you can't know if it is read-only or not. Solidity doesn't let you specify a function as view if it calls another smart contract.
- Functions always return abi encoded bytes. Behind the scenes, remix does the abi.decode operation to show me the strings or ints.
- A function should be constrained enough to have very predictable behavior. Extremely well defined behavior. The more constrained the behavior, the easier it is to reason about the smart contract's functionality.
- Changing the ether balance of a smart contract is a "state change" on the blockchain. It's a permanent alteration that endures even after the transaction is finished, similar to updating a storage variable. Payable functions cannot be pure or view. The compiler won't accept it, because there is a permanent change happening on the blockchain.
- receive is a function, but it doesn't have the function keyword. This is because it is 'special', just like the constructor. We use a modifier called external, instead of public.
- The external modifier means that it can **only** be accessed from the outside of the contract.
- All call invocations transfer ether. But zero is a valid amount of ether to transfer. This can be useful in situations where no ether need to be sent.
- Blocks are produced every 12 seconds.
- If I want to ensure someone doesn't call a function more than once per day, I can use the following construction:

```
contract ExampleContract {
    uint256 public lastCall;

    function hasCooldown() public {
        uint256 day = 60 * 60 * 24;
        require(block.timestamp > lastCall + day, "hasn't been a day");
        lastCall = block.timestamp;
    }
}
```

- Don't use block.number to track time. Use it only to enforce ordering of transactions.
- To ensure a function is called after another one:

```
contract ExampleContract {

    // defaults to zero
    uint256 private calledAt;

    function callMeFirst() external {
        calledAt = block.number;
    }

    function callMeSecond() external {
        require(calledAt != 0 && block.number > calledAt, "callMeFirst() not called");
    }
}
```

- **If a function causes a state change, it should be logged.**
- Events cannot be seen by other smart contracts. They are optimized for being queried offchain.
- A variable should be indexed if you are interested in finding that value quickly. Has an address interacted with this smart contract before?
- Solidity events are the closest thing to a print or console.log statement.
- Ethereum does not provide a mechanism to get all transactions for a smart contract, but it does provide a mechanism for getting all events from a smart contract.
- With events, solidity programmers can be selective about what kind of information is worth paying the additional storage overhead for, to enable quick offchain retrieval.
- Inheritance: When a "contract" is "another contract", it inherits all its functionality.
- There is a world of difference between a smart contract as a solidy object and a smart contract deployed on the blockchain.
- You cannot inherit a contract deployed on the blockchain. They are binary blobs living outside of you.
- Solidity has a special type of call, called staticcall, that behaves like a regular call but forces the transaction to revert if a state change happens.
- The onlyOwner construction is very common. The following code is a modifier.
- Execute the code before the underscore, then execute the function.
```modifier onlyOwner() {
    require(msg.sender == owner, "onlyOwner");
    _;
}
```
- Don't modify state inside the modifier. This is considered bad practice.
- If a variable is set in the constructor and never modified, it should be immutable. Immutable variables can be set once on the constructor.
- ERC721 is very similar to ERC20, but the only difference is that each token has a unique ID, and there is only one of them: Hence, NFTs.
- Every connection to the EVM happens through a node, and in order to connect you need to connect to a node.
- Every ethereum transaction has to be signed by an EOA (Externally Owned Account) and then sent to the blockchain to be included into a block.
- Using the ethers library, we use a signer to take care of the transaction signer. ethers is a node library.
- When you create a contract object with the ethers library, any transactions that are sent via our contract object will be signed by the signer.
- Reading blockchain data is much simpler than adding or modifying blockchain data.
- A fundamental practice of smart contract development is emitting "events" to signal significant happenings during smart contract execution.
- When an event is emitted it is written to on-chain transaction logs. These are not accessible to smart contracts. They are solely used for off-chain logging, which is useful for observing and reacting to on-chain events.
- Be aware that when a transaction is reverted, all gas until that point is still consumed, despite the transaction having no effect on blockchain data. 


## Rules of Thumb

- **If a function causes a state change, it should be logged.**
- **Unless a function needs to be called from inside a smart contract, it should be external, not public.**
- **If I'm not going to change a variable, be explicit about it using the immutable keyword.**

