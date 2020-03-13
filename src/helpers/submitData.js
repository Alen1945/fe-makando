import axios from 'axios'

async function submitData (dataUrl, dataForm) {
  try {
    console.log(dataForm)
    const url = process.env.REACT_APP_API_URL + dataUrl
    return await axios.post(url, dataForm)
  } catch (e) {
    console.log(e)
  }
}
export default submitData
