<script lang="ts">
	interface Data {
		visited: boolean;
	}

	const { data }: { data: Data } = $props();
</script>

<h1 class="text-9xl">{data.visited ? 'already a user' : 'first time'}</h1>
