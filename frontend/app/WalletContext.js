"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [publicKey, setPublicKey] = useState(null); // Public key of connected Phantom wallet
  const [error, setError] = useState(null);

  // Function to connect Phantom wallet
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const pubKey = response.publicKey.toString();
        setProvider(window.solana);
        setPublicKey(pubKey);
        sessionStorage.setItem("walletAddress", pubKey);
        setError(null);
      } catch (err) {
        if (err.code === 4001 || err.message === "User rejected the request.") {
          setError("You rejected the connection request.");
        } else {
          setError("Failed to connect to the wallet.");
        }
      }
    } else {
      setError("Phantom wallet is not detected. Please install it.");
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setPublicKey(null);
    sessionStorage.removeItem("walletAddress");
  };

  useEffect(() => {
    const savedAddress = sessionStorage.getItem("walletAddress");
    if (savedAddress) {
      setPublicKey(savedAddress);
    }

    if (window.solana && window.solana.isPhantom) {
      window.solana.on('connect', () => connectWallet());
      window.solana.on('disconnect', disconnectWallet);

      return () => {
        window.solana.removeListener('connect', connectWallet);
        window.solana.removeListener('disconnect', disconnectWallet);
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ provider, publicKey, connectWallet, disconnectWallet, error }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
