<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="grid h-full w-full grid-cols-1 grid-rows-1 justify-items-center p-3">
	<div
		class="grid w-11/12 grid-rows-[auto_1fr] gap-3 overflow-hidden rounded-md bg-gray-100 p-3 md:w-8/12 lg:w-7/12"
	>
		<h1 class="text-center text-2xl md:text-3xl lg:text-4xl">Open සිංහල Lyrics</h1>
		{@render children()}
	</div>
</div>
