<script>
  /** @type {string} */
  export let name;
  /** @type {number} */
  export let max;
  /** @type {number} */
  export let min;
  export let step = 1;
  export let direction = "ltr";
  export let showIndicators = false;
  /** @type {number | undefined} */
  export let value = undefined;
  /** @type {((value: number | undefined) => void) | undefined} */
  export let onUpdate = undefined;

  let notches = Array.from(Array(max - min + 1).keys());

  $: onUpdate && onUpdate(value);
  $: notches = Array.from(Array(max - min + 1).keys());
</script>

<input type="range" {name} {min} {max} {step} style:--range-dir={direction} bind:value />

{#if showIndicators}
  <div class="notches">
    {#each notches as notch}
      <div class="notch">
        <div role="presentation" />
        <span>
          {notch + 1}
        </span>
      </div>
    {/each}
  </div>
{/if}

<style>
  .notches {
    display: flex;
    justify-content: space-between;
  }

  .notch {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.25rem;
    flex: 0 0 0;
  }

  .notch div {
    background-color: black;
    height: 0.375rem;
    width: 1px;
  }

  .notch span {
    font-family: var(--font-secondary);
    font-size: var(--font-size-small);
  }

  input {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: grab;
    height: 1.25rem;
    direction: var(--range-dir);
    width: 100%;
  }

  input:active {
    cursor: grabbing;
  }

  input::-webkit-slider-runnable-track {
    background: var(--color-document);
    border-radius: 9999px;
    box-shadow: 0 0 0 1px var(--color-canvas), 0 0 0 2px var(--color-highlight);
    height: 0.5rem;
  }

  input::-moz-range-track {
    background: var(--color-document);
    border-radius: 9999px;
    box-shadow: 0 0 0 1px var(--color-canvas), 0 0 0 2px var(--color-highlight);
    height: 0.5rem;
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid var(--color-highlight);
    display: block;
    border-radius: 2px;
    height: 1.25rem;
    margin-top: -0.375rem;
    width: 0.375rem;
  }

  input::-moz-range-thumb {
    -moz-appearance: none;
    box-sizing: border-box;
    appearance: none;
    background: white;
    border: 1px solid var(--color-highlight);
    display: block;
    border-radius: 2px;
    height: 1.25rem;
    margin-top: -0.375rem;
    width: 0.375rem;
  }

  /* Removes default focus */
  input:focus {
    outline: none;
  }

  /* Chrome, Safari, Opera, and Edge Chromium */
  input:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 1px var(--color-canvas), 0 0 0 3px var(--color-highlight);
    outline: none;
  }

  /* Firefox */
  input:focus::-moz-range-thumb {
    box-shadow: 0 0 0 1px var(--color-canvas), 0 0 0 3px var(--color-highlight);
    outline: none;
  }
</style>
