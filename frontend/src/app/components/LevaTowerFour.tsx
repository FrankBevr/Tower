
import React, { useEffect, useState } from "react";

import { ContractIds } from "@/deployments/deployments";
import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { InjectedAccount } from "@polkadot/extension-inject/types";
import { Signer } from "@polkadot/types/types";
import {
  contractQuery,
  contractTx,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from "@scio-labs/use-inkathon";
import { button, useControls } from "leva";

interface LevaProps {
  api?: ApiPromise | undefined;
  activeAccount?: InjectedAccount | undefined;
  activeSigner?: Signer | undefined;
  contract?: ContractPromise | undefined;
}

const LevaTowerFour: React.FC<LevaProps> = () => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract: contractTowerFour } = useRegisteredContract(
    ContractIds.TowerFour,
  );

  /***********/
  /*TOWERFOUR*/
  /***********/

  /*READ*/
  const [, setRead] = useControls("TOWERFOUR_READ", () => ({
    totalSupply: "...",
    get_total_supply: button(() => getTotalSupply()),
  }), [activeAccount, contractTowerFour, activeSigner, api]);

  /*WRITE*/
  const [, setM] = useControls(
    "TOWERFOUR_WRITE",
    () => ({
      mint: button(() => mint()),
    }),
    [activeAccount, contractTowerFour, activeSigner, api],
  );

  /*READ Functions*/
  const getTotalSupply = async () => {
    if (!contractTowerFour || !api) return;
    const result = await contractQuery(api, "", contractTowerFour, "psp34::totalSupply");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractTowerFour,
      "psp34::totalSupply",
    );
    if (isError) throw new Error(decodedOutput);
    setRead({ totalSupply: output });
  };

  useEffect(() => {
    getTotalSupply();
  }, [api, contractTowerFour]);

  /*WRITE Functions*/
  const mint = async () => {
    if (!activeAccount || !contractTowerFour || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractTowerFour,
      "psp34Mintable::mint",
      {},
      [0],
    );
    getTotalSupply()
  };

  return null;
};

export default LevaTowerFour;
