<script>
  /** @type {string} */
  export let title;
</script>

<header>
  <div class="spanner" role="presentation">
    <button class="close" aria-label="Close" />
    {#each new Array(6) as _item}
      <div class="line" />
    {/each}
  </div>

  <span>{title}</span>
  <div class="spanner" role="presentation">
    {#each new Array(6) as _item}
      <div class="line" />
    {/each}
  </div>
</header>

<style>
  header {
    align-items: center;
    background: var(--color-canvas);
    border-bottom: 1px solid var(--color-highlight);
    height: 1.5rem;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 0.5rem;
    padding: 0 0.125rem;
  }

  .spanner {
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: relative;
  }

  .close {
    background-color: var(--color-canvas);
    border: 1px solid var(--color-highlight);
    box-shadow: 0 0 0 2px var(--color-canvas);
    height: 1rem;
    left: 0.75rem;
    position: absolute;
    width: 1rem;
  }

  .line {
    background-color: var(--color-highlight);
    height: 1px;
  }
</style>
