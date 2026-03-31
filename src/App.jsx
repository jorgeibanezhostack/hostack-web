import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to Hostack</h1>
      </header>
      <main className="app-content">
        <section className="problem-section">
          <h2>Problem</h2>
          <p>Many developers struggle with...</p> {/* Add full translation content */}
        </section>
        <section className="solution-section">
          <h2>Solution</h2>
          <p>Our platform provides...</p> {/* Add full translation content */}
        </section>
        <section className="pricing-section">
          <h2>Pricing</h2>
          <p>Choose the plan that fits you...</p> {/* Add full translation content */}
        </section>
      </main>
    </div>
  );
};

export default App;