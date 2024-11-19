<script lang="ts">
    import {AsYouType} from 'libphonenumber-js'

    let phone = $state("");
    let formattedPhone: string = $state("");
    let customers = $state([]);

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
        const {result} = await response.json();
        customers = result;
    };

    const handlePhoneInput = () => {
        // This formats the input
        const asYouType = new AsYouType("US")
        phone = asYouType.input(phone)
        // This gets characters & sends to body of request
        formattedPhone = asYouType.getChars()
        console.log(formattedPhone);
    }
</script>

<label for="phone">Phone</label>
<input type="text" bind:value={phone} oninput={handlePhoneInput}/>
<button type="submit" onclick={handleSubmit}>Submit</button>

{#each customers as customer}
    <p>Customer ID: {customer.customerId}</p>
    <p>Name: {customer.name}</p>
    <p>Address: {customer.address}</p>
    <p>City: {customer.city}</p>
    <p>Phone: {customer.phone}</p>
{/each}
