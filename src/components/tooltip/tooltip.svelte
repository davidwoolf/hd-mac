<script>
  import { role, tooltip } from "@components/anatomykit/tooltip";

  /** @type {
    "top-left" | 
    "top-center" | 
    "top-right" | 
    "bottom-left" | 
    "bottom-center" | 
    "bottom-right" | 
    "left-top" | 
    "left-center" | 
    "left-bottom" | 
    "right-top" | 
    "right-center" | 
    "right-bottom"
  } */
  export let position = "top-center";
  export let offset = 0;

  let focused = false;
</script>

<div
  class="container"
  use:tooltip={{
    offset,
    position,
    onChange: (value) => {
      focused = value;
    },
  }}>
  {#if focused}
    <div class="tooltip" {role} tabindex="-1">
      <div class="tooltip-content">
        <slot name="info" />
      </div>
    </div>
  {/if}

  <div>
    <slot name="content" />
  </div>
</div>

<style>
  .container {
    display: inline-block;
    position: relative;
  }

  .tooltip {
    /* padding-block-end: 10px; */
  }

  .tooltip-content {
    background-color: var(--color-canvas);
    border: 1px solid var(--color-highlight);
    padding: 0.25rem;
  }
</style>
