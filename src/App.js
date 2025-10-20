import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        // Try remote JSON first (placeholder API). You can replace with any URL.
        const remote = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
        if (!remote.ok) throw new Error('Remote request failed');
        const remoteData = await remote.json();
        if (!isMounted) return;
        setItems(
          remoteData.map((p) => ({ id: p.id, title: p.title, body: p.body }))
        );
      } catch (e) {
        // Fallback to local sample JSON from public/
        try {
          const local = await fetch(process.env.PUBLIC_URL + '/sample-data.json');
          const localData = await local.json();
          if (!isMounted) return;
          setItems(localData);
          setError('Показаны локальные данные (удалось получить с запасного источника).');
        } catch (e2) {
          if (!isMounted) return;
          setError('Не удалось получить данные ни с удалённого, ни с локального источника.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero">
          <div className="hero-text">
            <h1 className="hero-title">Главная страница</h1>
            <p className="hero-subtitle">
              Анимации, плавное появление элементов и вывод данных из JSON
              (удалённого API с локальным резервом).
            </p>
          </div>
          <img src={logo} className="hero-logo" alt="logo" />
        </div>

        <section className="section">
          {loading && <div className="state">Загрузка данных…</div>}
          {!!error && <div className="state error">{error}</div>}
          <div className="cards">
            {items.map((item) => (
              <article key={item.id} className="card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="footer-note">
            Данные берутся из `jsonplaceholder.typicode.com` или из `public/sample-data.json`.
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
