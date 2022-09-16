import React, { useCallback, useEffect, useState } from "react";

function CheckboxInput({ id, name, checkedItemHandler, targetID }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("bookshelves"))[id].books[targetID]) {
      setIsChecked(true);
    }
  }, []);

  const onChangeHandler = useCallback((e) => {
    checkedItemHandler(e.target.id, e.target.checked);
    setIsChecked((prev) => !prev);
  });

  return (
    <>
      <input
        type="checkbox"
        checked={isChecked}
        id={id}
        name={name}
        onChange={onChangeHandler}
      />
      <label htmlFor={id}>{name}</label>
    </>
  );
}

export default React.memo(CheckboxInput);
