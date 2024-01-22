<script>
</script>

<dialog>
  <div class="content">
    <slot />
  </div>
</dialog>

<style>
  dialog {
    background: unset;
    max-height: unset;
    max-width: unset;
    overflow: unset;
  }

  .content {
    background-color: white;
    box-shadow: 0 0 0 2px var(--color-highlight), 0 0 0 4px white,
      0 0 0 5px var(--color-highlight);
    padding: 2rem;
  }

  dialog::backdrop {
    opacity: 0;
  }
</style>
