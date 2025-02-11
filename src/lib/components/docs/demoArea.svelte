<script lang="ts">
	export let title = 'Resizable Demo Area';
	export let maxHeight: string | undefined = undefined;

	let showCode = false;

	$: showHeader = title.length > 0 || $$slots.code;
</script>

<div class="demo-container" style:max-height={maxHeight || 'unset'}>
	<div class="demo-content">
		{#if showHeader}
			<div class="demo-header">
				<h3>{title}</h3>
				{#if $$slots.code}
					<button on:click={() => (showCode = !showCode)}>Show code</button>
				{/if}
			</div>
		{/if}
		<div class="demo-inner">
			{#if showCode}
				<div class="demo-code">
					<slot name="code" />
				</div>
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</div>

<style>
	.demo-container {
		height: 66svh;
		width: 100%;
		border-radius: 8px;
		align-items: center;
		display: flex;
		justify-content: center;
		margin-bottom: 4rem;
	}

	.demo-header {
		font-size: 1.125rem;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--border-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.demo-content {
		border: 1px solid var(--border-color);
		background: var(--bg-color);
		border-radius: 8px;
		width: 100%;
		height: 100%;
		resize: horizontal;
		overflow: hidden;
		box-shadow:
			0 20px 25px -5px rgb(0 0 0 / 0.1),
			0 8px 10px -6px rgb(0 0 0 / 0.1);
	}

	.demo-inner {
		padding: 1rem;
		overflow-y: auto;
		height: 100%;
		margin-right: 1rem;
	}
</style>
