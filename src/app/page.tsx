"use client";

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PixelatedAvatar from '@/components/PixelatedAvatar'
import AssetCard from '@/components/AssetCard'
import SwapInterface from '../components/SwapInterface'
import TokenGenerator from '@/components/TokenGenerator'
import Achievements from '@/components/Achievements'
import Leaderboard from '@/components/Leaderboard'
import DailyChallenges from '@/components/DailyChallenges'
// Import Freighter API
import {
  isConnected,
  signTransaction,
  requestAccess,
} from "@stellar/freighter-api";
import TokenCard from '../components/TokenCard'; // Add this line


// Simulated data (same as before)
const assets = [
  { name: 'Stellar', symbol: 'XLM', price: 0.15, change: 2.5 },
  { name: 'USDCoin', symbol: 'USDC', price: 1.00, change: 0.1 },
  { name: 'PumpToken', symbol: 'PUMP', price: 0.05, change: 10.2 },
  { name: 'EuroToken', symbol: 'EURT', price: 1.10, change: -0.5 },
]

const userData = {
  name: 'Stellar Explorer',
  level: 5,
  xp: 2500,
  nextLevelXp: 5000,
  achievements: [
    { name: 'First Swap', description: 'Complete your first asset swap', completed: true },
    { name: 'Big Spender', description: 'Swap assets worth over 1000 XLM', completed: false },
    { name: 'Diversified', description: 'Own 5 different assets', completed: false },
  ],
}

const leaderboardData = [
  { name: 'CryptoKing', level: 10, xp: 15000 },
  { name: 'StellarQueen', level: 9, xp: 13500 },
  { name: 'BlockchainWizard', level: 8, xp: 12000 },
  { name: 'Stellar Explorer', level: 5, xp: 2500 },
  { name: 'CosmicTrader', level: 4, xp: 2000 },
]

const dailyChallenges = [
  { name: 'Swap Frenzy', description: 'Perform 3 asset swaps', reward: 100, completed: false },
  { name: 'Stellar Saver', description: 'Hold 100 XLM for 24 hours', reward: 50, completed: false },
  { name: 'Market Watcher', description: 'Check asset prices 5 times', reward: 25, completed: true },
]

interface UserBalance {
  [key: string]: number;
}

// Define the Token type if not already defined
export interface Token {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

const addNewAsset = (token: Token) => {
  // Logic to add the new asset
  console.log("New asset added:", token);
};

export default function Home() {
  const [selectedAsset, setSelectedAsset] = useState(assets[0])
  const [swapAmount, setSwapAmount] = useState('')
  const [userBalance, setUserBalance] = useState<UserBalance>({ XLM: 1000 })
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userXp, setUserXp] = useState(userData.xp); // New state for user XP
  const [generatedTokens, setGeneratedTokens] = useState<Token[]>([]); // Ensure this line is present

  const handleSwap = () => {
    const amount = parseFloat(swapAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount')
      return
    }

    if (userBalance.XLM < amount) {
      alert('Insufficient balance')
      return
    }

    setUserBalance(prev => ({
      ...prev,
      XLM: prev.XLM - amount,
      [selectedAsset.symbol]: (prev[selectedAsset.symbol] || 0) + amount / selectedAsset.price
    }))

    setSwapAmount('')
    alert(`Swapped ${amount} XLM for ${(amount / selectedAsset.price).toFixed(2)} ${selectedAsset.symbol}`)

    // Increase user XP
    const xpGained = 100; // Define how much XP is gained per swap
    setUserXp(prevXp => prevXp + xpGained);
  }

  useEffect(() => {
    const checkConnection = async () => {
      const isAppConnected = await isConnected();
      if (isAppConnected) {
        alert("User has Freighter!");
      }
    };
    checkConnection();
  }, []);

  const retrievePublicKey = async () => {
    const accessObj = await requestAccess();

    if (accessObj.error) {
      throw new Error(accessObj.error.message);
    } else {
      return accessObj.address;
    }
  };

  const retrievedPublicKey = retrievePublicKey();

  const userSignTransaction = async (
    xdr: string,
    network: string,
    signWith: string
  ) => {
    const signedTransactionRes = await signTransaction(xdr, {
      networkPassphrase: network, // Changed from 'network' to 'networkPassphrase'
      address: signWith,
    });
  
    if (signedTransactionRes.error) {
      throw new Error(signedTransactionRes.error.message);
    } else {
      return signedTransactionRes.signedTxXdr;
    }
  };
  
