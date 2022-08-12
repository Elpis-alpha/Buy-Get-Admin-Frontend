import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { SpinnerCircular } from "spinners-react"

import styled from "styled-components"

import { useNavigate } from "react-router-dom"

import { deletePromo, getAllBuyGetSimple } from "../api"

import { deleteApiJson, getApiJson } from "../controllers/APICtrl"

import { sendMiniMessage, sendXMessage } from "../controllers/MessageCtrl"



const IndexPage = () => {

  const navigate = useNavigate()

  const [serverData, setServerData] = useState([])

  const [loadingText, setLoadingText] = useState("")

  const fetchData = async () => {

    setServerData([])

    setLoadingText('Fetching Data')

    const serverData = await getApiJson(getAllBuyGetSimple())

    if (serverData.error) {

      sendMiniMessage({

        icon: { name: "times" },

        content: { text: `An Error Occured` }

      }, 2000)

    } else {

      setServerData(serverData);

    }

    setLoadingText('')

  }

  const deleteData = async (title) => {

    setLoadingText('Deleting Promo')

    const deleteData = await deleteApiJson(deletePromo(title))

    if (deleteData.error) {

      sendMiniMessage({

        icon: { name: "times" },

        content: { text: `An Error Occured` }

      }, 2000)

    } else {

      sendMiniMessage({

        icon: { name: "ok" },

        content: { text: `Deletion Success` }

      }, 2000)

    }

    setLoadingText('')

  }

  useEffect(() => { fetchData() }, [])

  const servicePromoItem = async promoItem => {

    const ans = await sendXMessage({

      heading: { text: "Take an Action", style: {} },

      content: { text: "You can either edit this promo data or you can delete it", },

      buttons: [

        { text: 'Edit', waitFor: 'ed', style: { backgroundColor: '#2e2e52' } },

        { text: 'Delete', waitFor: 'de', style: { backgroundColor: '#531414' } },

        { text: 'Back', waitFor: 'xe', style: { backgroundColor: '#9f2378' } },

      ],

    })

    if (ans === 'ed') {

      navigate(`/update?title=${promoItem.title}`)

    } else if (ans === 'de') {

      await deleteData(promoItem.title)

      await fetchData()

    }

  }

  return (

    <IndexPageStyle>

      <div className="inner">

        <div className="body">

          <table>

            <thead>

              <tr>

                <th>Title</th>

                <th>Applied On</th>

                <th>Original</th>

                <th>Offer</th>

                <th>Start Date</th>

                <th>End Date</th>

              </tr>

            </thead>

            <tbody>

              {serverData.map((promoItem) => <tr key={promoItem._id}>

                <td onClick={() => servicePromoItem(promoItem)}>{promoItem.title}</td>

                <td>{promoItem.productOrBrand.type}</td>

                <td>{promoItem.productOrBrand.data.name}</td>

                <td>{promoItem.offerProducts.data.name}</td>

                <td>{new Date(promoItem.startDate).toLocaleDateString()}</td>

                <td>{new Date(promoItem.endDate).toLocaleDateString()}</td>

              </tr>)}

            </tbody>

          </table>

        </div>

        <div className="foot">

          <Link to="/create">Create a new Promo</Link>

        </div>

        {loadingText !== "" && <div className="abs-form">

          <div>

            <SpinnerCircular size="7pc" color="#fff" />

            {loadingText}

          </div>

        </div>}

      </div>

    </IndexPageStyle>

  )

}

const IndexPageStyle = styled.div`
  width: 100%;

  .inner {
    width: 100%;
    padding: 1pc;
    overflow: auto;
    
    table {
      width: 95%;
      margin: 0 auto;
      border-collapse: collapse;
      margin-bottom: 1pc;
      
      th, td {
        border-bottom: 1px solid rgba(0,0,0,.5);
        padding: 0.5pc 1pc;
        font-size: 0.9pc;
        text-align: left;
      }

      th {
        font-size: 1.1pc;
        padding: 0 1pc;
        white-space: pre;
      }

      td:first-of-type {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
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
  }
`

export default IndexPage