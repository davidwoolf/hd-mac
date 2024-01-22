<!-- data-orientation="horizontal" -->

<span data-type="track">
  <slot />
</span>

<style>
  span {
    background: var(--color-document);
    border-radius: 9999px;
    box-shadow: 0 0 0 1px var(--color-canvas), 0 0 0 2px var(--color-highlight);
    height: 0.5rem;
    position: relative;
    width: 100%;
  }
</style>
