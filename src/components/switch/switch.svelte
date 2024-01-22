<script>
  import { controlswitch } from "@components/anatomykit/switch.js";

  export let disabled = false;
  export let value = false;

  /** @type {((value: boolean) => void) | undefined} */
  export let onChange = undefined;
</script>

<label
  use:controlswitch={{
    value,
    onChange: (value) => onChange && onChange(value),
  }}>
  <span>Mode</span>

  <button type="button" {disabled} role="switch" aria-checked={value}>
    <span />
  </button>
</label>

<style>
  label {
    align-items: center;
    display: inline-flex;
    gap: 1rem;
  }

  button {
    background-color: var(--color-document);
    border-radius: 9999px;
    height: 1.5rem;
    position: relative;
    width: 2.7rem;
  }

  button span {
    background-color: var(--color-highlight);
    border-radius: 9999px;
    display: block;
    height: 1.2rem;
    left: 0.15rem;
    top: 0.15rem;
    transition: transform 0.2s ease;
    position: absolute;
    width: 1.2rem;
  }

  button[aria-checked="true"] {
    background-color: var(--color-highlight);
  }

  button[aria-checked="true"] span {
    background-color: var(--color-canvas);
    transform: translateX(100%);
  }
</style>
