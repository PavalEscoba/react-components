import { useEffect, useState } from 'react';
import './App.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

const API_BASEURL = 'https://reqres.in/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const searchInputHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const onActionIconClickHandler = (id) => {
    if (invitedUsers.includes(id)) {
      setInvitedUsers((prev) => prev.filter((_id) => _id !== id));
    } else setInvitedUsers((prev) => [...prev, id]);
  };

  const onSendInviteClickHandler = () => {
    setIsSuccess(true);
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
      {isSuccess ? (
        <Success count={invitedUsers.length} />
      ) : (
        <Users
          searchValue={searchValue}
          searchInputHandler={searchInputHandler}
          users={users}
          isLoading={isLoading}
          invitedUsers={invitedUsers}
          onActionIconClickHandler={onActionIconClickHandler}
          onSendInviteClickHandler={onSendInviteClickHandler}
        />
      )}
    </div>
  );
}

export default App;
