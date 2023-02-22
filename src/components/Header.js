import { Link } from "react-router-dom"

const Title = () => (
  <a href="/">
    <img
      className="logo"
      alt="logo"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe0oy_Y-JZ5wQKWatiTCQ0C4hEtmKw1_gWRA&usqp=CAU"
    />
  </a>
)

const Header = () => {
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="link">
              Contact
            </Link>
          </li>
          <li>
            <Link className="link">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
