"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Navbart from "@/components/navbar";

const Cautions = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleConnectWallet = () => {
    if (isAgreed) {
      // Your logic to enable the connect wallet functionality
      console.log("Connect Wallet button clicked!");
    }
  };

  return (
    <div className="w-screem min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <Navbart />
      <div className="flex flex-col items-center justify-center space-y-10">
        <h1 className="text-4xl font-bold text-center mt-10">Cautions</h1>
        <div className="w-96 h-90">
          <Card className=
"p-10 h-full w-full bg-gray-300 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
            <h1 className="text-2xl font-bold text-center mb-3">Important to Note</h1>
            <p className="text-sm font-medium leading-none mb-5 gap-10">
              In order to ensure the security of your personal information, please take note of the following precautions before proceeding with the KYC process:
            </p>
            <ul className="list-disc list-inside text-sm font-medium leading-none space-y-2">
              <li>Do not share your private key or any sensitive information with anyone.</li>
              <li>Ensure you are using a secure and trusted connection when submitting your KYC details.</li>
              <li>Verify the authenticity of the KYC platform and use official channels for submission.</li>
              <li>Double-check the URL to make sure you are on the correct KYC portal.</li>
            </ul>
          </Card>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="terms"
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none ml-2"
          >
            I have read and accept the terms and conditions
          </label>
        </div>
        <Button disabled={!isAgreed} onClick={handleConnectWallet}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Cautions;
