<script>
  /** @type {"vertical" | "horizontal"}*/
  export let orientation = "horizontal";

  export let height = "auto";
  export let width = "auto";
</script>

<div
  role="separator"
  aria-orientation={orientation}
  style:--height={orientation === "horizontal" ? "1px" : height}
  style:--width={orientation === "vertical" ? "1px" : width} />

<style>
  div {
    background-color: var(--color-document);
    height: var(--height);
    width: var(--width);
  }
</style>
