"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Server, { Asset, Keypair, TransactionBuilder, Operation, BASE_FEE, Networks } from '@stellar/stellar-sdk';

// Note: In a real application, you should never expose secret keys in the frontend.
// This is just for demonstration purposes.
const issuerKeys = Keypair.fromSecret(
  "SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4"
);
const receivingKeys = Keypair.fromSecret(
  "SDSAVCRE5JRAI7UFAVLE5IMIZRD6N6WOJUWKY4GFN34LOBEEUS4W2T2D"
);

interface Token {
  name: string;
  symbol: string;
  amount: string;
}

interface TokenGeneratorProps {
  addNewAsset: (token: Token) => void;
}

const TokenGenerator: React.FC<TokenGeneratorProps> = ({ addNewAsset }) => {
  const [assetName, setAssetName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);

  const generateToken = async () => {
    if (!assetName || !symbol || !totalSupply || !amount) {
      setStatus('Please enter all fields: asset name, symbol, total supply, and amount.');
      return;
    }

    setStatus('Creating asset...');

    try {
      const customAsset = new Asset(symbol, issuerKeys.publicKey());
      const server = new Server('https://horizon-testnet.stellar.org');

      // Create a trustline
      const receiver = await server.loadAccount(receivingKeys.publicKey());
      const trustTransaction = new TransactionBuilder(receiver, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.changeTrust({
            asset: customAsset,
            limit: totalSupply,
          })
        )
        .setTimeout(100)
        .build();

      trustTransaction.sign(receivingKeys);
      await server.submitTransaction(trustTransaction);

      setStatus('Trustline created. Issuing asset...');

      // Issue the asset
      const issuer = await server.loadAccount(issuerKeys.publicKey());
      const issueTransaction = new TransactionBuilder(issuer, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.payment({
            destination: receivingKeys.publicKey(),
            asset: customAsset,
            amount: amount,
          })
        )
        .setTimeout(100)
        .build();

      issueTransaction.sign(issuerKeys);
      await server.submitTransaction(issueTransaction);

      setStatus(`Asset ${assetName} (${symbol}) created and ${amount} units issued successfully!`);

      // Add the new token to the list
      const newToken = { name: assetName, symbol, amount };
      setTokens([...tokens, newToken]);
      addNewAsset(newToken); // Call the prop function to add the new token

    } catch (error: unknown) {
      console.error("Error!", error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="pixel-text">Generate Custom Meme Token</CardTitle>
        <CardDescription>Create your own meme token on Stellar!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="assetName" className="pixel-text">Asset Name</Label>
            <Input
              id="assetName"
              type="text"
              placeholder="Enter asset name"
              value={assetName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssetName(e.target.value)}
              className="bg-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="symbol" className="pixel-text">Token Symbol</Label>
            <Input
              id="symbol"
              type="text"
              placeholder="Enter token symbol"
              value={symbol}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value)}
              className="bg-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="totalSupply" className="pixel-text">Total Supply</Label>
            <Input
              id="totalSupply"
              type="text"
              placeholder="Enter total supply"
              value={totalSupply}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalSupply(e.target.value)}
              className="bg-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="amount" className="pixel-text">Amount to Issue</Label>
            <Input
              id="amount"
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              className="bg-gray-700"
            />
          </div>
          <Button className="w-full pixel-text" onClick={generateToken}>
            Create and Issue Token
          </Button>
          {status && (
            <div className="mt-4">
              <Label className="pixel-text">Status:</Label>
              <p className="text-sm mt-2 pixel-text">{status}</p>
            </div>
          )}
          <div className="mt-4">
            <Label className="pixel-text">Generated Tokens:</Label>
            <ul className="list-disc list-inside">
              {tokens.map((token, index) => (
                <li key={index} className="pixel-text">
                  {token.name} ({token.symbol}): {token.amount} units
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenGenerator;
