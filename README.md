# Tokenlists

This repo contains lists of tokens mapped to the katana chains that may be used in certain interfaces.

## Versioning

This tokenlist will use semver (Semantic Versioning) to indicate changes. 

- major version: breaking changes, i.e., schema format change
- minor version: add/remove tokens
- patch version: update existing token(s), i.e., update logo for a token


## Updating a token

1. Fork the repository

2. Update the token in the token array of `tokenlist.json` for mainnet or `tokenlist-testnet.json` for testnet

    Please make sure that the updated token do not disturb the schema.

3. Verify the tokenlist syntax

    ```bash
    npm run validate
    ```

4. Commit the changes and raise a Pull request to our repo

### Disclaimer

After raising a PR, please allow us some time to verify the PR.
We do not follow any particular order in reviewing token additions and updations.
