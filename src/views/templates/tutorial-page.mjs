export default function TutorialPage({ html, state = {} }) {
  const { store = {} } = state
  const key = store?.replKey || ''
  const openEditor = store?.repl?.openEditor || 1
  const openPreview = store?.repl?.openPreview || 1
  const repl = store?.repl || {}
  const components = Object.keys(repl)
    .filter((i) => i.startsWith('tab-'))
    .sort((a, b) => a - b)
  return html`
    <style>
      :host {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        height: 100vh;
        overflow: hidden;
      }
    </style>
    <my-theme></my-theme>
    <nav-bar></nav-bar>
    <tutorial-layout>
      <div slot="docs">${store?.tutorialDoc || 'nothing'}</div>
      <div slot="code-source">
        <tab-container
          quantity="${components?.length + 1}"
          tab-group-name="openEditor"
          tab-state-form="run-repl"
          add-tabs="true"
          default-tab="${openEditor}">
          <span slot="title1">index</span>
          <code-editor slot="content1" form-name="run-repl" doc-name="entrySrc">
          </code-editor>
          ${components
            .map((name, i) => {
              const tabNumber = (i + 1).toString()
              return ` 
                  <span slot="title${i + 2}">tab-${tabNumber}</span>
                  <code-editor
                    slot="content${i + 2}"
                    form-name="run-repl"
                    doc-name="tab-${tabNumber}">
                  </code-editor>
              `
            })
            .join('\n')}
          <div style="display:none" slot="add-tab-content">
            <span slot="title">component</span>
            <code-editor slot="content"> </code-editor>
          </div>
        </tab-container>
      </div>
      <div slot="code-output">
        <tab-container
          tab-group-name="openPreview"
          default-tab="${openPreview}"
          tab-state-form="run-repl"
          quantity="2"
          class=" w-full  ">
          <span slot="title1">Preview</span>
          <enhance-preview slot="content1" doc-src="previewDoc">
          </enhance-preview>
          <span slot="title2">HTML</span>
          <markup-preview
            slot="content2"
            doc-name="enhancedMarkup"></markup-preview>
        </tab-container>
      </div>
    </tutorial-layout>
    <enhance-runner></enhance-runner>
    <noscript>
      <button form="run-repl" type="submit">Run REPL</button>
      <form id="run-repl" action="/repl" method="POST"></form>
    </noscript>
  `
}
