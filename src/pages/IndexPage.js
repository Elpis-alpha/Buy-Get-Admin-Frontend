import { Link } from "react-router-dom"

import styled from "styled-components"


const IndexPage = () => {

  return (

    <IndexPageStyle>

      <div className="inner">

        <div className="body">

          {/* <table>

          </table> */}

        </div>

        <div className="foot">

          <Link to="/create">Create a new Promo</Link>

        </div>

      </div>

    </IndexPageStyle>

  )

}

const IndexPageStyle = styled.div`
  width: 100%;

`

export default IndexPage