<script>
  /** @type {string} */
  export let src;
  /** @type {string} */
  export let alt;
</script>

<img hidden {...$$props} {src} {alt} />

<style>
  img {
    border-radius: 100%;
    height: 3rem;
    width: 3rem;
  }
</style>
