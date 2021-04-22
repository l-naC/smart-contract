import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

const { ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  console.log(drizzleState);
  // destructure drizzle and drizzleState from props
  return (
    <div className="App">
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>Drizzle Examples</h1>
        <p>
          Examples of how to get started with Drizzle in various situations.
        </p>
      </div>

      <div className="section">
        <h2>TutorialToken</h2>
        <p>
          Here we have a form with custom, friendly labels. Also note the token
          symbol will not display a loading indicator. We've suppressed it with
          the <code>hideIndicator</code> prop because we know this variable is
          constant.
        </p>
        <p>
          <strong>Total Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="totalSupply"
            methodArgs={[{ from: drizzleState.accounts[0] }]}
          />{" "}
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="symbol"
            hideIndicator
          />
        </p>
        <p>
          <strong>My Balance: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="balanceOf"
            methodArgs={[drizzleState.accounts[0]]}
          />
        </p>
        <h3>Send Tokens</h3>
        <ContractForm
          drizzle={drizzle}
          contract="TutorialToken"
          method="transfer"
          labels={["To Address", "Amount to Send"]}
        />
      </div>

      <div className="section">
        <h2>ShippingContract</h2>
        <p>
          Le smart contract que vous allez créer effectue le suivi de l’état des
          éléments achetés sur une marketplace en ligne. Lorsque le contrat est
          créé, l’état de l’expédition est défini sur Pending. Lorsqu’un article
          est expédié, l’état de l’expédition est défini sur Shipped et un
          événement est émis. Une fois la livraison exécutée, l’état
          d’expédition de l’élément est défini sur Delivered et un autre
          événement est émis.
        </p>
        <ul>
          <li>0 : Pending</li>
          <li>1 : Shipped</li>
          <li>2 : Delivered</li>
        </ul>
        <p>
          <strong>Status : </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ShippingContract"
            method="shippementStatus"
          />
        </p>
        {/* <strong>Create Order : </strong>
        <ContractForm
          drizzle={drizzle}
          contract="ShippingContract"
          method="createOrder(1)"
        /> */}
        <strong>Send Order : </strong>
        <ContractForm
          drizzle={drizzle}
          contract="ShippingContract"
          method="orderSent"
        />
        <strong>Order Delivered: </strong>
        <ContractForm
          drizzle={drizzle}
          contract="ShippingContract"
          method="orderDelivered"
        />
        <strong>Delivery Tip: </strong>
        <ContractForm
          drizzle={drizzle}
          contract="ShippingContract"
          method="deliveryTip"
        />
      </div>
    </div>
  );
};
