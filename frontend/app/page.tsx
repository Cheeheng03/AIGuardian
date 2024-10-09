"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/landing-components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/landing-components/ui/dialog";
import AIEngineSection from "@/app/landing-components/AIEngineSection";
import MonitoringSection from "@/app/landing-components/MonitoringSection";
import ActionSteps from "@/app/landing-components/ActionSteps";
import TechStacks from "@/app/landing-components/TechStacks";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { PublicKey } from "@solana/web3.js";

declare global {
  interface Window {
    solana?: any; // Solana provider for Phantom
  }
}

const LandingPage = () => {
  const [address, setAddress] = useState<string | null>(null); // State to store connected wallet address
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const router = useRouter(); // Next.js router for navigation

  // Function to connect to the Phantom wallet
  const connectWallet = async () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        try {
          // Request wallet connection
          const response = await provider.connect();
          const publicKey = response.publicKey.toString();
          setAddress(publicKey);
          sessionStorage.setItem("walletAddress", publicKey); // Store in sessionStorage to remember the connected wallet
          sessionStorage.setItem("hasConnected", "true");
          setError(null); // Clear any previous errors
        } catch (err: any) {
          if (
            err.code === 4001 ||
            err.message === "User rejected the request."
          ) {
            setError("You rejected the connection request.");
          } else {
            setError("Failed to connect to the wallet.");
          }
        }
      } else {
        setError("Please install the Phantom wallet.");
      }
    } else {
      setError("Phantom wallet is not detected.");
    }
  };

  // Handle demo button click
  const handleDemoClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Stop the default anchor behavior immediately
    const hasConnected = sessionStorage.getItem("hasConnected");

    if (!hasConnected) {
      setIsDialogOpen(true); // Open the dialog prompting the user to connect Phantom
    } else {
      router.push("/demo"); // Navigate to the demo page if Phantom is connected
    }
  };

  // If the wallet address is saved in sessionStorage, use it to restore the address after page refresh
  useEffect(() => {
    const savedAddress = sessionStorage.getItem("walletAddress");
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen min-w-screen">
      <Toaster />
      <header className="px-4 py-6 border-b-2 border-dashed border-gray-400 sticky top-0 bg-black">
        <nav className="flex sm:flex-row flex-col gap-y-3 sm:justify-between sm:items-center w-full">
          <h1 className="text-2xl md:text-3xl font-light font-neue-machina">
            AIGuardian
          </h1>
          <div className="space-x-16 font-neue-machina font-light">
            <a href="#how" className="hover:text-gray-300">
              How it Works
            </a>
            <a
              href="/login"
              className="hover:text-gray-300"
              onClick={handleDemoClick}
            >
              Demo
            </a>
          </div>
          <div>
            <Button
              className="bg-orange-300 text-black hover:bg-orange-300 text-base md:text-xl md:px-8 md:py-6 px-6 py-4 w-full sm:w-[170px]rounded-sm font-neue-machina"
              onClick={connectWallet} // Connect to Phantom Wallet when the button is clicked
            >
              {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Phantom"}
            </Button>
          </div>
        </nav>
      </header>

      <main className="w-screen">
        {/* Sections */}
        <section className="text-left py-24 max-w-[1700px] mx-auto sm:px-10 border-b-2 border-gray-400 border-dashed">
          <h2 className="text-6xl sm:text-8xl md:text-9xl font-light mb-4 font-neue-machina leading-tight tracking-tight uppercase px-8 sm:px-0">
            un-deepfake you.
          </h2>
          <h2 className="text-6xl sm:text-8xl md:text-9xl font-light mb-12 font-neue-machina leading-tight px-8 sm:px-0">
            <span className="bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 text-transparent bg-clip-text">
              AI GUARDIAN
            </span>
            <br />
            <span className="text-white">IS HERE.</span>
          </h2>
          <a
            href="https://github.com/kens1ang/AIGuardian/tree/master"
            className="bg-orange-300 text-black px-4 py-4 rounded-sm hover:underline w-fit mt-10 font-neue-machina font-light justify-end ml-8 sm:ml-0"
          >
            View on Github
          </a>
        </section>

        {/* Your main content */}
        <section className="py-20 max-w-5xl mx-auto">
          <TechStacks />
        </section>
        <section className="py-20 max-w-6xl mx-auto md:pr-14">
          <AIEngineSection />
        </section>
        <section className="py-20 max-w-7xl mx-auto">
          <MonitoringSection />
        </section>
        <section className="py-20 max-w-6xl px-11 md:py-0 mx-auto" id="how">
          <ActionSteps />
        </section>
      </main>

      <footer className="text-center py-8">
        <div className="font-neue-machina font-light">
          <p>
            AIGuardian for{" "}
            <a
              href="https://www.2024.ethkl.org/"
              target="_blank"
              className="text-orange-300 hover:underline"
            >
              ETHKL2024
            </a>
          </p>
          <p>© 2024 AIGuardian</p>
        </div>
      </footer>

      {/* Dialog to alert user to install Phantom Wallet */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-neue-machina">
              Phantom Wallet Not Connected
            </DialogTitle>
            <DialogDescription className="font-neue-machina font-light">
              Please connect Phantom Wallet to access the demo.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="bg-orange-300 text-black mt-4 hover:font-bold hover:bg-orange-400T font-neue-machina font-light"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  );
};

export default LandingPage;
