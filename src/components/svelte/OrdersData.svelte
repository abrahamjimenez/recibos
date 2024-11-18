<script lang="ts">
  import type { Order } from "../../types/ReciptData.ts";

  let { result }: { result: Order[] } = $props();
</script>

{#each result as order}
  <h2>Order</h2>
  <p>Received: {order.dateReceived}</p>
  <p>Promised: {order.datePromised}</p>
  <p>Remarks: {order.remarks}</p>
  <p>Total Charges: {order.totalCharges}</p>
  <p>Deposit: {order.deposit}</p>
  <p>Balance Due: {order.balanceDue}</p>

  <h2>Customer</h2>
  <p>Name: {order.customer.name}</p>
  <p>Address: {order.customer.address}</p>
  <p>City: {order.customer.city}</p>
  <p>Phone: {order.customer.phone}</p>

  <h2>Payments</h2>
  {#each order.payments as payment}
    <p>Received: {payment.dateReceived}</p>
    <p>Payment Method: {payment.paymentMethod}</p>
    <p>Amount: {payment.amount}</p>
    <hr />
  {/each}
  <hr />
{/each}
