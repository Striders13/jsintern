import React, {useState} from "react";

function SearchDatabase({ value, fetchUsers, setUsers }) {

  const [searchType, setSearchType] = useState(`id`);
  const [filter, setFilter] = useState(``);


  async function search() {
    if (!filter) {
        alert('Введите данные');
        return;
    }
    let filterFixed;
    const firstLetterCap = filter.charAt(0).toUpperCase();
    const remainingLetters = filter.slice(1);
    switch (searchType) {
        case 'gender': // Пол всегда со строчной буквы
            filterFixed = filter.toLowerCase();
            break;
        default: // В остальных случаях первая буква заглавная
            filterFixed = firstLetterCap + remainingLetters;
            break;
    }
    try {
        const res = await fetch(`https://dummyjson.com/users/filter?key=${searchType}&value=${encodeURIComponent(filterFixed)}`);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        const json = await res.json();
        setUsers(json.users);
    } catch (error) {
        console.error(error.message);
    }
  }

  // Именно используя запрос https://dummyjson.com/users/filter, как сказано в задании, только так придумал.
  // Было бы проще фильтровать после получения с сервера.
  // В документации dummyjson также указан Search, но он ищет только по firstName и lastName.

  return (
    <>
    <input
      type="text"
      value={filter}
      onChange={(event) => setFilter(event.target.value)}
      placeholder="Поиск в базе данных"
    />
    <select
      value={value}
      onChange={(event) => setSearchType(event.target.value)}
    >
      <option value="id">ID</option>
      <option value="firstName">First Name</option>
      <option value="lastName">Last Name</option>
      <option value="maidenName">Maiden Name</option>
      <option value="age">Age</option>
      <option value="gender">Gender</option>
      <option value="phone">Phone</option>
      <option value="address.city">City</option>
      <option value="address.address">Address</option>
    </select>
    <button onClick={search}>Поиск</button>
    <button onClick={fetchUsers}>Очистить</button>
    </>
  );
}

export default SearchDatabase;
