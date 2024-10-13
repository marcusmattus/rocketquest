import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowUpDown } from 'lucide-react';
import {
  Router,
  Token,
  CurrencyAmount,
  TradeType,
  Networks,
  Protocol, // Changed from Protocols to Protocol
} from "soroswap-router-sdk";


// Define the SwapInterfaceProps interface
interface SwapInterfaceProps {
  selectedAsset: { symbol: string };
  swapAmount: string;
  onSwapAmountChange: (amount: string) => void;
  onSwap: () => void;
}

// Define constants outside the component
const XLM_ADDRESS = "CDMLFMKMMD7MWZP3FKUBZPVHTUEDLSX4BYGYKH4GCESXYHS3IHQ4EIG4";
const USDC_ADDRESS = "CAMZFR4BHDUMT6J7INBBBGJG22WMS26RXEYORKC2ERZL2YGDIEEKTOJB";

const XLM_TOKEN = new Token(
  Networks.TESTNET,
  XLM_ADDRESS,
  7,
  "XLM",
  "Stellar Lumens"
);

const USDC_TOKEN = new Token(
  Networks.TESTNET,
  USDC_ADDRESS,
  7,
  "USDC",
  "USD Coin"
);

const router = new Router({
  pairsCacheInSeconds: 20, // pairs cache duration
  protocols: [Protocol.SOROSWAP], // Updated to use Protocol
  network: Networks.TESTNET, // network to be used
});

export default function SwapInterface({ selectedAsset, swapAmount, onSwapAmountChange, onSwap }: SwapInterfaceProps) {
  const handleSwap = async () => {
    const amount = parseFloat(swapAmount) * 1e7; // Convert to smallest unit
    const currencyAmount = CurrencyAmount.fromRawAmount(USDC_TOKEN, amount);
    const quoteCurrency = XLM_TOKEN;

    try {
      const route = await router.route(
        currencyAmount,
        quoteCurrency,
        TradeType.EXACT_INPUT
      );

      if (route) {
        console.log(route.trade.path);
      } else {
        console.error("Failed to find a route.");
      }
    } catch (error) {
      console.error("Error during routing:", error);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="pixel-text">Swap Assets</CardTitle>
        <CardDescription>Earn XP for each successful swap!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fromAsset" className="pixel-text">From Asset</Label>
            <Input
              id="fromAsset"
              value={selectedAsset.symbol}
              readOnly
              className="bg-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="amount" className="pixel-text">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={swapAmount}
              onChange={(e) => onSwapAmountChange(e.target.value)}
              className="bg-gray-700"
            />
          </div>
          <Button className="w-full pixel-text" onClick={handleSwap}>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Swap and Earn XP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
