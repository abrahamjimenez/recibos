<script>
  let phone = $state("");
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
        phone,
      }),
    });
    const { result } = await response.json();
    customers = result;
  };
</script>

<!--todo Set phone input to type of E164
todo format like in payment page, using a svelte component
https://www.npmjs.com/package/svelte-tel-input-->
<label for="phone">Phone</label>
<input type="text" bind:value={phone} />
<button type="submit" onclick={handleSubmit}>Submit</button>

{#each customers as customer}
  <p>Customer ID: {customer.customerId}</p>
  <p>Name: {customer.name}</p>
  <p>Address: {customer.address}</p>
  <p>City: {customer.city}</p>
  <p>Phone: {customer.phone}</p>
{/each}
