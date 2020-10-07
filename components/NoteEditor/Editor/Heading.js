import { useState, useRef, useEffect } from 'react';
import styles from './Editor.module.scss';

export default function Heading({
  name, placeholder, value, setValue,
}) {
  const el = useRef();
  const [currentHeight, setCurrentHeight] = useState();

  const removeNewLine = (text) => text.replace(/\n/g, '');

  const handleChange = (e) => {
    const text = removeNewLine(e.currentTarget.value);

    setCurrentHeight(0);
    setValue(text);
  };

  useEffect(() => {
    setCurrentHeight(el.current.scrollHeight);
  }, []);

  useEffect(() => {
    if (currentHeight === 0) { setCurrentHeight(el.current.scrollHeight); }
  }, [currentHeight]);

  return (
    <>
      <textarea
        name={name}
        className={styles[name]}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        maxLength="255"
        rows="1"
        ref={el}
      />
      <style jsx>
        {`
        textarea[name=${name}] {
          height: ${currentHeight}px;
        }
      `}
      </style>
    </>
  );
}
