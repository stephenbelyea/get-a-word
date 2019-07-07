import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      definitions: []
    };
  }

  async getTermAndDefinitions() {
    try {
      const response = await fetch(
        "http://localhost:3001/term-and-definitions",
        { mode: "cors" }
      );
      const { term, definitions } = await response.json();
      this.setState(state => {
        return {
          term,
          definitions
        };
      });
    } catch (e) {
      console.error(e.error);
    }
  }

  componentDidMount() {
    this.getTermAndDefinitions();
  }

  render() {
    const { term, definitions } = this.state;
    if (!term) {
      return null;
    }
    return (
      <main>
        <h1>{term}</h1>
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
      </main>
    );
  }
}

export default App;
