import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import Select from "react-select"

import { SpinnerCircular } from "spinners-react"

import styled from "styled-components"

import Brands from "../utils/Brands.json"

import Products from "../utils/Products.json"

import { sendMiniMessage } from "../controllers/MessageCtrl"

import { patchApiJson } from "../controllers/APICtrl"

import { updatePromo } from "../api"


const brandsOptions = Brands.allBrands.map(brand => { return { label: brand.name, value: brand.name } })

const productsOptions = Products.groceries.map(product => { return { label: product.name, value: product.name } })

const UpdatePage = ({ promoData }) => {

  const navigate = useNavigate()

  const appliedOptions = [

    { label: "Product", value: "Product" },

    { label: "Brand", value: "Brand" },

  ]

  const [appliedValue, setAppliedValue] = useState({ label: promoData.productOrBrand.type, value: promoData.productOrBrand.type })

  const [prodBrandVal, setProdBrandVal] = useState({ label: promoData.productOrBrand.data.name, value: promoData.productOrBrand.data.name })

  const [loadingText, setLoadingText] = useState("")

  useEffect(() => { setProdBrandVal(null) }, [appliedValue])

  useEffect(() => { setProdBrandVal({ label: promoData.productOrBrand.data.name, value: promoData.productOrBrand.data.name }) }, [promoData.productOrBrand.data.name])

  const addOneToPrevious = e => {

    const prevElement = e.currentTarget.previousElementSibling

    const val = isNaN(parseInt(prevElement.value)) ? 0 : parseInt(prevElement.value)

    prevElement.value = val + 1

  }

  const validateSpan = e => {

    const span = e.currentTarget.nextElementSibling

    const input = e.currentTarget

    if (input.type === 'datetime-local') {

      if (!isNaN(new Date(input.value).getDate())) {

        span.classList.add('ok')

      } else {

        span.classList.remove('ok')

      }

    } else {

      if (input.value.trim().length >= 1) {

        span.classList.add('ok')

      } else {

        span.classList.remove('ok')

      }

    }

  }

  const setProdBrandValHandler = ({ value }) => {

    const options = appliedValue.value === "Product" ? productsOptions : brandsOptions

    setProdBrandVal(options.find(opt => opt.value === value))

  }

  const updateBuy = async e => {

    e.preventDefault()

    const form = e.target

    if (form['abg-pbs'].value.length < 1 || form['abg-ofp'].value.length < 1) {

      return sendMiniMessage({

        icon: { name: "info" },

        content: { text: `Fill all inputs` }

      }, 2000)

    }

    if (form['abg-title'].value.trim().length < 1 || form['abg-startDate'].value.length < 1 || form['abg-endDate'].value.length < 1) {

      return sendMiniMessage({

        icon: { name: "info" },

        content: { text: `Fill all inputs` }

      }, 2000)

    }

    setLoadingText("Updating Promo")

    const productData = {

      title: form['abg-title'].value,

      startDate: form['abg-startDate'].value,

      endDate: form['abg-endDate'].value,

      productOrBrand: {

        type: form['abg-applied'].value,

        data: (form['abg-applied'].value === 'Brand' ?

          Brands.allBrands.find(brand => brand.name === form['abg-pbs'].value)

          : Products.groceries.find(product => product.name === form['abg-pbs'].value)),

        pieces: form['abg-pr'].value

      },

      offerProducts: {

        data: Products.groceries.find(product => product.name === form['abg-ofp'].value),

        pieces: form['abg-opr'].value

      },

    }

    const updationData = await patchApiJson(updatePromo(promoData.title), productData)

    if (updationData.error) {

      sendMiniMessage({

        icon: { name: "times" },

        content: { text: updationData.bat === '...' ? updationData.message : `An Error Occured` }

      }, 2000)

    } else {

      sendMiniMessage({

        icon: { name: "ok" },

        content: { text: `Promo Updated` }

      }, 2000)

      form.reset()

      navigate('/')

    }

    setLoadingText("")

  }

  return (

    <UpdatePageStyle>

      <div className="inner">

        <div className="header">

          <h2>Add Buy X Get Y</h2>

        </div>

        <div className="body">

          <form onSubmit={updateBuy}>

            <div className="form-side">

              <div className="form-pack">

                <label htmlFor="abg-title">Title</label>

                <div>

                  <input required type="text" id="abg-title" name="abg-title" autoComplete="abg-title" placeholder="Enter Title" onInput={validateSpan} defaultValue={promoData.title} />

                  <small className="ok">* Title is required</small>

                </div>

              </div>

              <div className="form-pack">

                <label htmlFor="abg-startDate">Start Date</label>

                <div>

                  <input required type="datetime-local" id="abg-startDate" name="abg-startDate" autoComplete="abg-startDate" onInput={validateSpan} defaultValue={promoData.startDate} />

                  <small className="ok">* Start Date is required</small>

                </div>

              </div>

            </div>

            <div className="form-side">

              <div className="form-pack">

                <label htmlFor="abg-endDate">End Date</label>

                <div>

                  <input required type="datetime-local" id="abg-endDate" name="abg-endDate" autoComplete="abg-endDate" onInput={validateSpan} defaultValue={promoData.endDate} />

                  <small className="ok">* End Date is required</small>

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

                  <Select name="abg-pbs" id="abg-pbs" options={appliedValue.value === "Product" ? productsOptions : brandsOptions}

                    value={prodBrandVal} onChange={setProdBrandValHandler} />

                </div>

              </div>

              <div className="form-pack pi">

                <label htmlFor="abg-pr">Pieces</label>

                <div>

                  <input required type="number" placeholder="1" name="abg-pr" id="abg-pr" autoComplete="off" defaultValue={promoData.productOrBrand.pieces} />

                  <button type="button" onClick={addOneToPrevious}>+</button>

                </div>

              </div>

            </div>

            <div className="form-side">

              <div className="pack-tit">Offer Products</div>

              <div className="form-pack se">

                <label htmlFor="abg-ofp">Select Offer Products</label>

                <div>

                  <Select name="abg-ofp" id="abg-ofp" options={productsOptions} defaultValue={{ label: promoData.offerProducts.data.name, value: promoData.offerProducts.data.name }} />

                </div>

              </div>

              <div className="form-pack pi">

                <label htmlFor="abg-opr">Pieces</label>

                <div>

                  <input required type="number" placeholder="1" name="abg-opr" id="abg-opr" autoComplete="off" defaultValue={promoData.offerProducts.pieces} />

                  <button type="button" onClick={addOneToPrevious}>+</button>

                </div>

              </div>

            </div>

            <div className="end-pack">

              <button type={"submit"}>Update Promo</button>

            </div>

            <div className="end-pack">

              <Link to="/" className="rxtd">Go Back</Link>

            </div>

          </form>

        </div>

        {loadingText !== "" && <div className="abs-form">

          <div>

            <SpinnerCircular size="7pc" color="#fff" />

            {loadingText}

          </div>

        </div>}

      </div>

    </UpdatePageStyle>

  )

}

const UpdatePageStyle = styled.div`
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
      
      @media screen and (max-width: 600px) {

        .form-pack {
          width: 100%;
        }
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
        transition: opacity .5s;

        &.ok {
          opacity: 0;
        }
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

  
  .abs-form {
    position: fixed;
    top: 0; left: 0;
    bottom: 0; right: 0;
    width: 100%;
    height: 100%;
    z-index: 120;
    background-color: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 1.5pc;
      line-height: 3pc;
    }
  }
`

export default UpdatePage