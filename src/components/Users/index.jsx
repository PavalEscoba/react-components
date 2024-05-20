import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({
  searchValue,
  searchInputHandler,
  users,
  isLoading,
  invitedUsers,
  onActionIconClickHandler,
  onSendInviteClickHandler,
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
            {filteredUsers.map((user) => {
              const isInvited = invitedUsers.includes(user.id);

              return (
                <User
                  isInvited={isInvited}
                  onActionIconClickHandler={onActionIconClickHandler}
                  key={user.email + user.id}
                  {...user}
                />
              );
            })}
          </ul>
        </div>
      )}
      {invitedUsers.length > 0 ? (
        <button onClick={onSendInviteClickHandler} className="send-invite-btn">
          Отправить приглашение
        </button>
      ) : null}
    </>
  );
};
