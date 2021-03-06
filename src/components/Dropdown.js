import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ lable, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener(
      "click",
      onBodyClick,

      { capture: true }
    );

    return () => {
      document.body.removeEventListener(
        "click",
        onBodyClick,

        { capture: true }
      );
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {option.lable}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="lable">{lable}</label>
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.lable}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
