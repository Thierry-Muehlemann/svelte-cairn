<script lang="ts">
	import { onMount, setContext } from 'svelte';

	type Breakpoint = {
		columns: number;
	};

	let baseColumns: number = 1;
	export { baseColumns as columns };
	export let breakpoints: { [minWidth: number]: Breakpoint } = {};
	export let algorithm: 'naive' | 'balanced' = 'balanced';
	export let gap = 0;

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

	const EPSILON = 0.1;

	function placeItem(item: HTMLElement, i: number) {
		let column = 0;

		if (algorithm === 'naive') {
			column = i % columns;
		} else if (algorithm === 'balanced') {
			let lowestColumnHeight = columnHeights[0];

			columnHeights.forEach((height, index) => {
				// this fixes cringe floating point errors. Just imagine: if (height < lowestColumnHeight)
				if (lowestColumnHeight - height > EPSILON) {
					lowestColumnHeight = height;
					column = index;
				}
			});
		}

		item.style.width = columnWidth + 'px';
		item.style.left = (columnWidth + gap) * column + 'px';
		item.style.top = columnHeights[column] + 'px';

		columnHeights[column] += item.getBoundingClientRect().height + gap;
		if (container) {
			container.style.height = Math.max(...columnHeights) + 'px';
		}
	}

	function applyBreakpoints(width: number) {
		for (const { minWidth, values } of breakpointsInternal) {
			if (width >= minWidth) {
				columns = values.columns;
				break;
			}
		}
	}

	let width = 0;
	$: reposition(gap, width);

	// responsive stuff
	onMount(() => {
		width = container.getBoundingClientRect().width;

		new ResizeObserver((e) => {
			width = e[0].contentRect.width;
		}).observe(container);
	});

	function reposition(gap: number, width: number) {
		applyBreakpoints(width);
		columnWidth = width / columns;
		// remove gap from columnWidth
		columnWidth -= (gap * (columns - 1)) / columns;

		columnHeights = Array(columns).fill(0);

		// replace all items
		items.forEach((item, i) => {
			placeItem(item, i);
		});
	}
</script>

<div class="cairn-layout" bind:this={container}>
	<slot />
</div>

<style>
	.cairn-layout {
		position: relative;
	}
</style>
