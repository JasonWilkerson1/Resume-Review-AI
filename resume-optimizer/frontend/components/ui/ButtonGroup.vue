<template>
  <div 
    :class="[
      'flex',
      {
        'flex-col space-y-2': vertical,
        'space-x-2': !vertical && !noSpace,
      },
      className
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    noSpace: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
