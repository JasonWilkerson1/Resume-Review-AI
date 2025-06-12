import Vue from 'vue'
import Button from '@/components/ui/Button.vue'
import ButtonGroup from '@/components/ui/ButtonGroup.vue'

// Register components globally
const components = {
  'ui-button': Button,
  'ui-button-group': ButtonGroup
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})

export default (context, inject) => {
  // Inject UI components
  inject('ui', components)
}
