<script lang="ts">
	import Cairn from '$lib';

	const items = Array.from({ length: 100 }).map((_, i) => ({
		id: i + 1,
		text: 'Hello World',
		height: Math.random() * 100
	}));

	let gap = 10;
</script>

<main>
	<h1>Welcome to svelte-cairn</h1>
	<p>A layout library for svelte</p>

	<label>
		<input type="range" min="0" max="40" bind:value={gap} id="myRange" />
		gap: {gap}
	</label>

	<Cairn.Layout
		columns={1}
		{gap}
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
		{#each items as item, i}
			<Cairn.Item class={i % 2 === 0 ? ' highlight' : ''}>
				<div class="box" style="min-height: {item.height}px;">
					{item.id}
				</div>
			</Cairn.Item>
		{/each}
	</Cairn.Layout>
</main>

<style>
	:global(body) {
		background: #f1f5f9;
	}
	:global(.highlight) {
		--bg-color: rgb(59 130 246 / 10%);
	}
	main {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
		font-family: sans-serif;
	}
	.box {
		border-radius: 10px;
		background: var(--bg-color, #fff);
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		border: 1px solid rgb(0 0 0 / 0.1);
		font-size: 1.5rem;
		fontweight: bold;
		color: #3b82f6;
		box-shadow:
			0 4px 6px -1px rgb(0 0 0 / 0.1),
			0 2px 4px -2px rgb(0 0 0 / 0.1);
	}
</style>
