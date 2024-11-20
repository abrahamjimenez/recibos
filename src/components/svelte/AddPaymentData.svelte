<script lang="ts">
  import { AsYouType } from "libphonenumber-js";
  import { type AddPaymentData } from "../../types/AddPaymentData.ts";
  import AddPayment from "./AddPayment.svelte";

  let phone = $state("");
  let formattedPhone: string = $state("");
  let customers: AddPaymentData[] = $state([]);

  const originUrl = window.location.origin;
  const endpoint = `${originUrl}/api/getCustomers`;
  const handleSubmit = async () => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: formattedPhone,
      }),
    });
    const { result }: { result: AddPaymentData[] } = await response.json();
    customers = result;
  };

  const handlePhoneInput = () => {
    // This formats the input
    const asYouType = new AsYouType("US");
    phone = asYouType.input(phone);
    // This gets characters & sends to body of request
    formattedPhone = asYouType.getChars();
  };
</script>

<label for="phone">Phone</label>
<input type="text" id="phone" bind:value={phone} oninput={handlePhoneInput} />
<button type="submit" onclick={handleSubmit}>Submit</button>

{#each customers as customer}
  <br />
  <table>
    <caption>{customer.name}'s Information</caption>
    <thead>
      <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Phone</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{customer.customerId}</td>
        <td>{customer.name}</td>
        <td>{customer.phone}</td>
      </tr>
    </tbody>
  </table>
  <table>
    <caption>{customer.name}'s Orders</caption>
    <thead>
      <tr>
        <td>Order ID</td>
        <td>Customer Id</td>
        <td>Received</td>
        <td>Promised</td>
        <td>Deposit</td>
        <td>Remarks</td>
        <td>Total Charges</td>
        <td>Balance Due</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{customer.orders.orderId}</td>
        <td>{customer.orders.customerId}</td>
        <td>{customer.orders.dateReceived}</td>
        <td>{customer.orders.datePromised}</td>
        <td>{customer.orders.deposit}</td>
        <td>{customer.orders.remarks}</td>
        <td>{customer.orders.totalCharges}</td>
        <td>{customer.orders.balanceDue}</td>
      </tr>
    </tbody>
  </table>
  <table>
    <caption>{customer.name}'s Payments</caption>
    <thead>
      <tr>
        <td>Payment Id</td>
        <td>Order Id</td>
        <td>Amount</td>
        <td>Received</td>
        <td>Payment Method</td>
      </tr>
    </thead>
    {#each customer.orders.payments as payment}
      <tbody>
        <tr>
          <td>{payment.paymentId}</td>
          <td>{payment.orderId}</td>
          <td>{payment.amount}</td>
          <td>{payment.dateReceived}</td>
          <td>{payment.paymentMethod}</td>
        </tr>
      </tbody>
    {/each}
  </table>
  <h2>Payment for {customer.name}</h2>
  <AddPayment
    balanceDue={customer.orders.balanceDue}
    orderId={customer.orders.orderId}
  />
{/each}

<style>
  table,
  td {
    border: 1px solid black;
  }
</style>
