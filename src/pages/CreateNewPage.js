import { Link } from "react-router-dom"

import Select from "react-select"

import styled from "styled-components"


const CreateNew = () => {

  const createBuy = e => {

    e.preventDefault()

  }

  return (

    <CreateNewStyle>

      <div className="inner">

        <div className="header">

          <h2>Add Buy X Get Y</h2>

        </div>

        <div className="body">

          <form onSubmit={createBuy}>

            <div className="form-side">

              <div className="form-pack">

                <label htmlFor="abg-title">Title</label>

                <div>

                  <input type="text" id="abg-title" name="abg-title" autoComplete="abg-title" />

                  <small>*Title is required</small>

                </div>

              </div>

              <div className="form-pack">

                <label htmlFor="abg-startDate">Start Date</label>

                <div>

                  <input type="datetime-local" id="abg-startDate" name="abg-startDate" autoComplete="abg-startDate" />

                  <small>*Start Date is required</small>

                </div>

              </div>

            </div>

            <div className="form-side">

              <div className="form-pack">

                <label htmlFor="abg-endDate">End Date</label>

                <div>

                  <input type="datetime-local" id="abg-endDate" name="abg-endDate" autoComplete="abg-endDate" />

                  <small>*End Date is required</small>

                </div>

              </div>

              <div className="form-pack">

                <label htmlFor="abg-applied">Applied On</label>

                <div>

                  <Select name="abg-applied" id="abg-applied" />

                </div>

              </div>

            </div>

            <div className="form-side">

              <div className="form-pack se">

                <div className="pack-tit">Products</div>

                <label htmlFor="abg-endDate">Select Products</label>

                <div>

                  <Select />

                </div>

              </div>

              <div className="form-pack pi">

                <label htmlFor="abg-pr">Pieces</label>

                <div>

                  <input type="number" name="abg-pr" id="abg-pr" autoComplete="off" />

                  <button type="button">+</button>

                </div>

              </div>

            </div>

            <div className="form-side">

              <div className="form-pack se">

                <div className="pack-tit">Offer Products</div>

                <label htmlFor="abg-endDate">Select Offer Products</label>

                <div>

                  <Select />

                </div>

              </div>

              <div className="form-pack pi">

                <label htmlFor="abg-opr">Pieces</label>

                <div>

                  <input type="number" name="abg-opr" id="abg-opr" autoComplete="off" />

                  <button type="button">+</button>

                </div>

              </div>

            </div>

            <div className="end-pack">

              <button type={"submit"}>Create Promo</button>

            </div>

            <div className="end-pack">

              <Link to="/" className="rxtd">Go Back</Link>

            </div>

          </form>

        </div>

      </div>

    </CreateNewStyle>

  )

}

const CreateNewStyle = styled.div`
  width: 100%;

`

export default CreateNew