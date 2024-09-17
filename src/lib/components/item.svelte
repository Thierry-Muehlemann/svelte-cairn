<script>
	import { getContext } from 'svelte';

	const registerItem = getContext('cairn-register-item');
</script>

<div use:registerItem class="cairn-item">
	<slot />
</div>

<style>
	.cairn-item {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
