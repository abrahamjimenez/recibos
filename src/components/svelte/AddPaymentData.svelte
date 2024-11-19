<!--todo check if user phone exists? -->

<script lang="ts">
    import {AsYouType} from "libphonenumber-js";
    import {type AddPaymentData} from "../../types/AddPaymentData.ts";
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
        const {result}: { result: AddPaymentData[] } = await response.json();
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
<input type="text" id="phone" bind:value={phone} oninput={handlePhoneInput}/>
<button type="submit" onclick={handleSubmit}>Submit</button>

<!--todo add payment button and corresponding query-->
{#each customers as customer}
    <br/>
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
    <!-- todo display the customer payments -->
    {#each customer.orders as order}
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
                <td>{order.orderId}</td>
                <td>{order.customerId}</td>
                <td>{order.dateReceived}</td>
                <td>{order.datePromised}</td>
                <td>{order.deposit}</td>
                <td>{order.remarks}</td>
                <td>{order.totalCharges}</td>
                <td>{order.balanceDue}</td>
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
            {#each order.payments as payment}
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
        <AddPayment balanceDue={order.balanceDue} orderId={order.orderId}/>
    {/each}
{/each}

<style>
    table,
    td {
        border: 1px solid black;
    }
</style>
