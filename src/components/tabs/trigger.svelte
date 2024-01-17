<script>
  /** @type {string} */
  export let value;
</script>

<!-- 
  requirements 
  - id (for aria labelled by in tab)
  - aria-selected
  - aria-controls
  - tabindex="-1"
-->
<button role="tab" data-value={value}>
  <slot />
</button>

<style>
  button {
    border: 1px solid var(--color-highlight);
    margin: -1px -1px -1px 0;
    padding: 0.25rem 0.5rem;
  }

  :global(button[aria-selected="true"]) {
    background-color: var(--color-document);
  }
</style>
