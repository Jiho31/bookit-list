import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

function Memo({ memoObj, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newMemo, setNewMemo] = useState(memoObj.content);

  const memoDocRef = doc(dbService, "memo", `${memoObj.id}`);

  const onDeleteClick = async () => {
    await deleteDoc(memoDocRef);
  };
  const onEditClick = () => {
    toggleEditing();
  };

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    toggleEditing();

    await updateDoc(memoDocRef, {
      content: newMemo,
    });
  };

  const onChangeHandler = (e) => {
    const {
      target: { value },
    } = e;
    setNewMemo(value);
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={onSubmitHandler}>
          <input type="text" value={newMemo} onChange={onChangeHandler}></input>
          <input type="submit" value="Save Memo"></input>
        </form>
      ) : (
        <>
          <h3>{memoObj.content}</h3>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={onEditClick}>Edit</button>
            </>
          )}
        </>
      )}
    </li>
  );
}

export default Memo;
