<script lang="ts">
	import Cairn from '$lib';

	let items = Array(2)
		.fill(0)
		.map((_, i) => ({ id: 1, text: 'Hello World', height: Math.random() * 500 }));

	function addItem() {
		console.log('add item');
		items = [...items, { id: items.length + 1, text: 'Hello World', height: Math.random() * 500 }];
	}

	let count = 0;
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Cairn.Layout minColumnWidth="200px" gap="2rem">
	<Cairn.Item>
		<button on:click={() => count++}> add </button>
		{count}
	</Cairn.Item>
	<Cairn.Item>
		<button on:click={addItem}> add item </button>
	</Cairn.Item>
	{#each items as item}
		<Cairn.Item>
			<div style="height: {item.height}px; border: 1px solid red;">{item.text}</div>
		</Cairn.Item>
	{/each}
</Cairn.Layout>
