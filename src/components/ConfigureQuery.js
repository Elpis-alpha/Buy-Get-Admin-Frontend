import { useEffect } from "react"

import { useDispatch } from "react-redux"

import { getQueryObject } from "../controllers/SpecialCtrl"

import { setQueryObject } from "../store/slice/querySlice"


const ConfigureQuery = () => {

  const dispatch = useDispatch()

  const queryObject = getQueryObject()

  useEffect(() => { dispatch(setQueryObject(queryObject)) }, [dispatch, queryObject])

  return <></>

}

export default ConfigureQuery
