<slot />

<style>
	:global(body) {
		font-family: Arial, Helvetica, sans-serif;
	}
	:global(*) {
		box-sizing: border-box;
	}

	:global(.max-w-wrap) {
		max-width: 800px;
	}
	:global(.wrap) {
		max-width: 800px;
		margin: 0 auto;
	}

	:global(button) {
		border: 1px solid #000;
		background: #fff;
		padding: 0.5rem 1rem;
		cursor: pointer;
		border-radius: 0.5rem;
	}
</style>
