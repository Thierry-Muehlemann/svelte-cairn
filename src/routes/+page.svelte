<script lang="ts">
	import Cairn from '$lib';

	let items = [];

	function addItem() {
		items = [...items, { id: items.length + 1, text: 'Hello World', height: Math.random() * 100 }];
	}

	let interval = null;
	function toggleAutoAdd() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		} else {
			interval = setInterval(() => {
				addItem();
			}, 10);
		}
	}
</script>

<main>
	<h1>Welcome to svelte-cairn</h1>
	<p>A layout library for svelte</p>
	<button on:click={toggleAutoAdd}> toggle auto add </button>
	<button on:click={addItem}> add item </button>
	<Cairn.Layout
		columns={1}
		breakpoints={{
			450: { columns: 2 },
			500: { columns: 3 },
			550: { columns: 4 },
			600: { columns: 5 },
			650: { columns: 6 },
			750: { columns: 7 },
			800: { columns: 8 }
		}}
	>
		{#each items as item}
			<Cairn.Item>
				<div class="box" style="min-height: {item.height}px;">{item.id}</div>
			</Cairn.Item>
		{/each}
	</Cairn.Layout>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</main>

<style>
	:global(body) {
		background: #f1f5f9;
	}
	main {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
		font-family: sans-serif;
	}
	.box {
		border-radius: 10px;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		border: 1px solid #e2e8f0;
		font-size: 1.5rem;
		fontweight: bold;
		color: #3b82f6;
	}
</style>
