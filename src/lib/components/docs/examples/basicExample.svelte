<script>
	import DemoArea from '$lib/components/docs/demoArea.svelte';
	import Cairn from '$lib';
</script>

<section id="basic-example">
	<DemoArea title="Basic Example" maxHeight="500px">
		<div slot="code">
			```svelte
			<script>
				import Cairn from 'svelte-cairn';
			</script>

			<Cairn.Layout columns={3} gap={10}>
				{#each { length: 12 } as _, i}
					<Cairn.Item>
						<div style:height="{i % 2 === 0 ? 200 : 300}px" style:background="rgb(0 0 0 / 10%)" />
					</Cairn.Item>
				{/each}
			</Cairn.Layout>
			```
		</div>
		<Cairn.Layout columns={3} gap={10}>
			{#each { length: 12 } as _, i}
				<Cairn.Item>
					<div style:height="{i % 2 === 0 ? 200 : 300}px" style:background="rgb(0 0 0 / 10%)" />
				</Cairn.Item>
			{/each}
		</Cairn.Layout>
	</DemoArea>
</section>
