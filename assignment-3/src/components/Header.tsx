export default function Header() {
    return (
      <header>
        <nav className="navbar">
          <a href="./" id="bookstore">
            Bookstore
          </a>
          <div className="user">
            <img
              src="https://i.pinimg.com/736x/cc/80/f3/cc80f38579887963c2d71d7060081ea3.jpg"
              alt="avt"
              id="avt"
            />
            <span>John Doe</span>
          </div>
        </nav>
      </header>
    )
  }