import React, {useState, useEffect} from "react";
import classes from "./Usermodal.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'

const Usermodal = ({ show, onClose, id }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && show) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`https://dummyjson.com/users/${id}`);
          if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
          }
          const data = await res.json();
          setUser(data);
          console.log(data)
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, show]); 


  if (!show) {
    return null;
  }

  return (
    <>
    <div className={classes.modal} onClick={onClose}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={classes.close} onClick={onClose}>
        <FontAwesomeIcon icon={faCircleXmark} />
        </div>
        <div>
            {loading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error}</p>}
            {user && ( //показываем после получения информации с сервера
              <div>
                <p>Name: {user.firstName} {user.lastName} {user.maidenName}</p>
                <p>Age: {user.age}</p>
                <p>Address: {user.address.city} {user.address.address}</p>
                <p>Height: {user.height}</p>
                <p>Weight: {user.weight}</p>
                <p>Phone: {user.phone}</p>
                <p>Email: {user.email}</p>
              </div>    
            )}
          </div>
      </div>
    </div>
    </>
  );
};

export default Usermodal;