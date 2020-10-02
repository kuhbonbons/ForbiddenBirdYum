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
        <div className="keyword" contentEditable></div>
        <div className="content" contentEditable></div>
      </section>
      <section className="note-summary">
        <div id="summary" className="editable" contentEditable></div>
      </section>
    </div>
  )
}