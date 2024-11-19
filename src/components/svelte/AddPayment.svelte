<script lang="ts">
  import { getCurrentDateTime } from "../../utils/dateUtils.ts";

  let { balanceDue } = $props();
  let dateReceived = $state(getCurrentDateTime());
  let amount: number = $state(0);

  const originUrl = window.location.origin;
  const endpoint = `${originUrl}/api/createPayment`;

  const handleSubmit = async () => {
    const paymentData = new FormData();
    paymentData.append("amount", amount.toString());

    const data = await fetch(endpoint, {
      method: "POST",
      body: paymentData,
    });

    const result = await data.json();
    // console.log(result);
  };
</script>

<label for="paymentDateReceived">Date Received</label>
<input
  type="datetime-local"
  name="paymentDateReceived"
  id="paymentDateReceived"
  value={dateReceived}
  disabled
  readOnly
/>

<label for="amount">Amount</label>
<input type="number" name="amount" id="amount" bind:value={amount} />
<p>Balance Due: {balanceDue}</p>

<button type="submit" onclick={handleSubmit}>Submit</button>

<style>
  label,
  input,
  textarea {
    display: block;
  }
</style>
