import styled from "styled-components"

import { Link } from "react-router-dom"

import { siteName } from "../__env"

const NavBar = () => {

  return (

    <NavBarStyle style={{ zIndex: 80 }}>

      <nav>

        <div className="in-nav">

          <div className="header">

            <h1><Link to="/">{siteName}</Link></h1>

          </div>

          <div>

            <ul className="children">

              <li><Link to="/">Home</Link></li>

            </ul>

          </div>

        </div>

      </nav>

    </NavBarStyle>

  )

}

const NavBarStyle = styled.div`
  z-index: 30;
  width: 100%;
  /* padding-bottom: 2rem; */

  nav {
    z-index: 15;
    /* background-color: #07165a; */
    color: black;
    background-color: rgba(0,0,0,.05);
    box-shadow: 0 0 3px rgba(0,0,0,.5);

    .in-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 a {
        padding: 1.5pc 2pc;
        display: block;
        color: inherit;
        text-decoration: none;
      }

      ul.children {
        display: flex;
        list-style-type: none;
        padding-right: 1.5rem;

        li a {
          padding: .75rem 1.5rem;
          display: block;
          color: inherit;
          text-decoration: none;
        }
      }

      .nav-ham {
        padding-right: 1rem;
        display: none;
      }

      .nav-ham-in {
        display: none;
      }

      .only-small {
        display: none;
      }

      @keyframes scale-int {
        from{ transform: scale(0) }
        to{ transform: scale(1) }
      }

      @keyframes scale-int-r {
        from{ transform: scale(1) }
        to{ transform: scale(0) }
      }
    }
  }

  .curvy-stuff {
    z-index: 10;
    position: absolute;
    top: 0; left: 0;
    right: 0;
    display: flex;

    svg {
      display: block;
    }
  }

`

export default NavBar