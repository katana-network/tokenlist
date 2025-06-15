# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This repository manages token lists for Katana chains, containing JSON files that define tokens for use in DeFi interfaces. The main tokenlist files are `tokenlist.json` (mainnet) and `tokenlist-testnet.json` (testnet).

## Essential Commands

- **Validate tokenlist syntax**: `npm run validate`
- **Install dependencies**: `npm install`

## Token List Structure

Each tokenlist follows a strict JSON schema with:
- Metadata: name, logoURI, timestamp, keywords, version (semver)
- Tokens array: each token requires name, symbol, decimals, chainId, address
- Optional fields: originTokenAddress, originChainId, logoURI

## Versioning Rules

Uses semantic versioning with specific meanings:
- **Major**: breaking changes (schema format changes)
- **Minor**: add/remove tokens
- **Patch**: update existing tokens (e.g., logo updates)

## Validation System

Two validation scripts ensure data integrity:
- `validate.js`: Validates JSON schema compliance using AJV
- `validate-version.js`: Ensures proper version increments in PRs by comparing against main branch

## Chain IDs

- Mainnet: 747474
- Testnet: (varies by network)

## Key Files

- `tokenlist.json`: Main production token list
- `tokenlist-testnet.json`: Testnet token list
- `validate.js`: Schema validation script
- `validate-version.js`: Version increment validation for PRs