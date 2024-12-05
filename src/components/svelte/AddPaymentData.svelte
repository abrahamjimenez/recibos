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
    customers = result.map((customer) => ({
      ...customer,
      showOrderTable: false,
      showPaymentTable: false,
    }));
    // console.log(customers[0]);
  };

  const toggleOrderTable = (customer) => {
    customer.showOrderTable = !customer.showOrderTable;
  };

  const togglePaymentTable = (customer) => {
    customer.showPaymentTable = !customer.showPaymentTable;
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
  <div class="customer--container">
    <br />
    <table class="customer--table">
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
    <button onclick={() => toggleOrderTable(customer)}>
      {customer.showOrderTable ? "Hide order" : "Show order"}
    </button>
    {#if customer.showOrderTable}
      <table class="order--table">
        <caption>{customer.name}'s Order</caption>
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
            <td>{customer.order.orderId}</td>
            <td>{customer.order.customerId}</td>
            <td>{customer.order.dateReceived}</td>
            <td>{customer.order.datePromised}</td>
            <td>{customer.order.deposit}</td>
            <td>{customer.order.remarks}</td>
            <td>{customer.order.totalCharges}</td>
            <td>{customer.order.balanceDue}</td>
          </tr>
        </tbody>
      </table>
    {/if}
    <button onclick={() => togglePaymentTable(customer)}>
      {customer.showPaymentTable ? "Hide payments" : "Show payments"}
    </button>
    {#if customer.showPaymentTable}
      <table class="payment--table">
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
        {#each customer.order.payments as payment}
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
    {/if}
    <h2>Add payment for {customer.name}</h2>
    <AddPayment
      balanceDue={customer.order.balanceDue}
      orderId={customer.order.orderId}
    />
  </div>
{/each}

<style>
  .customer--container {
    overflow-x: auto;
    padding: 8px 0;

    &:nth-child(even) {
      background-color: lightblue;
    }
  }

  .customer--table,
  .order--table,
  .payment--table {
    width: 100%;

    thead {
      outline: 1px solid black;
      border-radius: 8px 8px 0 0;
    }

    tbody {
      outline: 1px solid black;
    }

    caption {
      text-align: left;
      font-weight: bold;
    }

    td {
      outline: none;
      padding: 4px;
      border-right: 1px solid black;

      &:last-child {
        border: none;
      }
    }
  }
</style>
