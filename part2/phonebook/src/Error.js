const Error = ({ message, style }) => {
  if (message === null) {
    return null;
  }

  return (
    <div id="messg" className={style}>
      {message}
    </div>
  );
};

export default Error;
