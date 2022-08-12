import { useNavigate } from "react-router-dom"

import { SpinnerCircular } from "spinners-react"

import { useEffect, useState } from "react"

import { useSelector } from "react-redux"

import { getPromo } from "../api"

import { getApiJson } from "../controllers/APICtrl"

import { sendMiniMessage } from "../controllers/MessageCtrl"

import UpdatePage from "./UpdatePage"

import styled from "styled-components"


const UpdatePageHolder = () => {

  const navigate = useNavigate()

  const { queryObject } = useSelector(store => store.query)

  const { title } = queryObject

  const [serverData, setServerData] = useState(null)

  const [loadingText, setLoadingText] = useState("")

  useEffect(() => {

    const fetchData = async (title) => {

      setServerData(null)

      setLoadingText('Fetching Data')

      const serverData = await getApiJson(getPromo(title))

      if (serverData.error) {

        sendMiniMessage({

          icon: { name: "times" },

          content: { text: `An Error Occured` }

        }, 2000)

        navigate('/')

      } else {

        setServerData(serverData);

        setLoadingText('')
      }


    }

    if (title) {

      fetchData(title)

    }

  }, [title, navigate])

  if (!serverData) {

    return (

      <UpdatePageHolderStyle>

        {loadingText !== "" && <div className="abs-form">

          <div>

            <SpinnerCircular size="7pc" color="#fff" />

            {loadingText}

          </div>

        </div>}

      </UpdatePageHolderStyle>

    )

  } else return <UpdatePage promoData={serverData} />

}

const UpdatePageHolderStyle = styled.div`
  width: 100%;

  
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

export default UpdatePageHolder
