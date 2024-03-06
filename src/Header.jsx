import logo from "./images/react.png"
function MainHeader() {
  return(
    <div className="pt-3 py-1 pl-2" style={{backgroundColor: "black"}}>
      <img alt= "" src={logo} style = {{ height: "35px", verticalAlign: "top"}}>
      </img>
      <span className="h2 pt-4 text-white-50">CyclOpedia</span>
    </div>
  );
}

const Header = () => {
  return (
    <div>
      <MainHeader />
    </div>
  );
}

export default Header;

