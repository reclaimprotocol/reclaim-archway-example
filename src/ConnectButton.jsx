import { useContext } from "react";
import { ArchwayContext } from "./utilities/ArchwayContext";
 
export default function ConnectButton () {
    const { archwayAddress, connectWallet, addArchwayToKeplr } = useContext(ArchwayContext);
  
    return (
        <div>Archway
        <div>
          <button className="button" onClick={addArchwayToKeplr}>
            Add Archway to Keplr
          </button>
          <hr/>
          <button className="button" onClick={connectWallet}>
            Connect Keplr
          </button>
        </div>
        <h2>
          {archwayAddress
            ? archwayAddress.slice(0, 10) + "...." + archwayAddress.slice(41, 45)
            : "Please connect wallet"}
        </h2>
      </div>
    )
}