import { useState, useEffect } from 'react';
import Collection from './components/Collection';
import './App.scss';

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [collections, setCollections] = useState([]);
  const [seachInputValue, setSeachInputValue] = useState('');

  const categorySlug = categoryId ? `&category=${categoryId}` : '';
  const pageSlug = page ? `&page=${page}` : ``;

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://664f76b6ec9b4a4a602ee269.mockapi.io/api/photo-collections?limit=2&${categorySlug}&${pageSlug}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.error('Error during fetching from database: ', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, page]);

  const collectionsNames = () => {
    return (
      <ul>
        {collections.map((collection, i) => {
          return <li key={(collection.name, i)}> {collection.name} </li>;
        })}
      </ul>
    );
  };

  const filteredPhotoColections = collections.filter((collection) => {
    const collectionNameLowerCase = collection.name.toLowerCase();
    const searchQueryLowerCase = seachInputValue.toLowerCase();

    return collectionNameLowerCase.includes(searchQueryLowerCase);
  });

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((cat, i) => {
            return (
              <li
                onClick={() => setCategoryId(i)}
                key={cat.name}
                className={`${categoryId === i ? 'active' : ''}`}
              >
                {cat.name}
              </li>
            );
          })}
        </ul>

        <input
          className="search-input"
          placeholder="Поиск по названию"
          value={seachInputValue}
          onChange={(evt) => {
            setSeachInputValue(evt.target.value);
          }}
        />
      </div>
      {/* <div>{collectionsNames()}</div> */}
      <ul className="pagination">
        {[...Array(5)].map((_, i) => {
          return (
            <li
              key={`page${i}`}
              onClick={() => {
                setPage(i + 1);
              }}
              className={page === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </li>
          );
        })}
      </ul>
      <div className="content">
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          filteredPhotoColections.map((collection, i) => {
            return (
              <Collection
                key={collection.name + i}
                name={collection.name}
                images={collection.photos}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
