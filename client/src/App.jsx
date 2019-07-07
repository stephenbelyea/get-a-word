import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      definitions: [],
      showDefinitions: false,
      loading: false
    };
    this.handleGetWord = this.handleGetWord.bind(this);
    this.toggleShowDefinitions = this.toggleShowDefinitions.bind(this);
  }

  async getTermAndDefinitions() {
    this.setState(() => ({ loading: true }));
    try {
      const response = await fetch(
        "http://localhost:3001/term-and-definitions",
        { mode: "cors" }
      );
      const { term, definitions } = await response.json();
      this.setState(() => ({
        term,
        definitions,
        loading: false
      }));
    } catch (e) {
      console.error(e.error);
      this.setState(() => ({ loading: false }));
    }
  }

  handleGetWord() {
    if (this.state.showDefinitions) {
      this.toggleShowDefinitions();
    }
    this.getTermAndDefinitions();
  }

  toggleShowDefinitions() {
    this.setState(state => ({ showDefinitions: !state.showDefinitions }));
  }

  render() {
    const { term, definitions, showDefinitions, loading } = this.state;
    return (
      <main>
        <div className="get-word">
          <h1>Get A Word</h1>
          <button
            className="get-word-button"
            onClick={this.handleGetWord}
            disabled={loading}
          >
            Get Word!
          </button>
        </div>
        {term && !loading && (
          <div className="got-word">
            <h2>{term}</h2>
            {definitions.length > 0 && (
              <>
                <p>
                  <button
                    className="toggle-definitions-button"
                    onClick={this.toggleShowDefinitions}
                  >
                    {showDefinitions ? "Hide" : "Show"} definition(s)
                  </button>
                </p>
                {showDefinitions && (
                  <ul>
                    {definitions.map(def => (
                      <li key={def.id}>
                        {def.type && (
                          <span className="type">
                            (<em>{def.type}</em>){" "}
                          </span>
                        )}
                        <span className="value">{def.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        )}
      </main>
    );
  }
}

export default App;