  const xdr = ""; // replace this with an xdr string of the transaction you want to sign
  const signWith = ""; // replace this with the address you want to sign with
  const userSignedTransaction = userSignTransaction(xdr, "TESTNET", signWith);
        // const handleConnectWallet = async () => {
        //   try {
        //     const connected = await isConnected(); // Use the correct method to check connection
        //     if (connected) {
        //       setIsWalletConnected(true);
        //       alert('Wallet connected successfully');
        //     } else {
        //       alert('Failed to connect wallet');
        //     }
        //   } catch (error) {
        //     console.error('Error connecting wallet:', error);
        //     alert('Error connecting wallet');
        //   }
        // };

        const handleDisconnectWallet = () => {
          setIsWalletConnected(false);
          alert('Wallet disconnected successfully');
          // Additional logic to clear session data if necessary
        };

        const handleConnectWallet = async () => {
          try {
            const connected = await isConnected();
            if (connected) {
              setIsWalletConnected(true);
              alert('Wallet connected successfully');
            } else {
              alert('Failed to connect wallet');
            }
          } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Error connecting wallet');
          }
        };

  const [addNewAsset, setAddNewAsset] = useState(() => {
    const newAsset = {
      name: 'New Asset',
      symbol: 'NEW',
      price: 0.10,
      change: 5.0,
    };
    return newAsset;
  });

  // Function to handle adding a new token
  const handleAddNewToken = (newToken: Token) => {
    setGeneratedTokens(prevTokens => [...prevTokens, newToken]);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar - Hidden */}
      {/* <div className="w-full lg:w-64 bg-gray-800 p-4 lg:min-h-screen">
        <h1 className="text-xl font-bold mb-8 pixel-text">Stellar Quest</h1>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <BarChart2 className="mr-2 h-4 w-4" />
            Board
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Wallet className="mr-2 h-4 w-4" />
            Wallet
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Award className="mr-2 h-4 w-4" />
            Achievements
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
        <div className="mt-auto pt-4">
          <Button variant="ghost" className="w-full justify-start text-red-400" onClick={handleDisconnectWallet}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </div> */}

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold pixel-text mb-4 lg:mb-0">Rocket-Quest</h2>
          <div className="flex items-center space-x-4">
            <PixelatedAvatar name={userData.name} size={40} />
            <div>
              <p className="font-semibold pixel-text">{userData.name}</p>
              <p className="text-sm text-gray-400">Level {userData.level}</p>
            </div>
          </div>
        </div>

        {/* Connect/Disconnect Wallet Button */}
        <Button onClick={isWalletConnected ? handleDisconnectWallet : handleConnectWallet} className="mb-6">
          {isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
        </Button>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2 pixel-text">
              <span>XP: {userXp} / {userData.nextLevelXp}</span> {/* Updated to use userXp */}
              <span>Level {userData.level}</span>
            </div>
            <Progress value={(userXp / userData.nextLevelXp) * 100} className="w-full" /> {/* Updated to use userXp */}
          </CardContent>
        </Card>

        <Tabs defaultValue="assets">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6">
            <TabsTrigger value="assets" className="pixel-text">Assets</TabsTrigger>
            <TabsTrigger value="token" className="pixel-text">Token Gen</TabsTrigger>
            <TabsTrigger value="achievements" className="pixel-text">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard" className="pixel-text">Leaderboard</TabsTrigger>
            <TabsTrigger value="challenges" className="pixel-text">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="assets">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {assets.map((asset) => (
                <AssetCard 
                  key={asset.symbol} 
                  asset={asset} 
                  onSelect={() => setSelectedAsset(asset)}
                />
              ))}
            </div>
            <SwapInterface
              selectedAsset={selectedAsset}
              swapAmount={swapAmount}
              onSwapAmountChange={setSwapAmount}
              onSwap={handleSwap}
            />
          </TabsContent>
          
          <TabsContent value="token">
            <TokenGenerator />
          </TabsContent>
          
          <TabsContent value="achievements">
            <Achievements  />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard/>
          </TabsContent>
          
          <TabsContent value="challenges">
            <DailyChallenges />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
