<script>
	import { getContext } from 'svelte';

	const registerItem = getContext('cairn-register-item');
</script>

<div use:registerItem>
	<slot />
</div>
