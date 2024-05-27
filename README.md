# Photos

Делаем запрос сюда: https://664f76b6ec9b4a4a602ee269.mockapi.io/api/photo-collections

Сохраняем в стейт.

Маппим по нему и передаём в Collection - name и массив фоток.

Делаем контролируемый инпут seachInputValue.
И реализуем поиск по названиям. collections.filter...

Реализуем фильтрацию по категориям. Они забиты номерами.
Сначала реализуем рендер всех категорий. Они захардкожены. И выбор реализовывается через соответствие categoryId === index.

```
  <li
    onClick={() => setCategoryId(i)}
    key={cat.name}
    className={`${categoryId === i ? 'active' : ''}`}
  >
    {cat.name}
  </li>
```

Делаем фильтеринг на бэке. Добавляем URL параметр `?category=2`.

https://664f76b6ec9b4a4a602ee269.mockapi.io/api/photo-collections?category=2

```
  const [categoryId, setCategoryId] = useState(0);
```

```
  useEffect(() => {
    fetch(
      `https://664f76b6ec9b4a4a602ee269.mockapi.io/api/photo-collections${categorySlug}`
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.error('Error during fetching from database: ', err);
      });
  }, [categoryId]);
```

Вводим функционал isLoading.

```
  const [isLoading, setIsLoading] = useState(true);
```

```
useEffect(() => {
  setIsLoading(true);
  fetch(
    `https://664f76b6ec9b4a4a602ee269.mockapi.io/api/photo-collections${categorySlug}`
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
}, [categoryId]);
```

Делаем пагинацию.

```
const [page, setPage] = useState(1);
```

```
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
```

```
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
```
