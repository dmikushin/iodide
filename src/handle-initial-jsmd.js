import { stateFromJsmd } from './tools/jsmd-tools'
import handleUrlQuery from './tools/handle-url-query'
import { updateAppMessages, importInitialJsmd, evaluateAllCells } from './actions/actions'
import { getUrlParams, getNotebookInfo } from './editor-state-prototypes'

export default async function handleInitialJsmd(store) {
  let state
  // shorthand for server-loaded, since we haven't actually checked window for server vars yet.
  const notebookInfo = getNotebookInfo() || undefined
  if (window.location.search && notebookInfo) {
    // if there is a query string, handle it and skip parsing the local jsmd
    state = await handleUrlQuery()
  } else {
    // if there is no query string, attempt to parse jsmd from html
    const jsmdElt = document.getElementById('jsmd')
    if (jsmdElt &&
        jsmdElt.innerHTML &&
        jsmdElt.innerHTML.trim() !== '') {
      state = stateFromJsmd(jsmdElt.innerHTML)
    }
  }
  if (state !== undefined) {
    // url parameters may override initial jsmd state if specified
    Object.assign(state, getUrlParams())
    store.dispatch(importInitialJsmd(state))
    if (window.location.search) {
      store.dispatch(updateAppMessages({ message: 'Notebook imported from URL.' }))
    }
    if (state.viewMode === 'REPORT_VIEW') {
      store.dispatch(evaluateAllCells())
    }
  }
}
