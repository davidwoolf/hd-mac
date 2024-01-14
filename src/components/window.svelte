<script>
  import Title from "@components/title.svelte";

  /** @type {string} */
  export let title;
  export let height = 288;
  export let width = 576;
</script>

<div style:height="{height}px" style:width="{width}px">
  <Title {title} />
  <slot />
</div>

<style>
  div {
    background: #fff;
    border: 1px solid var(--color-highlight);
    box-shadow: 3px 3px 0px 0px var(--color-highlight);
    position: absolute;
    left: 200px;
    top: 200px;
  }
</style>
