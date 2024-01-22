<script>
  import { slider } from "@components/anatomykit/slider";

  export let min = 0;
  export let max = 100;
  export let step = 1;
  /** @type {string} */
  export let name;

  /** @type {"ltr" | "rtl"} */
  export let dir = "ltr";

  /** @type {number | undefined} */
  export let value = undefined;

  /** @type {"horizontal" | "vertical"} */
  export let orientation = "horizontal";

  /** @type {((value: number) => void)} */
  export let onChange;
</script>

<span
  use:slider={{
    dir,
    max,
    min,
    onChange,
    orientation,
    step,
    value,
  }}>
  <slot />
</span>

<input type="hidden" bind:value {name} />

<style>
  span {
    height: 0.375rem;
    width: 8rem;
  }
</style>
