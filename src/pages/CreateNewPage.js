import { useState } from "react"

import { Link } from "react-router-dom"

import Select from "react-select"

import styled from "styled-components"


const CreateNew = () => {

  const appliedOptions = [

    { label: "Product", value: "Product" },

    { label: "Brand", value: "Brand" },

  ]

  const [appliedValue, setAppliedValue] = useState({ label: "Product", value: "Product" })

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

                  <input type="text" id="abg-title" name="abg-title" autoComplete="abg-title" placeholder="Enter Title" />

                  <small>* Title is required</small>

                </div>

              </div>

              <div className="form-pack">

                <label htmlFor="abg-startDate">Start Date</label>

                <div>

                  <input type="datetime-local" id="abg-startDate" name="abg-startDate" autoComplete="abg-startDate" />

                  <small>* Start Date is required</small>

                </div>

              </div>

            </div>

            <div className="form-side">

              <div className="form-pack">

                <label htmlFor="abg-endDate">End Date</label>

                <div>

                  <input type="datetime-local" id="abg-endDate" name="abg-endDate" autoComplete="abg-endDate" />

                  <small>* End Date is required</small>

                </div>

              </div>

              <div className="form-pack se">

                <label htmlFor="abg-applied">Applied On</label>

                <div>

                  <Select name="abg-applied" id="abg-applied" options={appliedOptions} value={appliedValue} onChange={({ value: v }) => setAppliedValue({ label: v, value: v })} />

                </div>

              </div>

            </div>

            <div className="form-side">

              <div className="pack-tit">Products</div>

              <div className="form-pack se">

                <label htmlFor="abg-pr">Select Products / Brands</label>

                <div>

                  <Select />

                </div>

              </div>

              <div className="form-pack pi">

                <label htmlFor="abg-pr">Pieces</label>

                <div>

                  <input type="number" placeholder="1" name="abg-pr" id="abg-pr" autoComplete="off" />

                  <button type="button">+</button>

                </div>

              </div>

            </div>

            <div className="form-side">

              <div className="pack-tit">Offer Products</div>

              <div className="form-pack se">

                <label htmlFor="abg-ofp">Select Offer Products</label>

                <div>

                  <Select />

                </div>

              </div>

              <div className="form-pack pi">

                <label htmlFor="abg-opr">Pieces</label>

                <div>

                  <input type="number" placeholder="1" name="abg-opr" id="abg-opr" autoComplete="off" />

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

  .header {
    width: 100%;
    margin: 0 auto;
    padding: 1pc 5%;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  form {
    
    width: 90%;
    margin: 0 auto;
    padding: 1pc 0;
    z-index: 10;
    color: #737373;

    .form-side {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .pack-tit {
        width: 100%;
        font-weight: bold;
        font-size: 1.1pc;
        color: #2cb4ac;
      }

      .form-pack {
        width: 49%;
      }
    }
    
    .form-pack{
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-bottom: 1pc;

      label{
        font-weight: bold;
      }

      input {
        color: inherit;
      }

      &:not(.se) {

        input {
          background-color: #fff;
          padding: 0.4pc .5pc;
          line-height: 2pc;
          height: 2.8pc;
          border: 0 none; outline: 0 none;
          width: 100%;
          border-radius: 0.2rem;
          padding-right: 2rem;
          transition: background-color .5s;
          box-shadow: 0 0 2px rgba(0,0,0,.2);
        }
      }

      .icon-hol{
        width: 1.8rem;
        cursor: pointer;
        height: 100%;
        position: absolute;
        right: 0; top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      small {
        line-height: 1rem;
        width: 100%;
        font-size: .9pc;
        color: red;
      }

      &.pi {

        >div {
          display: flex;
        }

        input {
          width: 8pc;
        }

        button {
          background-color: #fff;
          height: 2.8pc;
          width: 2.8pc;
          border: 1px solid #2cb4ac; outline: 0 none;
          color: #2cb4ac;
          font-size: 2pc;
          line-height: 1pc;
          padding-bottom: 0.3pc;
          border-radius: 0.2rem;
          transition: background-color .5s;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          margin-left: 1pc;
          transition: background-color .5s, color .5s;

          &:hover {
            background-color: #2cb4ac;
            color: #fff;
          }
        }
      }
    }

    .end-pack{
      padding-top: .75rem;

      button, a{
        text-decoration: none;
        width: 100%;
        background-color: #3c73e9;
        border: 0 none; outline: 0 none;
        color: white;
        border-radius: 0.2rem;
        padding: 0 .5rem;
        cursor: pointer;
        transition: background-color .5s;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &.rxtd {
          background-color: #6e1c1c;
          
          &:hover {
            background-color: #290808;
          }
        }

        span{
          display: inline-block;
          padding-right: 0.3rem;
        }

        &:hover{
          background-color: #173167;
        }

        &:disabled{
          opacity: .5;
          cursor: not-allowed;
        }

        &:disabled:hover{
          background-color: #3c73e9;
        }
      }
    }

  }
`

export default CreateNew