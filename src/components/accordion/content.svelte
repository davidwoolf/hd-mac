<div role="region">
  <slot />
</div>

<style>
  div {
    background-color: color-mix(in srgb, var(--color-document), white 70%);
    border-bottom: 1px solid var(--color-highlight);
    display: none;
    padding: 1rem;
  }
</style>
