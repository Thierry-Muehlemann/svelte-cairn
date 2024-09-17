<script lang="ts">
	import { onMount, setContext } from 'svelte';

	type Breakpoint = {
		columns: number;
	};

	let baseColumns: number = 1;
	export { baseColumns as columns };
	export let breakpoints: { [minWidth: number]: Breakpoint } = {};
	export let algorithm: 'naive' | 'balanced' = 'balanced';

	let columns = baseColumns;

	let items: HTMLElement[] = [];

	const breakpointsInternal: { minWidth: number; values: Breakpoint }[] = breakpoints
		? Object.entries(breakpoints).map(([minWidth, value]) => ({
				minWidth: parseInt(minWidth),
				values: value
			}))
		: [];
	breakpointsInternal.push({ minWidth: 0, values: { columns: columns } });
	breakpointsInternal.sort((a, b) => b.minWidth - a.minWidth);

	setContext('cairn-register-item', (node: HTMLElement) => {
		items.push(node);
		placeItem(node, items.length - 1);

		return {
			update(newNode: HTMLElement) {
				items = items.map((item) => (item === node ? newNode : item));
			},
			destroy() {
				items = items.filter((item) => item !== node);
			}
		};
	});

	let container: HTMLElement;
	let columnWidth = 0;

	let columnHeights = Array(columns).fill(0);

	function placeItem(item: HTMLElement, i: number) {
		let column = 0;

		if (algorithm === 'naive') {
			column = i % columns;
		} else if (algorithm === 'balanced') {
			let lowestColumnHeight = columnHeights[0];

			columnHeights.forEach((height, index) => {
				if (height < lowestColumnHeight) {
					lowestColumnHeight = height;
					column = index;
				}
			});
		}

		item.style.width = columnWidth + 'px';
		item.style.left = columnWidth * column + 'px';
		item.style.top = columnHeights[column] + 'px';

		columnHeights[column] += item.getBoundingClientRect().height;
		if (container) {
			container.style.height = Math.max(...columnHeights) + 'px';
		}
	}

	function applyBreakpoints(width: number) {
		for (const { minWidth, values } of breakpointsInternal) {
			console.log('minWidth', minWidth, 'values', values);
			if (width >= minWidth) {
				columns = values.columns;
				break;
			}
		}
	}

	// responsive stuff
	onMount(() => {
		new ResizeObserver((e) => {
			let width = e[0].contentRect.width;

			applyBreakpoints(width);
			columnWidth = width / columns;
			columnHeights = Array(columns).fill(0);

			// replace all items
			items.forEach((item, i) => {
				placeItem(item, i);
			});
		}).observe(container);
	});
</script>

<div class="cairn-layout" bind:this={container}>
	<slot />
</div>

<style>
	.cairn-layout {
		position: relative;
	}
</style>
