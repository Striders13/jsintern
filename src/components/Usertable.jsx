import React, {useState, useMemo} from "react"; 
import classes from "./Usertable.module.css";
import SortButtons from "./Sortbuttons";
import Usermodal from "./Usermodal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus} from '@fortawesome/free-solid-svg-icons'


const Usertable = ({userTable}) => {
  const [sortType, setSortType] = useState("none"); // Сортировка по убыванию, возрастанию или без сортировки
  const [sortValue, setSortValue] = useState(); // Какой столбец сортируется
  const [showModal, setShowModal] = useState(false);  
  const [dataKey, setDataKey] = useState(); // ID пользователя для передачи в Usermodal

  const openModal = (event) => {
    const dataKey = event.currentTarget.getAttribute('datakey');
    setShowModal(true);
    setDataKey(dataKey)
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  const sortUserTable = (type, value) => {
    setSortType(type);
    setSortValue(value);
  };

  const getNestedValue = (obj, path) => { // для сортировку по адресу (address.city)
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  };
  
  const sortedUserTable = useMemo(() => {
    const sortedList = [...userTable];
      return sortedList.sort((a, b) => {

        const aValue = getNestedValue(a, sortValue);
        const bValue = getNestedValue(b, sortValue);

        if (sortType === "ascending") {
          return typeof aValue === "string"
            ? aValue.localeCompare(bValue)
            : aValue - bValue;
        } else if (sortType === "descending") {
          return typeof aValue === "string"
            ? bValue.localeCompare(aValue)
            : bValue - aValue;
        }
        return 0;
      });
  }, [sortType, sortValue, userTable]);

  return (
    <>
    <Usermodal show={showModal} onClose={closeModal} id={dataKey}/>
    <div className={classes.table}>
      <div className={classes.column}>
      <div className={classes.columnName}>
        Name <SortButtons sortKey={"firstName"} sortUserTable={sortUserTable}/>
      </div>
      <div className={classes.columnEntry}>
        {sortedUserTable.map((user) => (
          <div>
          {user.firstName} {user.lastName} {user.maidenName}
          </div>
          ))}
      </div>
      </div>
      <div className={classes.column}>
      <div className={classes.columnName}>
        Age <SortButtons sortKey={"age"} sortUserTable={sortUserTable}/>
      </div>
      <div className={classes.columnEntry}>
        {sortedUserTable.map((user) => (
          <div>{user.age}</div>
          ))}
      </div>
      </div>
      <div className={classes.column}>
      <div className={classes.columnName}>
      Gender <SortButtons sortKey={"gender"} sortUserTable={sortUserTable}/>
      </div>
      <div className={classes.columnEntry}>
        {sortedUserTable.map((user) => (
          <div>{user.gender}</div>
          ))}
      </div>
      </div>
      <div className={classes.column}>
      <div className={classes.columnName}>
      Phone
      </div>
      <div className={classes.columnEntry}>
        {sortedUserTable.map((user) => (
          <div>{user.phone}</div>
          ))}
      </div>
      </div>
      <div className={classes.column}>
      <div className={classes.columnName}>
      Address <SortButtons sortKey={"address.city"} sortUserTable={sortUserTable}/>
      </div>
      <div className={classes.columnEntry}>
        {sortedUserTable.map((user) => (
          <div className={classes.modalContainer}>
          <div>
          {user.address.city} {user.address.address}
          </div>
          <div datakey={user.id} onClick={openModal} className={classes.modalEntry}><FontAwesomeIcon icon={faSquarePlus}/></div>
          </div>
          ))}
      </div>
      </div>
    </div>
    </>
  );
};

export default Usertable;
