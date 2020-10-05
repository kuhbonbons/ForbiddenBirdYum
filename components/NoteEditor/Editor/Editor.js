import Section from './Section'

function formatDate(dateObj) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(dateObj)
}

export default function Editor() {
  const formatedDate = formatDate(new Date()).split(' ')

  return (
    <div className="editor">
      <header>
        <hgroup>
          <h1 name="title" id="note-title" contentEditable></h1>
          <h3 name="description" id="note-description" contentEditable></h3>
        </hgroup>
        <div className="date">
          <span className="note-month">{ formatedDate[0] }</span>
          <span className="note-day">{ formatedDate[1] }</span>
        </div>
      </header>
      <section className="note-body">
        <Section />
        <div className="add-section">
          <button type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
          </button>
        </div>
      </section>
      <section className="note-summary">
        <div id="summary" className="editable" contentEditable></div>
      </section>
    </div>
  )
}