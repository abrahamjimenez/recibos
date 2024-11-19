<script lang="ts">
    import {getCurrentDateTime} from "../../utils/dateUtils.ts";

    let {balanceDue, orderId}: { balanceDue: number, orderId: number } = $props();
    let dateReceived = $state(getCurrentDateTime());
    let amount: number = $state(0);
    let newBalance = $derived(balanceDue - amount)

    const originUrl = window.location.origin;
    const createPaymentEndpoint = `${originUrl}/api/createPayment`;
    const updateOrderEndpoint = `${originUrl}/api/updateOrderBalance`;

    const handleSubmit = async () => {
        const paymentData = new FormData();
        paymentData.append("amount", amount.toString());
        paymentData.append("orderId", orderId.toString());

        const createPaymentResult = await fetch(createPaymentEndpoint, {
            method: "POST",
            body: paymentData,
        });

        const updateOrderResult = await fetch(updateOrderEndpoint, {
            method: "PATCH",
            body: JSON.stringify({balanceDue: newBalance, orderId})
        });

        const orderResult = await updateOrderResult.json()
        console.log(orderResult);

        // const result = await createPaymentResult.json();
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
<input type="number" name="amount" id="amount" bind:value={amount}/>
<p>Balance Due: {newBalance}</p>

<button type="submit" onclick={handleSubmit}>Submit</button>

<style>
    label,
    input,
    textarea {
        display: block;
    }
</style>
