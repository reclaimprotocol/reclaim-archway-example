import { useContext } from "react";
import { ArchwayContext } from "./ArchwayContext";
import { calculateFee, GasPrice } from "@cosmjs/stargate";

let contractAddress = "archway1sqmc9q79fz50tvxul4c8r8k7dg9jagv5cxawqagkp84wq6hh32rqckhu92";

// Uncomment for mainnet
// let contractAddress = "archway19z8n74lcxz5gp0j4s20dfnmq30954k8cagjj53jrutqe2etlph3q87svth";
 
const ArchwayFunctions = () => {
  const { archwayClient, archwayAddress } = useContext(ArchwayContext);
 
  let verify_proof = async (proof) => {
    const defaultGasPrice = GasPrice.fromString("140000000000aarch");
    const defaultExecuteFee = calculateFee(300_000, defaultGasPrice);

    console.log(proof);
    const result = await archwayClient.execute(
      archwayAddress, 
      contractAddress,
      {
        verify_proof: {
          proof: proof
        }
      },
      defaultExecuteFee
    );
    console.log(result);
  }

  return {
    verify_proof
  };
};
 
export { ArchwayFunctions };
 