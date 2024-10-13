import React from 'react';

interface TokenCardProps {
  token: {
    name: string;
    symbol: string;
    price: number;
    change: number;
  };
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h3 className="text-lg font-bold">{token.name}</h3>
      <p>Symbol: {token.symbol}</p>
      <p>Price: ${token.price.toFixed(2)}</p>
      <p>Change: {token.change}%</p>
    </div>
  );
};

export default TokenCard;
