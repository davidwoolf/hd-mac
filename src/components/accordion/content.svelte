<div role="region">
  <slot />
</div>

<style>
  div {
    background-color: color-mix(in srgb, var(--color-document), var(--color-canvas) 70%);
    border-bottom: 1px solid var(--color-highlight);
    padding: 1rem;
  }
</style>
