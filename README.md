The goal of the task is to determine the candidates:
1. Existing knowledge around Money Markets design.
2. Ability to self-start, research and problem solve independently to figure out how to
   complete a task.
3. Ability to communicate their thinking to the rest of the contributors.
   Ideally the candidate will spend <8 hours on the below steps - completion of all tasks is not
   required in this case - see how far you get. We would prefer a solution in a typed language, e.g.
   Rust or TS.
   Task

1. Create a script that can periodically retrieve user positions (user collaterals and user debts)
   from osmosis mainnet red-bank contract.
   This is a demo script and does not need to cover all cases or have complete user data, it is to
   show a functional understanding around reading and understanding CosmWasm contracts and
   how to query them.
   Hints:
- you could smart query, raw query, or index data to retrieve user positions
- contract addresses are in readme here: https://github.com/mars-protocol/contracts
- celatone is a good tool for exploring contracts: https://celatone.osmosis.zone/osmosis-1
- source code of Mars Protocols liquidation bot:
  https://github.com/mars-protocol/multichain-liquidator-bot
- Example of using cosmJs library to query chain and smart contract data:
  https://docs.marsprotocol.io/docs/develop/connect/cosmjs
- Docs on Mars Protocol liquidation bot:
  https://docs.marsprotocol.io/docs/develop/liquidation-bots/liquidation-bots-intro
2. Explain your thinking regarding how you retrieved user positions, what are the pros and cons
   of your choice vs other possible choices
3. Explain what you would do to finish this script in order for it to be more production ready, and
   explain how you would prefer to deploy and run the script
4. Create a demo script that uses the users collaterals and users debts to calculate the users
   collateralization ratio.
   This is a demo script and does not need to cover all cases or have complete user data, it is to
   show a functional understanding around reading and understanding CosmWasm contracts and
   how to query them.
   Hints:

- calculating collateralization ratio requires you normalize all the assets values (asset
  amount x asset price) to compare values. This task doesn’t require a production ready
  version of querying asset prices for normalization.
5. Explain how you would use the users collateralization ratio to determine if the user is eligible
   for liquidation, what other considerations can you see that need to be accounted for during a
   liquidation?
6. Bonus - Describe in a few words how you could make the scripts / bot resilient and
   fault-tolerant

   Submission
1. Submit the coding portions of this task as a public GitHub repository
2. Send this document to dane@marsprotocol.foundation email address with explanations
   for tasks 2/3/5/6 and relevant links to GitHub repositories for tasks 1/4