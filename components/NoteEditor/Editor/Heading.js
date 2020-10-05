import styles from './Editor.module.scss';

export default function Heading({
  name, placeholder, value, setValue,
}) {
  const removeNewLine = (text) => text.replace(/\n/g, '');

  const handleChange = (e) => {
    const text = removeNewLine(e.currentTarget.value);
    setValue(text);
  };

  return (
    <>
      <textarea
        name={name}
        className={styles[name]}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </>
  );
}
