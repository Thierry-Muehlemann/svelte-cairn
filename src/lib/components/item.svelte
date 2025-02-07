<script>
	import { getContext } from 'svelte';

	const registerItem = getContext('cairn-register-item');

	let extraClasses = '';
	export { extraClasses as class };
</script>

<div use:registerItem class="cairn-item {extraClasses}" {...$$restProps}>
	<slot />
</div>

<style>
	.cairn-item {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
