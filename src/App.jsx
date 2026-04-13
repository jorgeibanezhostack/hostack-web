import useBreakpoint from './hooks/useBreakpoint'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Product from './components/Product'
import Results from './components/Results'
import Pricing from './components/Pricing'
import FoundingMember from './components/FoundingMember'
import Footer from './components/Footer'

export default function App() {
  const bp = useBreakpoint()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: #0d1f22;
          background-color: #ffffff;
          line-height: 1.6;
        }

        main {
          width: 100%;
        }

        section {
          width: 100%;
        }

        h1, h2, h3, h4, h5, h6 {
          margin: 0;
        }

        p {
          margin: 0;
        }

        button {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        input, select, textarea {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        input::placeholder,
        textarea::placeholder {
          opacity: 0.6;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #004F59;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #00BFB3;
        }
      `}</style>

      <Nav bp={bp} />
      <main style={{ paddingTop: 56 }}>
        <Hero bp={bp} />
        <Problem bp={bp} />
        <Product bp={bp} />
        <Results bp={bp} />
        <Pricing bp={bp} />
        <FoundingMember bp={bp} />
      </main>
      <Footer bp={bp} />
    </>
  )
}
