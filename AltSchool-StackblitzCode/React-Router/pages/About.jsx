import { HashLink } from 'react-router-hash-link';

export default function About({ isHome }) {
  if (isHome) {
    return (
      <div id="about">
        <h1>About Inside Home</h1>
        <section style={{ marginBottom: '50rem' }}>
          <HashLink
            to="/#home"
            smooth
            scroll={(el) => {
              console.log(el);
              el.scrollIntoView({ behavior: 'auto', block: 'end' });
            }}
          >
            {' '}
            Back To The Top
          </HashLink>
        </section>
      </div>
    );
  }
  return (
    <div id="about">
      <h1>About</h1>
    </div>
  );
}
