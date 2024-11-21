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
        console.log(customers[0]);
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
    <table>
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
    <h2>Payment for {customer.name}</h2>
    <AddPayment
            balanceDue={customer.order.balanceDue}
            orderId={customer.order.orderId}
    />
{/each}

<style>
    table,
    td {
        border: 1px solid black;
    }
</style>
