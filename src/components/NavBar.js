import styled from "styled-components"

import { Link } from "react-router-dom"

import { siteName } from "../__env"

import { Squeeze as Hamburger } from "hamburger-react"

import { useState } from "react"

import { waitFor } from "../controllers/TimeCtrl"

import { stateClass } from "../controllers/UICtrl"

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

    .in-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 a {
        padding: 2rem 1.5rem;
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

      @media screen and (max-width: 800px) {

        @media screen and (max-width: 500px) {
          h1 { font-size: 1.6pc;}
        }
        
        @media screen and (max-width: 350px) {
          h1 { font-size: 1.5pc }
        }
        
        .r-side {
          display: none;

          &.show {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0; left: 0;
            right: 0; bottom: 0;
            z-index: 150;
            background-color: rgba(0, 0, 0, .3);
            /* transform: scale(1); */
            animation: scale-int .5s 1;

            ul.children {
              min-width: 60vw;
              background-color: #eee;
              /* padding: 3rem 0; */
              border-radius: 1rem;
              flex-direction: column;
              background-color: #343d5f;
              overflow: hidden;
              padding-right: 0;

              li a {
                width: 100%;
                padding: 2rem 0;

                /* border: 2px solid white; */
                color: white;
                text-align: center;
                /* transition: background-color .5s; */

                &:hover {
                  background-color: rgba(0, 0, 0, .3);
                }
              }
            }

            &.close {
              transform: scale(0);
              animation: scale-int-r .5s 1;
            }
          }
        }

        .nav-ham {
          display: flex;
        }
        
        .nav-ham-in {
          display: flex;
          color: red;
          position: fixed;
          top: 2rem;
          right: 1rem;
          animation: opacity-in 1s 1;
        }

        .only-small {
          display: initial;
        }
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