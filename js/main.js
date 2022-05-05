import {render} from './helper.js';

render()

window.addEventListener('popstate', () => {
  render()
})
