import { Link, matchPath } from "react-router-dom";

function PrimaryBtn({ pathname }) {

  let primaryBtnJSX;

  if (matchPath(
    { path: '/todos', exact: true },
    pathname
  )) {
    primaryBtnJSX = (
      <div className="home-icon basic-btn-style">
        gTodo
      </div>
    );

  } else if (matchPath(
    { path: '/todos/:id', exact: true },
    pathname
  )) {
    primaryBtnJSX = (
      <Link
        to={'/todos'}
        className="back-icon-link"
      >
        <div className="circular-icon-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
      </Link>
    );
  }


  return (primaryBtnJSX);
}

export default PrimaryBtn;