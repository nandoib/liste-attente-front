import bgImage from "../images/bg.png";

const Background = (props) => {
  return (
    <>
      {" "}
      <div
        className="md:flex md:flex-wrap  md:items-center md:justify-center  md:h-screen md:py-0 my-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full bg-white shadow-lg p-6 lg:w-8/12 border lg:rounded-lg lg:p-14">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Background;
