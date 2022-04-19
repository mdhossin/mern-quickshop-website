const Loader = (props) => {
  const { inline, backdrop } = props;

  return (
    <div
      className={`spinner-container${
        inline ? " position-relative" : " position-fixed overlay"
      } ${backdrop ? "backdrop" : ""}`}
    >
      <div
        className={`spinner${
          inline ? " position-relative" : " position-fixed overlay"
        }`}
      ></div>
    </div>
  );
};

Loader.defaultProps = {
  inline: false,
  backdrop: false,
};

export default Loader;
