// src/components/AssetCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Asset {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

interface AssetCardProps {
  asset: Asset;
  onSelect: () => void;
}

export default function AssetCard({ asset, onSelect }: AssetCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex justify-between items-center pixel-text">
          <span>{asset.name}</span>
          <span className={asset.change >= 0 ? "text-green-400" : "text-red-400"}>
            {asset.change >= 0 ? "+" : ""}{asset.change}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold pixel-text">${asset.price.toFixed(2)}</p>
        <p className="text-gray-400">{asset.symbol}</p>
        <Button 
          className="w-full mt-4 pixel-text" 
          onClick={() => onSelect()}
        >
          Select
        </Button>
      </CardContent>
    </Card>
  );
}
