import { createContext, useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
const ArchwayContext = createContext(null);

const ARCHWAY_CHAIN_ID = 'constantine-3';
const ARCHWAY_LCD = 'https://rpc.constantine.archway.tech';

// Uncomment for Mainnet
// const ARCHWAY_CHAIN_ID = 'archway-1';
// const ARCHWAY_LCD = 'https://rpc.mainnet.archway.io';
 
const ArchwayContextProvider = ({ children }) => {
  const [archwayClient, setArchwayClient] = useState(null);
  const [archwayAddress, setArchwayAddress] = useState("");
 
  async function setupKeplr() {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
 
    while (
      !window.keplr ||
      !window.getEnigmaUtils ||
      !window.getOfflineSignerOnlyAmino
    ) {
      await sleep(50);
    }
 
    await window.keplr.enable(ARCHWAY_CHAIN_ID);
    window.keplr.defaultOptions = {
      sign: {
        preferNoSetFee: false,
        disableBalanceCheck: true,
      },
    };
 
    const keplrOfflineSigner =
      window.getOfflineSignerOnlyAmino(ARCHWAY_CHAIN_ID);
    const accounts = await keplrOfflineSigner.getAccounts();
 
    console.log(accounts[0].address);
    const archwayAddress = accounts[0].address;
 
    const archwayClient = await SigningCosmWasmClient.connectWithSigner(ARCHWAY_LCD, keplrOfflineSigner);
 
    setArchwayAddress(archwayAddress);
    setArchwayClient(archwayClient);
  }
 
  async function connectWallet() {
    console.log(1);
    try {
      if (!window.keplr) {
        console.log("intall keplr!");
      } else {
        await setupKeplr();
        localStorage.setItem("keplrAutoConnect", "true");
      }
    } catch (error) {
      alert(
        "An error occurred while connecting to the wallet. Please try again."
      );
    }
  }
 
  function disconnectWallet() {
    // reset archwayClient and archwayAddress
    setArchwayAddress("");
    setArchwayClient(null);
 
    // disable auto connect
    localStorage.setItem("keplrAutoConnect", "false");
 
    // console.log for success
    console.log("Wallet disconnected!");
  }

  async function addArchwayToKeplr () {
        try {
          if (!window.keplr) {
            alert("Intall keplr!");
          } else {

            const chainConfig = {
              "bech32Config": {
                "bech32PrefixAccAddr": "archway",
                "bech32PrefixAccPub": "archwaypub",
                "bech32PrefixConsAddr": "archwayvalcons",
                "bech32PrefixConsPub": "archwayvalconspub",
                "bech32PrefixValAddr": "archwayvaloper",
                "bech32PrefixValPub": "archwayvaloperpub"
              },
              "bip44": {
                "coinType": 118
              },
              "chainId": "constantine-3",
              "chainName": "Archway (Testnet)",
              "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/constantine/chain.png",
              "currencies": [
                {
                  "coinDecimals": 18,
                  "coinDenom": "CONST",
                  "coinMinimalDenom": "aconst"
                }
              ],
              "features": ["cosmwasm"],
              "feeCurrencies": [
                {
                  "coinDecimals": 18,
                  "coinDenom": "CONST",
                  "coinMinimalDenom": "aconst",
                  "gasPriceStep": {
                    "low": 140000000000,
                    "average": 196000000000,
                    "high": 225400000000
                  }
                }
              ],
              "rest": "https://api.constantine.archway.tech",
              "rpc": "https://rpc.constantine.archway.tech",
              "stakeCurrency": {
                "coinDecimals": 18,
                "coinDenom": "CONST",
                "coinMinimalDenom": "aconst"
              },
              "nodeProvider": {
                "name": "Phi Labs",
                "email": "support@philabs.xyz",
                "website":"https://philabs.xyz"
              }
            }
            //Uncomment for Mainnet
            
            // const chainConfig = {
            //   "bech32Config": {
            //     "bech32PrefixAccAddr": "archway",
            //     "bech32PrefixAccPub": "archwaypub",
            //     "bech32PrefixConsAddr": "archwayvalcons",
            //     "bech32PrefixConsPub": "archwayvalconspub",
            //     "bech32PrefixValAddr": "archwayvaloper",
            //     "bech32PrefixValPub": "archwayvaloperpub"
            //   },
            //   "bip44": {
            //     "coinType": 118
            //   },
            //   "chainId": "archway-1",
            //   "chainName": "Archway",
            //   "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/chain.png",
            //   "currencies": [
            //     {
            //       "coinDecimals": 18,
            //       "coinDenom": "ARCH",
            //       "coinGeckoId": "archway",
            //       "coinMinimalDenom": "aarch",
            //       "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
            //     }
            //   ],
            //   "features": ["cosmwasm"],
            //   "feeCurrencies": [
            //     {
            //       "coinDecimals": 18,
            //       "coinDenom": "ARCH",
            //       "coinGeckoId": "archway",
            //       "coinMinimalDenom": "aarch",
            //       "gasPriceStep": {
            //         "low": 140000000000,
            //         "average": 196000000000,
            //         "high": 225400000000
            //       },
            //       "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
            //     }
            //   ],
            //   "rest": "https://api.mainnet.archway.io",
            //   "rpc": "https://rpc.mainnet.archway.io",
            //   "stakeCurrency": {
            //     "coinDecimals": 18,
            //     "coinDenom": "ARCH",
            //     "coinGeckoId": "archway",
            //     "coinMinimalDenom": "aarch",
            //     "coinImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png"
            //   },
            //   "nodeProvider": {
            //     "name": "Phi Labs",
            //     "email": "support@philabs.xyz",
            //     "website":"https://philabs.xyz"
            //   }
            // }
          await window.keplr.experimentalSuggestChain(chainConfig);
      }
    } catch (error) {
      alert(
        "An error occurred while connecting to the wallet. Please try again."
      );
    }
  }

  return (
    <ArchwayContext.Provider
      value={{
        archwayClient,
        setArchwayClient,
        archwayAddress,
        setArchwayAddress,
        connectWallet,
        disconnectWallet,
        addArchwayToKeplr
      }}
    >
      {children}
    </ArchwayContext.Provider>
  );
};

export { ArchwayContext, ArchwayContextProvider };