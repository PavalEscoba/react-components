# USERS

Класічная прылага з запытам на сервак і рэндэрам юзэраў.
Робім useState для юзераў і выкарыстоўваем useEffect для запыту і абновы.

```javascript
const API_BASEURL = 'https://reqres.in/api/userwws1';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API_BASEURL)
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.error('Error during users fetching', err);
      });
  }, []);

  return (
    <div className="App">
      <Users users={users} isLoading={isLoading} />
      {/* <Success /> */}
    </div>
  );
}

export default App;
```

Пасля робім апрацоўку isLoading();
Мяняем isLoading на фолс, тады калі падгрузіліся юзэры.

```javascript
function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(API_BASEURL)
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.error('Error during users fetching', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Users users={users} isLoading={isLoading} />
      {/* <Success /> */}
    </div>
  );
}
```

И сделать условный рендеринг в Users. Если есть users, то делать список юзеров, если нет, то Скелетоны.

```javascript
export const Users = ({ users, isLoading }) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input type="text" placeholder="Найти пользователя..." />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">{/* users.map */}</ul>
      )}
      <button className="send-invite-btn">Отправить приглашение</button>
    </>
  );
};
```

Потом начинаем передавать юзера в компонент `<User>`.
**Users/index.jsx**

```javascript
{
  isLoading ? (
    <div className="skeleton-list">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  ) : (
    <div>
      <ul className="users-list">
        {users.map((user) => (
          <User {...user} />
        ))}
      </ul>
    </div>
  );
}
```

**User.jsx**

```javascript
export const User = ({ first_name, last_name, avatar, email }) => {
  const fullName = `${first_name} ${last_name}`;
  return (
    <li>
      <div>
        <img className="avatar" src={avatar} alt={`${fullName}`} />
        <div>
          <h3>{`${fullName}`}</h3>
          <p>
            <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
              <path d="M48,0a48,48,0,0,0,0,96,6,6,0,0,0,0-12A36,36,0,1,1,84,48V66a6,6,0,0,1-12,0V48A24,24,0,1,0,48,72a23.7365,23.7365,0,0,0,12.2549-3.4783A17.9586,17.9586,0,0,0,96,66V48A48.0474,48.0474,0,0,0,48,0Zm0,60A12,12,0,1,1,60,48,12.0081,12.0081,0,0,1,48,60Z" />
            </svg>
            {email}
          </p>
        </div>
      </div>
      <img className="action" src="/assets/plus.svg" alt="Action" />
    </li>
  );
};
```

Робім пошук па імені, прозвішчу і імэйлу.  
Па-першае робім кантраляваны інпут са сваім стэйтам і хэндлерам.  
І чамусьці перадаем яго ў `<Users>`.

**App.js**

```javascript
const API_BASEURL = 'https://reqres.in/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const searchInputHandler = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    fetch(API_BASEURL)
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.error('Error during users fetching', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Users
        searchValue={searchValue}
        searchInputHandler={searchInputHandler}
        users={users}
        isLoading={isLoading}
      />
      {/* <Success /> */}
    </div>
  );
}

export default App;
```

У `users/index.jsx` будзем атрымліваць значэнне і хэндлер.  
Будзем абнаўляць значэнне інпута.  
Будзем адфільтроўваць спіс юзэраў.

**Users/index.jsx**

```javascript
export const Users = ({
  searchValue,
  searchInputHandler,
  users,
  isLoading,
}) => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const filteredUsers = users.filter((user) => {
    const fullname = `${user.first_name} ${user.last_name}`.toLowerCase();
    const isIncluded =
      fullname.includes(lowerCaseSearchValue) ||
      user.email.includes(lowerCaseSearchValue);

    return isIncluded;
  });

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          value={searchValue}
          onChange={searchInputHandler}
          type="text"
          placeholder="Найти пользователя..."
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div>
          <ul className="users-list">
            {filteredUsers.map((user) => (
              <User key={user.email + user.id} {...user} />
            ))}
          </ul>
        </div>
      )}
      <button className="send-invite-btn">Отправить приглашение</button>
    </>
  );
};
```

Цяпер робім логіку дадавання ў спіс тых, каму будуць высланыя інвайты.
Ствараем стэйт з масівам запрошаных у `App.jsx`.  
Ствараем функцыю для кліка на плюс/мінус ля юзера у `App.jsx`.

```javascript
const [invitedUsers, setInvitedUsers] = useState([]);
...
const onActionIconClickHandler = (id) => {
  if (invitedUsers.includes(id)) {
    setInvitedUsers((prev) => prev.filter((_id) => _id !== id));
  } else setInvitedUsers((prev) => [...prev, id]);
};
```

Працуем з іконкай у `User.jsx`. Перадаем `isInvited` і калі `isInvited`, то мінус, калі не `isInvited`, то плюс.

```javascript
const userActionIconURL = `/assets/${isInvited ? 'minus.svg' : 'plus.svg'}`;
...
<img
  onClick={onActionIconClickHandler}
  className="action"
  src={userActionIconURL}
  alt="Action"
/>
```

... to be finished ...
