<!-- 
  aria-controls
  aria-expanded
  aria-autocomplete="none"
 -->

<!-- svelte-ignore a11y-role-has-required-aria-props requires attributes are included in use:select -->
<button role="combobox">
  <slot />
</button>

<style>
  button {
    border: 1px solid var(--color-highlight);
    border-radius: var(--radius-md);
    line-height: 1;
    padding: 0.25rem 0.375rem;
  }
</style>
