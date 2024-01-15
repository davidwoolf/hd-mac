<script>
  /** @type {number} */
  export let value;

  let localValue = value;

  $: {
    if (value < 0) {
      localValue = 0;
    }

    if (value > 100) {
      localValue = 100;
    }
  }
</script>

<div role="progressbar" aria-valuenow={localValue} class="bar">
  <div class="progress" style:width="{localValue}%" />
</div>

<style>
  .bar {
    background-color: var(--color-document);
    border-radius: 9999px;
    height: 1rem;
    overflow: hidden;
  }

  .progress {
    background-color: var(--color-highlight);
    height: 100%;
  }
</style>
