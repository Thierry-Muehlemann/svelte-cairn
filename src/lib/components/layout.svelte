<script lang="ts">
	import { onMount, setContext } from 'svelte';

	export let minColumnWidth;
	export let maxColumnWidth;
	export let gap;

	let items: HTMLElement[] = [];

	setContext('cairn-register-item', (node: HTMLElement) => {
		items.push(node);

		// todo: something needs to be done here

		return {
			update(newNode: HTMLElement) {
				console.log('updating item', node);
				items = items.map((item) => (item === node ? newNode : item));
			},
			destroy() {
				console.log('unregistering item', node);
				items = items.filter((item) => item !== node);
			}
		};
	});
	let container: HTMLElement;

	onMount(() => {
		const max = 3;
		const columns = Array(max)
			.fill(null)
			.map(() => document.createElement('article'));

		console.log('items', columns);

		items.forEach((item, index) => {
			columns[index % max].appendChild(item);
		});

		container.append(...columns);
	});
</script>

<div class="container" style:gap bind:this={container}></div>

<div hidden>
	<slot />
</div>

<style>
	.container {
		display: flex;
		width: 100%;
	}
</style>
