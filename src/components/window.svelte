<script>
  import Title from "@components/title.svelte";

  /** @type {string} */
  export let title;
  export let height = 288;
  export let width = 576;
  export let left = 0;
  export let top = 0;
</script>

<div
  class="container"
  style:height="{height}px"
  style:width="{width}px"
  style:left="{left}px"
  style:top="{top}px">
  <Title {title} />

  <div class="contents">
    <slot />
  </div>
</div>

<style>
  .container {
    background: var(--color-canvas);
    border: 1px solid black;
    box-shadow: 3px 3px 0px 0px black;
    position: absolute;
  }

  .contents {
    padding: 1rem;
  }
</style>
