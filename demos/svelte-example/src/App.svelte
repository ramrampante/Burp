<script lang="ts">
	import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@Burp/svelte'
	import Burp from '@Burp/core'
	import Webcam from '@Burp/webcam'
	import XHRUpload from '@Burp/xhr-upload'

	const createBurp = () => {
		return new Burp().use(Webcam).use(XHRUpload, {
			bundle: true,
			endpoint: 'http://localhost:9967/upload',
			allowedMetaFields: ['something'],
			fieldName: 'files',
		})
	}

	let Burp1 = createBurp()
	let Burp2 = createBurp()

	let open = false;
	let showInlineDashboard = true;
</script>

<main>
	<h1>Welcome to the <code>@Burp/svelte</code> demo!</h1>
	<h2>Inline Dashboard</h2>
	<label>
      <input
        type="checkbox"
				bind:checked={showInlineDashboard}
			/>
      Show Dashboard
	</label>
	{#if showInlineDashboard}
		<Dashboard
			Burp={Burp1}
			plugins={['Webcam']}
		/>
	{/if}
	<h2>Modal Dashboard</h2>
	<div>
		<button on:click={() => open = true}>Show Dashboard</button>
		<DashboardModal
			Burp={Burp2}
			open={open}
			props={{
				onRequestCloseModal: () => open = false,
				plugins: ['Webcam']
			}}
		/>
	</div>

	<h2>Drag Drop Area</h2>
	<DragDrop
		Burp={Burp1}
	/>

	<h2>Progress Bar</h2>
	<ProgressBar
		Burp={Burp1}
		props={{
			hideAfterFinish: false
		}}
	/>
</main>
<style global>
	@import "@Burp/core/dist/style.min.css";
	@import "@Burp/dashboard/dist/style.min.css";
	@import "@Burp/drag-drop/dist/style.min.css";
	@import "@Burp/progress-bar/dist/style.min.css";
	input[type="checkbox"] {
		user-select: none;
	}
</style>
