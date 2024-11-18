<script lang="ts">
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
