<template>
  <div class="d-flex justify-center">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: {
    htmlGen: { type: String, default: 'Veuillez générer le code HTML avant de copier' }
  }
}
</script>

<style>

</style>
