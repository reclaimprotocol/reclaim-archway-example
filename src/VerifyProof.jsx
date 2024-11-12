import { useState, useEffect } from "react";
import { transformForOnchain } from "@reclaimprotocol/js-sdk";
import { ArchwayFunctions } from "./utilities/ArchwayFunctions";

export default function VerifyProof(props) {
  const [proof, setProof] = useState({});
  const [verified, setVerified] = useState(false);
  const { verify_proof } = ArchwayFunctions();

  useEffect(() => {
    const newProof = transformForOnchain(props.proof);
    setProof(newProof);
  }, []);

  return (
    <div>
      <button
        className="button"
        onClick={async () => {
          try {
            console.log(proof);
            await verify_proof(proof);
            setVerified(true);
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Verify Proof
      </button>
      {verified && <p> Proof verified </p>}
      <style jsx="true">{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .button {
          border: solid 1px #ccc;
          margin: 0 0 20px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
